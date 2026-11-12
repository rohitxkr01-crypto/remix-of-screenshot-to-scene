import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, fieldInput } from "./FormField";
import { contactSchema } from "@/lib/form-schemas";
import { submitContact } from "@/lib/forms.functions";

type Values = { name: string; contact: string; message: string; website: string };
const initial: Values = { name: "", contact: "", message: "", website: "" };

export function ContactForm() {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const submit = useServerFn(submitContact);

  const set = (k: keyof Values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      const res = await submit({ data: values });
      if (res.ok) {
        setStatus("success");
        setValues(initial);
      } else {
        setStatus("error");
        setServerError(res.error);
      }
    } catch {
      setStatus("error");
      setServerError("We couldn't send your message right now. Please try again or call the hospital.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-primary/30 bg-accent p-8 text-center animate-in fade-in zoom-in-95">
        <CircleCheck className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-bold text-navy">Message sent</h3>
        <p className="mt-2 text-foreground">Thank you. Our team will get back to you using the details you provided.</p>
        <Button className="mt-5" variant="outline" onClick={() => setStatus("idle")}>Send another message</Button>
      </div>
    );
  }

  const aria = (k: keyof Values) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Contact form">
      <Field id="contact-name" label="Your name" required error={errors.name}>
        <input id="contact-name" className={fieldInput} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />
      </Field>
      <Field id="contact-contact" label="Email or phone number" required error={errors.contact}>
        <input id="contact-contact" className={fieldInput} autoComplete="email" value={values.contact} onChange={(e) => set("contact", e.target.value)} {...aria("contact")} />
      </Field>
      <Field id="contact-message" label="Message" required error={errors.message} hint="For medical emergencies, please go to the nearest emergency service.">
        <textarea id="contact-message" rows={5} className={fieldInput} value={values.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} />
      </Field>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>
      <p className="text-sm text-muted-foreground">
        By sending this message you agree that the hospital may store your details to respond to you.
      </p>
      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <CircleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p>{serverError}</p>
        </div>
      )}
      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (<><LoaderCircle className="animate-spin" aria-hidden="true" /> Sending…</>) : "Send message"}
      </Button>
    </form>
  );
}
