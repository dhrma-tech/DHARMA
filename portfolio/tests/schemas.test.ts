import { describe, expect, it } from "vitest";
import { askSchema, contactSchema, slugSchema } from "@/lib/schemas";

describe("contactSchema", () => {
  const valid = { name: "Ada", email: "ada@example.com", message: "Hello there, nice site!" };

  it("accepts a valid message and trims it", () => {
    const r = contactSchema.parse({ ...valid, name: "  Ada  " });
    expect(r.name).toBe("Ada");
  });

  it.each([
    ["empty name", { ...valid, name: " " }],
    ["bad email", { ...valid, email: "nope" }],
    ["short message", { ...valid, message: "hi" }],
    ["huge message", { ...valid, message: "x".repeat(4001) }],
  ])("rejects %s", (_, input) => {
    expect(contactSchema.safeParse(input).success).toBe(false);
  });
});

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
