import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BadgeCheck, CalendarCheck, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { DoctorAvatar } from "@/components/site/Cards";
import { Button } from "@/components/ui/button";
import { doctors, hospital, SITE_URL } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/doctors/$slug")({
  loader: ({ params }) => {
    const doctor = doctors.find((d) => d.slug === params.slug);
    if (!doctor) throw notFound();
    return { doctor };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Doctor not found | Janakpur Neuro Hospital" }, { name: "robots", content: "noindex" }] };
    const { doctor } = loaderData;
    return {
      ...seo({
        title: `${doctor.name}, ${doctor.titles[0]}`,
        description: `${doctor.name}: ${doctor.titles.join(", ")} at Janakpur Neuro Hospital, Janakpur, Nepal.`,
        path: `/doctors/${params.slug}`,
        type: "profile",
      }),
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Doctors", path: "/doctors" },
          { name: doctor.name, path: `/doctors/${params.slug}` },
        ]),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            name: doctor.name,
            jobTitle: doctor.titles.join(", "),
            medicalSpecialty: "Neurosurgery",
            url: `${SITE_URL}/doctors/${params.slug}`,
            worksFor: { "@type": "Hospital", name: hospital.name, url: SITE_URL },
          }),
        },
      ],
    };
  },
  component: DoctorPage,
});

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <h3 className="text-lg font-bold text-navy">{title}</h3>
      {items.length ? (
        <ul className="mt-3 space-y-2">
          {items.map((i) => (
            <li key={i} className="flex gap-2.5"><BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> {i}</li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-muted-foreground">Details will be published once confirmed by the hospital.</p>
      )}
    </div>
  );
}

function DoctorPage() {
  const { doctor } = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Doctor profile" title={doctor.name} description={doctor.titles.join(" · ")} crumbs={[{ label: "Our Doctors", to: "/doctors" }, { label: doctor.name }]} />
      <section className="container-site grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <div className="h-fit overflow-hidden rounded-[2rem] border bg-card shadow-elevated lg:sticky lg:top-28">
          <div className="aspect-square"><DoctorAvatar doctor={doctor} size="xl" /></div>
          <div className="space-y-3 p-6">
            <Button asChild size="lg" className="w-full">
              <Link to="/appointment"><CalendarCheck aria-hidden="true" /> Request an Appointment</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full">
              <a href={hospital.phones.landline.href}><Phone aria-hidden="true" /> {hospital.phones.landline.display}</a>
            </Button>
          </div>
        </div>
        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-6">
            <h2 className="text-2xl font-bold text-navy">Designation</h2>
            <ul className="mt-3 space-y-2 text-lg">
              {doctor.titles.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <DetailList title="Specializations" items={doctor.specializations} />
          <DetailList title="Qualifications" items={doctor.qualifications} />
          <DetailList title="Professional experience" items={doctor.experience} />
          <DetailList title="Languages" items={doctor.languages} />
        </div>
      </section>
    </>
  );
}
