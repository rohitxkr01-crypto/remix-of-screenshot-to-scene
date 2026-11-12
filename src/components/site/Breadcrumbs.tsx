import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: "/services" | "/articles" | "/doctors" | "/patient-guide";
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-primary">Home</Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {c.to ? (
              <Link to={c.to} className="hover:text-primary">{c.label}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-navy">{c.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
