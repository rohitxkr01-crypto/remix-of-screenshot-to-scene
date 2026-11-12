import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Gallery } from "@/components/site/Gallery";
import { CtaBand } from "@/components/site/CtaBand";
import { gallery, heroImage } from "@/content/site";
import { breadcrumbJsonLd, seo } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    ...seo({
      title: "Hospital Gallery",
      description:
        "Photos of Janakpur Neuro Hospital: our operation theatre, laboratory, medical team and community programmes in Janakpur.",
      path: "/gallery",
      image: heroImage.src,
    }),
    scripts: [breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Gallery", path: "/gallery" }])],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside Our Hospital & Community"
        description="A look at our facilities, our team and our work in the community. Select any photo to view it larger."
        crumbs={[{ label: "Gallery" }]}
      />
      <section className="container-site py-16 sm:py-20">
        <Gallery images={gallery} />
      </section>
      <CtaBand />
    </>
  );
}
