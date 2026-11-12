import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { hospital } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    ...seo({
      title: "Privacy Policy",
      description: "How Janakpur Neuro Hospital collects, uses and protects the personal information you share through this website.",
      path: "/privacy-policy",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }])],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" description="How we handle the information you share with us through this website." crumbs={[{ label: "Privacy Policy" }]} />
      <section className="container-site py-12 sm:py-16">
        <div className="prose-article">
          <h2>Information we collect</h2>
          <p>
            When you request an appointment or send a message, we collect the details you provide, such as your name, phone
            number, email address, preferred department and date, and your message.
          </p>
          <p>
            When you use the website assistant, your questions are processed to generate an answer. Chat conversations are
            kept only in your browser for the current visit. Voice calls are handled by our voice service provider to
            process your speech in real time.
          </p>
          <h2>How we use it</h2>
          <ul>
            <li>To contact you about your appointment request or message.</li>
            <li>To answer general questions about the hospital and its services.</li>
            <li>To keep the website secure and working properly.</li>
          </ul>
          <p>We do not sell your personal information. Please do not share detailed medical records through website forms or the assistant.</p>
          <h2>Who can see it</h2>
          <p>Only authorised hospital staff can view appointment requests and messages submitted through this website.</p>
          <h2>Your choices</h2>
          <p>
            You can ask us to correct or delete the information you submitted by contacting{" "}
            <a href={hospital.email.href}>{hospital.email.display}</a> or calling {hospital.phones.landline.display}.
          </p>
          <h2>Changes</h2>
          <p>We may update this policy from time to time. The latest version is always available on this page.</p>
        </div>
      </section>
    </>
  );
}
