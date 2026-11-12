import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Brain, HandHeart, MessageCircle, Target } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";
import { DepartmentCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { departments, hospital, teamEventImage } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    ...seo({
      title: "About Us",
      description:
        "Learn about Janakpur Neuro Hospital & Research Center Pvt. Ltd., a neurological healthcare institution in Janakpur, Dhanusha, dedicated to patient-focused care.",
      path: "/about",
      image: teamEventImage.src,
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }])],
  }),
  component: AboutPage,
});

const values = [
  { icon: Brain, title: "Neurological focus", text: "Care centred on the brain, spine and nervous system." },
  { icon: MessageCircle, title: "Clear communication", text: "Explaining conditions and options in plain language." },
  { icon: HandHeart, title: "Compassion", text: "Treating every patient and family with dignity and respect." },
  { icon: Target, title: "Excellence & trust", text: "Working to earn the confidence of our community." },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About our hospital"
        title="Healthcare Built Around People, Professionalism and Trust"
        description={`${hospital.name} is a neurological healthcare institution in Janakpur, dedicated to providing patient-focused medical care and guidance for individuals and families in the region.`}
        crumbs={[{ label: "About Us" }]}
      />
      <section className="container-site grid items-center gap-12 py-20 lg:grid-cols-2">
        <Reveal className="overflow-hidden rounded-[2rem] shadow-elevated">
          <img src={teamEventImage.src} alt={teamEventImage.alt} width={teamEventImage.width} height={teamEventImage.height} className="aspect-[4/3] w-full object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="Who we are" title="Neurological care for Janakpur and Madhesh Province" />
          <div className="mt-6 space-y-4 text-lg text-foreground">
            <p>
              Neurological conditions can be frightening and confusing. Our hospital exists so that patients and families
              in Janakpur and the surrounding region can access neurological and neurosurgical care with clear guidance
              and respectful communication.
            </p>
            <p className="text-muted-foreground">
              Our services cover neurology, neurosurgery, brain and spine care, critical care including ICU and HDU,
              operation theatre services, radiology and diagnostics, and medical laboratory services. Availability of
              specific services may change, so please contact us to confirm before your visit.
            </p>
          </div>
          <p className="mt-6 font-display text-2xl font-semibold italic text-primary">"{hospital.motto}"</p>
        </Reveal>
      </section>

      <section className="bg-surface py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Our values" title="What guides our care" align="center" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 80} className="rounded-3xl border bg-card p-7 shadow-card">
                <Icon className="h-8 w-8 text-primary" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-bold text-navy">{title}</h3>
                <p className="mt-1.5 text-muted-foreground">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Our departments" title="Services at our hospital" />
          <Button asChild variant="outline"><Link to="/services">View all services</Link></Button>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {departments.map((d) => (
            <li key={d.slug}><DepartmentCard dept={d} compact /></li>
          ))}
        </ul>
        <ul className="mt-12 grid gap-3 text-muted-foreground sm:grid-cols-2">
          <li className="flex gap-2.5"><BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> Located at Murli Chowk / Bishara Chowk, Ward No. 4, Janakpur</li>
          <li className="flex gap-2.5"><BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> Serving patients across Dhanusha and Madhesh Province</li>
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
