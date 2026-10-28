import { describe, expect, it } from "vitest";

import { contactInputSchema } from "@/lib/contact-schema";

// The contact form's validation rules, taken from the site's requirements:
// required fields, valid email format, minimum detail length.
describe("contact form validation rules", () => {
  const valid = {
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    areaOfInterest: "Product Management",
    details: "I would like to discuss a collaboration on a product strategy project.",
    budgetRange: "Undecided",
  };

  it("accepts a complete, valid submission", () => {
    expect(contactInputSchema.safeParse(valid).success).toBe(true);
  });

  it("requires a full name of at least 2 characters", () => {
    const result = contactInputSchema.safeParse({ ...valid, fullName: "A" });
    expect(result.success).toBe(false);
    expect(result.error!.issues[0]!.path[0]).toBe("fullName");
  });

  it("rejects an invalid email format", () => {
    const result = contactInputSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    expect(result.error!.issues[0]!.path[0]).toBe("email");
  });

  it("requires an area of interest from the fixed option list", () => {
    const result = contactInputSchema.safeParse({ ...valid, areaOfInterest: "Made-up Area" });
    expect(result.success).toBe(false);
    expect(result.error!.issues[0]!.path[0]).toBe("areaOfInterest");
  });

  it("requires at least 20 characters of project details", () => {
    const result = contactInputSchema.safeParse({ ...valid, details: "Too short" });
    expect(result.success).toBe(false);
    expect(result.error!.issues[0]!.path[0]).toBe("details");
  });

  it("allows the budget range to be omitted", () => {
    const { budgetRange: _dropped, ...withoutBudget } = valid;
    expect(contactInputSchema.safeParse(withoutBudget).success).toBe(true);
  });
});
