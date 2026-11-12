import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CalendarCheck, Clock, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { hospital } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/appointment")({
  head: () => ({
    ...seo({
      title: "Request an Appointment",
      description:
        "Request an appointment at Janakpur Neuro Hospital for neurology, neurosurgery or brain & spine care. Our team will contact you to confirm.",
      path: "/appointment",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Request an Appointment", path: "/appointment" }])],
  }),
  component: AppointmentPage,
});

const steps = [
  { icon: CalendarCheck, title: "Send your request", text: "Fill in the form with your details and preferred date." },
  { icon: Phone, title: "We call you back", text: "Our team contacts you to confirm the time and department." },
  { icon: Clock, title: "Visit the hospital", text: "Bring previous reports, scans and a list of current medicines." },
];

function AppointmentPage() {
  return (
    <>
      <PageHero
        eyebrow="Appointments"
        title="Request an Appointment"
        description="Tell us a little about your needs and preferred time. This is a request — our team will contact you to confirm your appointment."
        crumbs={[{ label: "Request an Appointment" }]}
      />
      <section className="container-site grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr] lg:py-20">
        <div className="rounded-3xl border bg-card p-6 shadow-card sm:p-10">
          <AppointmentForm />
        </div>
        <aside className="space-y-6">
          <div role="note" className="flex gap-3 rounded-3xl border border-emergency/30 bg-emergency/5 p-6">
            <AlertTriangle className="h-6 w-6 shrink-0 text-emergency" aria-hidden="true" />
            <div>
              <h2 className="text-lg font-bold text-navy">Is this an emergency?</h2>
              <p className="mt-1 text-muted-foreground">
                Don't use this form. Call{" "}
                <a href={hospital.phones.landline.href} className="font-semibold text-emergency underline-offset-2 hover:underline">
                  {hospital.phones.landline.display}
                </a>{" "}
                or go to the nearest emergency service immediately.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-surface p-6">
            <h2 className="text-lg font-bold text-navy">What happens next</h2>
            <ol className="mt-4 space-y-4">
              {steps.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-soft text-primary">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{title}</span>
                    <span className="text-muted-foreground">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </>
  );
}
