import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Info, Phone } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { DeptIcon } from "@/components/site/DeptIcon";
import { DepartmentCard } from "@/components/site/Cards";
import { AppointmentForm } from "@/components/site/AppointmentForm";
import { Button } from "@/components/ui/button";
import { departments, hospital } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const dept = departments.find((d) => d.slug === params.slug);
    if (!dept) throw notFound();
    return { dept };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Service not found | Janakpur Neuro Hospital" }, { name: "robots", content: "noindex" }] };
    const { dept } = loaderData;
    return {
      ...seo({
        title: `${dept.title} in Janakpur`,
        description: `${dept.intro} ${dept.title} at Janakpur Neuro Hospital, Dhanusha, Nepal.`,
        path: `/services/${params.slug}`,
      }),
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Our Services", path: "/services" },
          { name: dept.title, path: `/services/${params.slug}` },
        ]),
      ],
    };
  },
  component: DepartmentPage,
});

function DepartmentPage() {
  const { dept } = Route.useLoaderData();
  const others = departments.filter((d) => d.slug !== dept.slug).slice(0, 4);
  return (
    <>
      <PageHero eyebrow="Department" title={dept.title} description={dept.intro} crumbs={[{ label: "Our Services", to: "/services" }, { label: dept.title }]}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg"><a href="#request">Request an Appointment</a></Button>
          <Button asChild size="lg" variant="outline">
            <a href={hospital.phones.landline.href}><Phone aria-hidden="true" /> {hospital.phones.landline.display}</a>
          </Button>
        </div>
      </PageHero>

      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:py-20">
        <div>
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent text-primary">
            <DeptIcon name={dept.icon} className="h-8 w-8" strokeWidth={1.75} />
          </span>
          <h2 className="mt-6 text-3xl font-bold text-navy">About {dept.title}</h2>
          <div className="mt-4 space-y-4 text-lg text-foreground">
            {dept.about.map((p) => <p key={p}>{p}</p>)}
          </div>
          <h3 className="mt-10 text-2xl font-bold text-navy">How we can help</h3>
          <ul className="mt-5 grid gap-3">
            {dept.covers.map((c) => (
              <li key={c} className="flex gap-3 rounded-xl border bg-card p-4">
                <BadgeCheck className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex gap-3 rounded-2xl bg-surface p-5 text-sm text-muted-foreground">
            <Info className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p>This page is general information, not medical advice. Please contact the hospital to confirm current service availability.</p>
          </div>
        </div>
        <aside id="request" className="h-fit scroll-mt-28 rounded-[2rem] border bg-card p-6 shadow-elevated sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-2xl font-bold text-navy">Request an appointment</h2>
          <p className="mt-2 text-muted-foreground">Our team will call you to confirm a time.</p>
          <div className="mt-6">
            <AppointmentForm defaultDepartment={dept.title} />
          </div>
        </aside>
      </section>

      <section className="bg-surface py-16">
        <div className="container-site">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">Other departments</h2>
            <Link to="/services" className="flex items-center gap-1 font-semibold text-primary hover:underline">
              All services <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {others.map((d) => <li key={d.slug}><DepartmentCard dept={d} compact /></li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
