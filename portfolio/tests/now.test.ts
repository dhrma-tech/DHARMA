import { describe, expect, it } from "vitest";
import { parseAvailability } from "@/lib/now";
import { site } from "@/data/site";

describe("parseAvailability", () => {
  it("defaults to the site label when the setting is missing", () => {
    expect(parseAvailability(undefined)).toBe(site.availability);
  });
  it.each(["false", "No", "", " off "])("hides the badge for %j", (v) => {
    expect(parseAvailability(v)).toBeNull();
  });
  it("maps truthy values to the default label", () => {
    expect(parseAvailability("true")).toBe(site.availability);
  });
  it("uses any other value as the label", () => {
    expect(parseAvailability("Open to full-time roles")).toBe("Open to full-time roles");
  });
});
