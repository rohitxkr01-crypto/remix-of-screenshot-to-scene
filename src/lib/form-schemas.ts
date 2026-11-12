import { z } from "zod";
import { isValidNepalPhone } from "./phone";
import { departments } from "@/content/site";

export const departmentOptions = [...departments.map((d) => d.title), "General enquiry / Not sure"];

function todayISO() {
  // Nepal is UTC+5:45; allow the local calendar date.
  const d = new Date(Date.now() + (5 * 60 + 45) * 60 * 1000);
  return d.toISOString().slice(0, 10);
}

export const appointmentSchema = z.object({
  patientName: z.string().trim().min(2, "Please enter the patient's full name").max(100, "Name is too long"),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a contact number")
    .max(20, "Number is too long")
    .refine(isValidNepalPhone, "Please enter a valid Nepal phone number, e.g. 98XXXXXXXX or 041-591584"),
  email: z
    .string()
    .trim()
    .max(255, "Email is too long")
    .refine((v) => v === "" || z.string().email().safeParse(v).success, "Please enter a valid email address")
    .optional()
    .default(""),
  department: z
    .string()
    .trim()
    .refine((v) => departmentOptions.includes(v), "Please choose a department or service"),
  preferredDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Please choose a preferred date")
    .refine((v) => v >= todayISO(), "Please choose today or a future date"),
  preferredTime: z.string().trim().max(40).optional().default(""),
  message: z.string().trim().max(1000, "Please keep the message under 1000 characters").optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm you agree to be contacted" }) }),
  website: z.string().max(200).optional().default(""), // honeypot
});

export type AppointmentInput = z.input<typeof appointmentSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100, "Name is too long"),
  contact: z
    .string()
    .trim()
    .min(1, "Please enter an email or phone number")
    .max(255, "Too long")
    .refine(
      (v) => z.string().email().safeParse(v).success || isValidNepalPhone(v),
      "Please enter a valid email address or Nepal phone number",
    ),
  message: z.string().trim().min(5, "Please write a short message").max(1500, "Please keep the message under 1500 characters"),
  website: z.string().max(200).optional().default(""), // honeypot
});

export type ContactInput = z.input<typeof contactSchema>;
