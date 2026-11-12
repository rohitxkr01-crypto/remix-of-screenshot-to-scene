import { SITE_URL, hospital } from "@/content/site";

interface SeoInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  image?: string;
}

/** Builds per-route head() meta + canonical link. */
export function seo({ title, description, path, type = "website", image }: SeoInput) {
  const fullTitle = title.includes(hospital.shortName) ? title : `${title} | ${hospital.shortName}`;
  const url = `${SITE_URL}${path}`;
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:site_name", content: hospital.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (image) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  return { meta, links: [{ rel: "canonical", href: url }] };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    }),
  };
}
