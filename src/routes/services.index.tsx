import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { DepartmentCard } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { departments } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/services/")({
  head: () => ({
    ...seo({
      title: "Our Services & Departments",
      description:
        "Neurology, neurosurgery, brain & spine care, critical care, ICU & HDU, operation theatre, radiology and laboratory services at Janakpur Neuro Hospital.",
      path: "/services",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Our Services", path: "/services" }])],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Departments & Services"
        description="Explore the departments at Janakpur Neuro Hospital. If you're not sure which service you need, contact us and our team will guide you."
        crumbs={[{ label: "Our Services" }]}
      />
      <section className="container-site py-16 sm:py-20">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d, i) => (
            <Reveal as="li" key={d.slug} delay={(i % 3) * 80}>
              <DepartmentCard dept={d} />
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
