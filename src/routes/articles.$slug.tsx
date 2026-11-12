import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ArticleCard } from "@/components/site/Cards";
import { CtaBand } from "@/components/site/CtaBand";
import { Button } from "@/components/ui/button";
import { articles, getArticle } from "@/content/articles";
import { hospital, SITE_URL } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/articles/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article not found | Janakpur Neuro Hospital" }, { name: "robots", content: "noindex" }] };
    const { article } = loaderData;
    return {
      ...seo({ title: article.title, description: article.excerpt, path: `/articles/${params.slug}`, type: "article" }),
      scripts: [
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Health Articles", path: "/articles" },
          { name: article.title, path: `/articles/${params.slug}` },
        ]),
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalWebPage",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.published,
            dateModified: article.updated,
            url: `${SITE_URL}/articles/${params.slug}`,
            publisher: { "@type": "Hospital", name: hospital.name, url: SITE_URL },
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={article.category}
        title={article.title}
        description={article.excerpt}
        crumbs={[{ label: "Health Articles", to: "/articles" }, { label: article.title }]}
      >
        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>Updated {dateFmt.format(new Date(article.updated))}</span>
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> {article.readMinutes} min read</span>
          {article.reviewer && <span>Reviewed by {article.reviewer}</span>}
        </p>
      </PageHero>
      <article className="container-site py-12 sm:py-16">
        <div className="mx-auto max-w-[44rem]">
          <img
            src={article.image}
            alt={article.imageAlt}
            width={1200}
            height={800}
            className="aspect-[3/2] w-full rounded-3xl object-cover shadow-elevated"
          />
          <div className="prose-article mt-10">
            {article.sections.map((s) => (
              <section key={s.heading}>
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.bullets && (
                  <ul>
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                )}
              </section>
            ))}
          </div>
          <p className="mt-10 rounded-2xl bg-surface p-5 text-sm text-muted-foreground">
            This article is general information and is not a substitute for medical advice. Please consult a doctor about
            your own health. In an emergency, call{" "}
            <a href={hospital.phones.landline.href} className="font-semibold text-primary">{hospital.phones.landline.display}</a>.
          </p>
          <Button asChild variant="outline" className="mt-8">
            <Link to="/articles"><ArrowLeft aria-hidden="true" /> All articles</Link>
          </Button>
        </div>
      </article>
      {related.length > 0 && (
        <section className="bg-surface py-16">
          <div className="container-site">
            <h2 className="text-2xl font-bold text-navy">More articles</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {related.map((a) => <li key={a.slug}><ArticleCard article={a} /></li>)}
            </ul>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
