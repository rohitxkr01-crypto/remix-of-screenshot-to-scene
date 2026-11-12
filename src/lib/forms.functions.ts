import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { appointmentSchema, contactSchema } from "./form-schemas";
import { normalizeNepalPhone } from "./phone";

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Backend is not configured");
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

type Result = { ok: true } | { ok: false; error: string };

export const submitAppointment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => appointmentSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    if (data.website) return { ok: true }; // honeypot filled: silently drop bot submissions
    const { error } = await publicClient()
      .from("appointment_requests")
      .insert({
        patient_name: data.patientName,
        phone: normalizeNepalPhone(data.phone),
        email: data.email || null,
        department: data.department,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime || null,
        message: data.message || null,
        consent: true,
      });
    if (error) {
      console.error("appointment insert failed", error.message);
      return { ok: false, error: "We couldn't send your request right now. Please try again or call the hospital." };
    }
    return { ok: true };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<Result> => {
    if (data.website) return { ok: true };
    const { error } = await publicClient().from("contact_messages").insert({
      name: data.name,
      contact: data.contact,
      message: data.message,
    });
    if (error) {
      console.error("contact insert failed", error.message);
      return { ok: false, error: "We couldn't send your message right now. Please try again or call the hospital." };
    }
    return { ok: true };
  });
