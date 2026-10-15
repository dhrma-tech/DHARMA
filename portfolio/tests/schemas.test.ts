import { describe, expect, it } from "vitest";
import { askSchema, slugSchema } from "@/lib/schemas";

describe("askSchema", () => {
  it("bounds question length", () => {
    expect(askSchema.safeParse({ question: "hi" }).success).toBe(false);
    expect(askSchema.safeParse({ question: "What is DStack?" }).success).toBe(true);
    expect(askSchema.safeParse({ question: "x".repeat(301) }).success).toBe(false);
  });
});

describe("slugSchema", () => {
  it("only allows kebab-case slugs", () => {
    expect(slugSchema.safeParse("vexor-ai").success).toBe(true);
    expect(slugSchema.safeParse("../etc").success).toBe(false);
    expect(slugSchema.safeParse("Vexor").success).toBe(false);
  });
});
