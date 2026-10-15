-- Seeds the editable Now section with the current contents of data/now.ts.
-- Edit rows in the Supabase dashboard afterwards, then POST /api/revalidate.

insert into public.site_settings (key, value) values
  ('now_building', 'STEVE'),
  ('open_to_work', 'Open to internships')
on conflict (key) do nothing;

insert into public.now_items (text, position)
select * from (values
  ('Building STEVE — eight always-on AI departments that run the work of a startup while the founder approves.', 1),
  ('Shipping DStack, a CLI that turns a rough idea into a structured AI-assisted build pipeline.', 2),
  ('Leading the powertrain team for Team Gladiator''s ATVC build.', 3)
) as v(text, position)
where not exists (select 1 from public.now_items);
