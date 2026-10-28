import { z } from "zod";

export const AREA_OPTIONS = [
  "Product Management",
  "Product Strategy",
  "Network Marketing",
  "Business Development",
  "Partnership Opportunity",
  "Other",
] as const;

export const BUDGET_OPTIONS = [
  "Prefer not to say",
  "Undecided",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
] as const;

export const contactInputSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be under 100 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(255, "Email must be under 255 characters."),
  areaOfInterest: z.enum(AREA_OPTIONS, {
    message: "Please choose an area of interest.",
  }),
  details: z
    .string()
    .trim()
    .min(20, "Please share a few details (at least 20 characters).")
    .max(2000, "Message must be under 2000 characters."),
  budgetRange: z
    .union([z.enum(BUDGET_OPTIONS), z.literal("")])
    .optional(),
});

export type ContactInput = z.infer<typeof contactInputSchema>;
