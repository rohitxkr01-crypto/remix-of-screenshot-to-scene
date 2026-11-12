import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, CalendarCheck, ClipboardList, FileText, HeartHandshake, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { hospital } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/patient-guide")({
  head: () => ({
    ...seo({
      title: "Patient Guide",
      description:
        "How to prepare for your visit to Janakpur Neuro Hospital: booking, what to bring, admission, and guidance for families and visitors.",
      path: "/patient-guide",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Patient Guide", path: "/patient-guide" }])],
  }),
  component: PatientGuidePage,
});

const sections = [
  {
    icon: CalendarCheck,
    title: "Booking a visit",
    items: [
      "Request an appointment online or call the hospital.",
      "Our team will contact you to confirm the date, time and department.",
      "If you are unsure which department you need, tell us your symptoms and we will guide you.",
    ],
  },
  {
    icon: ClipboardList,
    title: "What to bring",
    items: [
      "Previous medical reports, prescriptions and discharge summaries.",
      "Scans and films (CT, MRI, X-ray) with their reports.",
      "A list of all medicines you currently take, including doses.",
      "A valid identity document and a family member's contact number.",
    ],
  },
  {
    icon: FileText,
    title: "During your consultation",
    items: [
      "Describe when your symptoms started and how they have changed.",
      "Ask questions — write them down beforehand so you don't forget.",
      "Ask about the plan, the next steps and when to follow up.",
    ],
  },
  {
    icon: HeartHandshake,
    title: "For families & visitors",
    items: [
      "Please follow the instructions of the care team, especially in ICU and HDU.",
      "Visiting arrangements can change; contact the hospital for current guidance.",
      "Keep the patient's reports together in one folder for every visit.",
    ],
  },
];

function PatientGuidePage() {
  return (
    <>
      <PageHero
        eyebrow="Patient guide"
        title="Preparing for Your Visit"
        description="Simple steps to help you and your family make the most of your visit to Janakpur Neuro Hospital."
        crumbs={[{ label: "Patient Guide" }]}
      />
      <section className="container-site py-16 sm:py-20">
        <div role="note" className="flex flex-col gap-4 rounded-3xl border border-emergency/30 bg-emergency/5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <AlertTriangle className="h-6 w-6 shrink-0 text-emergency" aria-hidden="true" />
            <p className="text-foreground">
              <strong className="text-navy">In an emergency</strong> — head injury, seizure, sudden weakness, loss of consciousness —
              do not wait for an appointment. Call the hospital or go to the nearest emergency service immediately.
            </p>
          </div>
          <Button asChild variant="destructive" className="shrink-0">
            <a href={hospital.phones.landline.href}><Phone aria-hidden="true" /> {hospital.phones.landline.display}</a>
          </Button>
        </div>

        <SectionHeading className="mt-16" eyebrow="Step by step" title="Your visit, made simpler" />
        <ul className="mt-10 grid gap-5 md:grid-cols-2">
          {sections.map(({ icon: Icon, title, items }, i) => (
            <Reveal as="li" key={title} delay={(i % 2) * 80} className="rounded-3xl border bg-card p-7 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-soft text-primary">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-bold text-navy">{title}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                {items.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Reveal>
          ))}
        </ul>
        <div className="mt-12 flex flex-wrap gap-3">
          <Button asChild><Link to="/appointment">Request an Appointment</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact the hospital</Link></Button>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
