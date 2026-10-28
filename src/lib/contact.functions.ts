import { createServerFn } from "@tanstack/react-start";

import { contactInputSchema } from "./contact-schema";

/**
 * Public contact-form endpoint. Input is validated server-side with the
 * shared zod schema; the row is inserted with the privileged server client
 * because the table has no anon write policy (spam protection by design).
 */
export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactInputSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import(
        "@/integrations/supabase/client.server"
      );
      const { error } = await supabaseAdmin.from("contact_messages").insert({
        full_name: data.fullName,
        email: data.email,
        area_of_interest: data.areaOfInterest,
        details: data.details,
        budget_range: data.budgetRange || null,
      });

      if (error) {
        console.error("contact_messages insert failed:", error.message);
        return {
          ok: false as const,
          message:
            "Your message could not be delivered right now. Please try again in a moment.",
        };
      }

      return { ok: true as const };
    } catch (error) {
      console.error("submitContactMessage failed:", error);
      return {
        ok: false as const,
        message:
          "Your message could not be delivered right now. Please try again in a moment.",
      };
    }
  });
