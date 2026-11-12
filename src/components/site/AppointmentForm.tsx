import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CircleAlert, CircleCheck, LoaderCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, fieldInput } from "./FormField";
import { appointmentSchema, departmentOptions } from "@/lib/form-schemas";
import { submitAppointment } from "@/lib/forms.functions";
import { hospital } from "@/content/site";

type Values = {
  patientName: string;
  phone: string;
  email: string;
  department: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
  website: string;
};

const initial: Values = {
  patientName: "",
  phone: "",
  email: "",
  department: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
  consent: false,
  website: "",
};

const timeOptions = ["Morning", "Midday", "Afternoon", "Any time"];

export function AppointmentForm({ defaultDepartment }: { defaultDepartment?: string }) {
  const [values, setValues] = useState<Values>({ ...initial, department: defaultDepartment ?? "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const submit = useServerFn(submitAppointment);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = appointmentSchema.safeParse(values);
    if (!parsed.success) {
      const errs: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof Values;
        if (!errs[k]) errs[k] = issue.message;
      }
      setErrors(errs);
      const first = Object.keys(errs)[0];
      if (first) document.getElementById(`appt-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    setServerError("");
    try {
      const res = await submit({ data: values });
      if (res.ok) {
        setStatus("success");
        setValues({ ...initial });
      } else {
        setStatus("error");
        setServerError(res.error);
      }
    } catch {
      setStatus("error");
      setServerError("We couldn't send your request right now. Please check your details and try again, or call the hospital.");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-3xl border border-primary/30 bg-accent p-8 text-center animate-in fade-in zoom-in-95">
        <CircleCheck className="mx-auto h-14 w-14 text-primary" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-bold text-navy">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-foreground">
          Thank you for contacting Janakpur Neuro Hospital. Your appointment request has been received. Our team will
          contact you using the details provided.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          This is a request, not a confirmed booking. Your appointment is confirmed only when our staff contact you.
        </p>
        <Button className="mt-6" variant="outline" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  const aria = (k: keyof Values) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `appt-${k}-error` : undefined,
  });

  const today = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label="Appointment request form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="appt-patientName" label="Patient name" required error={errors.patientName}>
          <input id="appt-patientName" className={fieldInput} autoComplete="name" value={values.patientName} onChange={(e) => set("patientName", e.target.value)} {...aria("patientName")} />
        </Field>
        <Field id="appt-phone" label="Contact number" required error={errors.phone} hint="Nepal mobile or landline, e.g. 98XXXXXXXX">
          <input id="appt-phone" type="tel" inputMode="tel" className={fieldInput} autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />
        </Field>
        <Field id="appt-email" label="Email" optional error={errors.email}>
          <input id="appt-email" type="email" className={fieldInput} autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />
        </Field>
        <Field id="appt-department" label="Department / service" required error={errors.department}>
          <select id="appt-department" className={fieldInput} value={values.department} onChange={(e) => set("department", e.target.value)} {...aria("department")}>
            <option value="">Select a department</option>
            {departmentOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </Field>
        <Field id="appt-preferredDate" label="Preferred date" required error={errors.preferredDate}>
          <input id="appt-preferredDate" type="date" min={today} className={fieldInput} value={values.preferredDate} onChange={(e) => set("preferredDate", e.target.value)} {...aria("preferredDate")} />
        </Field>
        <Field id="appt-preferredTime" label="Preferred time" optional error={errors.preferredTime}>
          <select id="appt-preferredTime" className={fieldInput} value={values.preferredTime} onChange={(e) => set("preferredTime", e.target.value)}>
            <option value="">No preference</option>
            {timeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field id="appt-message" label="Reason for visit / message" optional error={errors.message} hint="Please don't include detailed medical records here.">
        <textarea id="appt-message" rows={4} className={fieldInput} value={values.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} />
      </Field>

      {/* Honeypot: hidden from people, tempting for bots */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="appt-website">Website</label>
        <input id="appt-website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-surface p-4">
          <input
            id="appt-consent"
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-primary"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            {...aria("consent")}
          />
          <span className="text-sm text-foreground">
            I agree that Janakpur Neuro Hospital may store these details and contact me about this request. I understand
            this is a request, not a confirmed appointment. See our{" "}
            <Link to="/privacy-policy" className="font-semibold text-primary underline-offset-2 hover:underline">Privacy Policy</Link>.
          </span>
        </label>
        {errors.consent && (
          <p id="appt-consent-error" role="alert" className="mt-1.5 text-sm font-medium text-destructive">{errors.consent}</p>
        )}
      </div>

      {status === "error" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <CircleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            {serverError}{" "}
            <a href={hospital.phones.landline.href} className="font-semibold underline">Call {hospital.phones.landline.display}</a>
          </p>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" /> Sending request…
            </>
          ) : (
            "Send appointment request"
          )}
        </Button>
        <a href={hospital.phones.landline.href} className="flex items-center justify-center gap-2 text-sm font-semibold text-navy hover:text-primary">
          <Phone className="h-4 w-4" aria-hidden="true" /> Prefer to call? {hospital.phones.landline.display}
        </a>
      </div>
    </form>
  );
}
