import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ContactInfo } from "@/components/site/ContactInfo";
import { ContactForm } from "@/components/site/ContactForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...seo({
      title: "Contact Us",
      description:
        "Contact Janakpur Neuro Hospital in Janakpur, Dhanusha: phone, WhatsApp, email, address and directions, or send us a message online.",
      path: "/contact",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact Janakpur Neuro Hospital"
        description="Call, message or visit us. For medical emergencies, please call the hospital or go to the nearest emergency service immediately."
        crumbs={[{ label: "Contact" }]}
      />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-2 lg:py-20">
        <div>
          <SectionHeading eyebrow="Contact details" title="Reach our team" />
          <div className="mt-8">
            <ContactInfo />
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-card sm:p-10">
          <SectionHeading eyebrow="Send a message" title="We'll get back to you" />
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
