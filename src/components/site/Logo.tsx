import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Interim brain-inspired mark. Replace with the hospital's approved logo when supplied. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("h-11 w-11 shrink-0", className)}>
      <rect width="48" height="48" rx="14" className="fill-navy" />
      <path
        d="M24 12c-2.6-2.2-7.6-1.4-8.6 2.4-3.4.2-5.4 3.6-4 6.6-2.6 1.8-2.6 6 .2 7.6-.8 3.4 2 6.2 5.2 5.6 1.2 2.6 5 3.2 7.2 1V12Z"
        className="fill-none stroke-teal-bright"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path
        d="M24 12c2.6-2.2 7.6-1.4 8.6 2.4 3.4.2 5.4 3.6 4 6.6 2.6 1.8 2.6 6-.2 7.6.8 3.4-2 6.2-5.2 5.6-1.2 2.6-5 3.2-7.2 1V12Z"
        className="fill-none stroke-navy-foreground"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M17 22h4l2-3 3 7 2-4h3" className="fill-none stroke-teal-bright" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Janakpur Neuro Hospital home">
      <LogoMark />
      <span className="min-w-0 leading-tight">
        <span className={cn("block font-display text-[1.05rem] font-bold tracking-tight sm:text-lg", light ? "text-navy-foreground" : "text-navy")}>
          Janakpur Neuro Hospital
        </span>
        <span className={cn("block truncate text-[0.7rem] font-medium uppercase tracking-[0.14em]", light ? "text-navy-muted" : "text-muted-foreground")}>
          & Research Center Pvt. Ltd.
        </span>
      </span>
    </Link>
  );
}
