import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b bg-hero">
      <div className="container-site py-12 sm:py-16">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl animate-rise">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl font-bold text-navy sm:text-5xl">{title}</h1>
          {description && <p className="mt-4 text-lg text-muted-foreground">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
