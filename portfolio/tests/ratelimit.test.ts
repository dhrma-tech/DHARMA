import { afterEach, describe, expect, it } from "vitest";
import { createMemoryLimiter, rateLimit, setLimiter, type LimitRule } from "@/lib/ratelimit";

const rule: LimitRule = { name: "t", limit: 2, windowSeconds: 60 };

describe("memory limiter", () => {
  it("allows up to the limit, then blocks until the window resets", async () => {
    let t = 0;
    const limiter = createMemoryLimiter(() => t);
    expect((await limiter.limit(rule, "a")).success).toBe(true);
    expect((await limiter.limit(rule, "a")).success).toBe(true);
    expect((await limiter.limit(rule, "a")).success).toBe(false);
    expect((await limiter.limit(rule, "b")).success).toBe(true);
    t = 60_000;
    expect((await limiter.limit(rule, "a")).success).toBe(true);
  });
});

describe("rateLimit", () => {
  afterEach(() => setLimiter(undefined));
  const broken = { limit: async () => { throw new Error("redis down"); } };

  it("fails open by default when the limiter errors", async () => {
    setLimiter(broken);
    expect((await rateLimit(rule, "x")).success).toBe(true);
  });

  it("fails closed for rules guarding paid APIs", async () => {
    setLimiter(broken);
    expect((await rateLimit({ ...rule, failClosed: true }, "x")).success).toBe(false);
  });
});
