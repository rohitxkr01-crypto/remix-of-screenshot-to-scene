import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { DoctorAvatar } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { doctors } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/doctors/")({
  head: () => ({
    ...seo({
      title: "Our Doctors",
      description: "Meet the specialists at Janakpur Neuro Hospital, including Consultant Neurosurgeon Dr. Vijay K. Raut, brain and spine surgeon in Janakpur.",
      path: "/doctors",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Our Doctors", path: "/doctors" }])],
  }),
  component: DoctorsPage,
});

function DoctorsPage() {
  return (
    <>
      <PageHero eyebrow="Our doctors" title="Our Specialists" description="Our care is led by specialists in neurological and neurosurgical medicine." crumbs={[{ label: "Our Doctors" }]} />
      <section className="container-site py-16 sm:py-20">
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {doctors.map((d) => (
            <li key={d.slug} className="overflow-hidden rounded-3xl border bg-card shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
              <div className="aspect-[4/3]"><DoctorAvatar doctor={d} /></div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-navy">{d.name}</h2>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  {d.titles.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <Button asChild className="mt-6">
                  <Link to="/doctors/$slug" params={{ slug: d.slug }}>
                    View Doctor Profile <ArrowRight className="transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
