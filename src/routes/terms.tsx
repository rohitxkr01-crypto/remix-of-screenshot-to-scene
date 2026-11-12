import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { hospital } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () => ({
    ...seo({
      title: "Terms & Conditions",
      description: "Terms for using the Janakpur Neuro Hospital website, online appointment requests and the website assistant.",
      path: "/terms",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Terms & Conditions", path: "/terms" }])],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero title="Terms & Conditions" description="Please read these terms before using this website." crumbs={[{ label: "Terms & Conditions" }]} />
      <section className="container-site py-12 sm:py-16">
        <div className="prose-article">
          <h2>General information only</h2>
          <p>
            The content on this website, including health articles and answers from the website assistant, is general
            information. It is not a diagnosis, prescription or substitute for a consultation with a qualified doctor.
          </p>
          <h2>Emergencies</h2>
          <p>
            Do not use this website, its forms or its assistant in a medical emergency. Call {hospital.phones.landline.display} or
            go to the nearest emergency service immediately.
          </p>
          <h2>Appointment requests</h2>
          <p>
            Submitting the online form is a request, not a confirmed appointment. Our team will contact you to confirm the
            date and time, which depend on availability.
          </p>
          <h2>Accuracy</h2>
          <p>
            We work to keep information on this website accurate and up to date, but services, schedules and availability can
            change. Please contact the hospital to confirm details before your visit.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent to <a href={hospital.email.href}>{hospital.email.display}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
