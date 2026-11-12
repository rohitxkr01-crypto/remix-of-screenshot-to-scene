import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ArticleCard } from "@/components/site/Cards";
import { Reveal } from "@/components/site/Reveal";
import { CtaBand } from "@/components/site/CtaBand";
import { articles } from "@/content/articles";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/articles/")({
  head: () => ({
    ...seo({
      title: "Health Articles",
      description:
        "Plain-language health articles from Janakpur Neuro Hospital on brain health, spine care, and when to seek neurological help.",
      path: "/articles",
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Health Articles", path: "/articles" }])],
  }),
  component: ArticlesPage,
});

function ArticlesPage() {
  return (
    <>
      <PageHero
        eyebrow="Health articles"
        title="Health Information for Patients & Families"
        description="General health information to help you understand neurological conditions. It does not replace advice from your doctor."
        crumbs={[{ label: "Health Articles" }]}
      />
      <section className="container-site py-16 sm:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <Reveal as="li" key={a.slug} delay={(i % 3) * 80}>
              <ArticleCard article={a} />
            </Reveal>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
