import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logError } from "@/lib/log";

export interface LimitRule {
  /** Redis key prefix; unique per rule. */
  name: string;
  limit: number;
  windowSeconds: number;
  /** Deny when the limiter itself is down (use for rules that guard paid APIs). */
  failClosed?: boolean;
}

export const RULES = {
  askIp: { name: "ask-ip", limit: 10, windowSeconds: 60 * 60, failClosed: true },
  askGlobal: { name: "ask-global", limit: 200, windowSeconds: 24 * 60 * 60, failClosed: true },
  view: { name: "view", limit: 1, windowSeconds: 60 * 60 },
} satisfies Record<string, LimitRule>;

export interface LimitResult {
  success: boolean;
  /** Unix ms when the window resets. */
  reset: number;
}

export interface Limiter {
  limit(rule: LimitRule, id: string): Promise<LimitResult>;
}

/** Fixed-window limiter in process memory. Fine for dev and tests; per-instance only in prod. */
export function createMemoryLimiter(now: () => number = Date.now): Limiter {
  const hits = new Map<string, { count: number; reset: number }>();
  return {
    async limit(rule, id) {
      const key = `${rule.name}:${id}`;
      const t = now();
      let entry = hits.get(key);
      if (!entry || entry.reset <= t) {
        entry = { count: 0, reset: t + rule.windowSeconds * 1000 };
        hits.set(key, entry);
      }
      entry.count += 1;
      return { success: entry.count <= rule.limit, reset: entry.reset };
    },
  };
}

function createUpstashLimiter(redis: Redis): Limiter {
  const instances = new Map<string, Ratelimit>();
  const get = (rule: LimitRule) => {
    let rl = instances.get(rule.name);
    if (!rl) {
      rl = new Ratelimit({
        redis,
        prefix: `rl:${rule.name}`,
        limiter: Ratelimit.slidingWindow(rule.limit, `${rule.windowSeconds} s`),
      });
      instances.set(rule.name, rl);
    }
    return rl;
  };
  return {
    async limit(rule, id) {
      const { success, reset } = await get(rule).limit(id);
      return { success, reset };
    },
  };
}

let limiter: Limiter | undefined;

function getLimiter(): Limiter {
  if (limiter) return limiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    limiter = createUpstashLimiter(new Redis({ url, token }));
  } else {
    if (process.env.NODE_ENV === "production") {
      logError("ratelimit", "NO_UPSTASH", "Upstash not configured; using per-instance memory limiter");
    }
    limiter = createMemoryLimiter();
  }
  return limiter;
}

/** For tests. */
export function setLimiter(next: Limiter | undefined) {
  limiter = next;
}

/** Applies `rule` to `id`. Limiter outages fail open unless the rule says otherwise. */
export async function rateLimit(rule: LimitRule, id: string): Promise<LimitResult> {
  try {
    return await getLimiter().limit(rule, id);
  } catch (err) {
    logError("ratelimit", "LIMITER_DOWN", err);
    return { success: !rule.failClosed, reset: Date.now() + rule.windowSeconds * 1000 };
  }
}
