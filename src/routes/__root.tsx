import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/sonner";
import { SITE_URL, hospital } from "@/content/site";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Hospital", "MedicalOrganization"],
  name: hospital.name,
  alternateName: hospital.shortName,
  slogan: hospital.motto,
  url: SITE_URL,
  email: hospital.email.display,
  telephone: ["+977-41-591584", "+977-9801669434"],
  address: {
    "@type": "PostalAddress",
    streetAddress: hospital.address.line1,
    addressLocality: hospital.address.city,
    addressRegion: `${hospital.address.district}, ${hospital.address.province}`,
    postalCode: hospital.address.postalCode,
    addressCountry: "NP",
  },
  medicalSpecialty: ["Neurology", "Neurosurgery"],
  sameAs: [hospital.facebook],
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-hero px-4 py-20">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-bold text-navy">We couldn't find that page</h1>
        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. You can return home or contact the hospital.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Go to homepage
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-11 items-center justify-center rounded-full border border-input px-6 text-sm font-semibold text-navy hover:border-primary hover:text-primary"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Replace these placeholders with the app's name and description when first building the app.
    // Each content route, / included, must still set its own head(). Never add og:image or
    // twitter:image here: every page without its own would inherit the root's preview image.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Janakpur Neuro Hospital & Research Center" },
      { name: "description", content: "Neurological healthcare in Janakpur, Nepal: neurology, neurosurgery and brain & spine care." },
      { name: "theme-color", content: "#082B45" },
      { property: "og:title", content: "Janakpur Neuro Hospital & Research Center" },
      { property: "og:description", content: "Neurological healthcare in Janakpur, Nepal." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_NP" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preconnect", href: "https://res.cloudinary.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&family=Noto+Sans+Devanagari:wght@400;600&display=swap",
      },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(orgJsonLd) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}
