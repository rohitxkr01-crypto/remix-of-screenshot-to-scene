import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { departments, doctors } from "@/content/site";
import { articles } from "@/content/articles";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    ...seo({
      title: "Sitemap",
      description: "All pages on the Janakpur Neuro Hospital website: services, doctors, patient guide, health articles and contact.",
      path: "/sitemap",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Sitemap", path: "/sitemap" }])],
  }),
  component: SitemapPage,
});

const link = "text-navy hover:text-primary";

function SitemapPage() {
  return (
    <>
      <PageHero title="Sitemap" description="Every page on our website in one place." crumbs={[{ label: "Sitemap" }]} />
      <section className="container-site grid gap-10 py-12 sm:grid-cols-2 sm:py-16 lg:grid-cols-4">
        <div>
          <h2 className="text-lg font-bold text-navy">Hospital</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/" className={link}>Home</Link></li>
            <li><Link to="/about" className={link}>About Us</Link></li>
            <li><Link to="/gallery" className={link}>Gallery</Link></li>
            <li><Link to="/contact" className={link}>Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-navy">Services</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/services" className={link}>All departments</Link></li>
            {departments.map((d) => (
              <li key={d.slug}><Link to="/services/$slug" params={{ slug: d.slug }} className={link}>{d.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-navy">Patients</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/appointment" className={link}>Request an Appointment</Link></li>
            <li><Link to="/patient-guide" className={link}>Patient Guide</Link></li>
            <li><Link to="/doctors" className={link}>Our Doctors</Link></li>
            {doctors.map((d) => (
              <li key={d.slug}><Link to="/doctors/$slug" params={{ slug: d.slug }} className={link}>{d.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-bold text-navy">Health Articles</h2>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/articles" className={link}>All articles</Link></li>
            {articles.map((a) => (
              <li key={a.slug}><Link to="/articles/$slug" params={{ slug: a.slug }} className={link}>{a.title}</Link></li>
            ))}
            <li><Link to="/privacy-policy" className={link}>Privacy Policy</Link></li>
            <li><Link to="/terms" className={link}>Terms & Conditions</Link></li>
          </ul>
        </div>
      </section>
    </>
  );
}
