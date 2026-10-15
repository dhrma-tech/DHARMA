-- Portfolio backend schema (see docs/02-backend-plan.md §2).
-- RLS is enabled on every table. The service role bypasses RLS, so tables with
-- no policies are server-only; public tables get a select-only policy.

create extension if not exists vector with schema extensions;

-- B1 — contact form
create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) <= 200),
  message text not null check (char_length(message) between 10 and 4000),
  source text,                -- 'contact-form' | 'ask-dharma-handoff'
  ip_hash text,               -- sha256(ip + salt), never raw IP
  created_at timestamptz not null default now()
);

-- B3 — view counter
create table public.page_views (
  slug text primary key,
  views bigint not null default 0,
  updated_at timestamptz not null default now()
);

create or replace function public.increment_view(p_slug text)
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into public.page_views (slug, views) values (p_slug, 1)
  on conflict (slug) do update set views = page_views.views + 1, updated_at = now()
  returning views;
$$;

-- Only the server (service role) may increment.
revoke execute on function public.increment_view(text) from public, anon, authenticated;
grant execute on function public.increment_view(text) to service_role;

-- B2 — Ask Dharma knowledge base
create table public.knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  source text not null,       -- 'project:dstack' | 'experience' | 'about' ...
  title text not null,        -- human label shown as a source chip, e.g. 'DStack'
  content text not null,
  embedding extensions.vector(768) not null, -- gemini-embedding-001 at outputDimensionality 768
  updated_at timestamptz not null default now()
);
create index knowledge_chunks_source_idx on public.knowledge_chunks (source);

create table public.ai_queries (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answered boolean,
  ip_hash text,
  created_at timestamptz not null default now()
);

-- Cosine-similarity search. The table is small (tens of chunks), so a sequential
-- scan is faster than maintaining an ANN index.
create or replace function public.match_chunks(query_embedding extensions.vector(768), match_count int default 5)
returns table (id uuid, source text, title text, content text, similarity float)
language sql
stable
set search_path = public, extensions
as $$
  select id, source, title, content, 1 - (embedding <=> query_embedding) as similarity
  from public.knowledge_chunks
  order by embedding <=> query_embedding
  limit least(match_count, 20);
$$;

revoke execute on function public.match_chunks(extensions.vector, int) from public, anon, authenticated;
grant execute on function public.match_chunks(extensions.vector, int) to service_role;

-- B5 — editable Now section
create table public.now_items (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  position int not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,       -- 'now_building', 'open_to_work'
  value text not null,
  updated_at timestamptz not null default now()
);

-- Keep updated_at honest when rows are edited in the dashboard.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger now_items_touch before update on public.now_items
  for each row execute function public.touch_updated_at();
create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- RLS
alter table public.contact_messages enable row level security;
alter table public.page_views enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.ai_queries enable row level security;
alter table public.now_items enable row level security;
alter table public.site_settings enable row level security;

-- Public read-only tables. Writes go through the service role only.
create policy "page_views are public" on public.page_views for select to anon, authenticated using (true);
create policy "active now_items are public" on public.now_items for select to anon, authenticated using (active);
create policy "site_settings are public" on public.site_settings for select to anon, authenticated using (true);

-- contact_messages, ai_queries, knowledge_chunks: no policies → server-only.
