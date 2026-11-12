import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock } from "lucide-react";
import type { Department, Doctor } from "@/content/site";
import type { Article } from "@/content/articles";
import { DeptIcon } from "./DeptIcon";
import { cn } from "@/lib/utils";

export function DepartmentCard({ dept, compact = false }: { dept: Department; compact?: boolean }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: dept.slug }}
      className={cn(
        "group flex h-full flex-col rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-elevated",
        compact ? "p-4" : "p-6",
      )}
    >
      <span className={cn("grid place-items-center rounded-xl bg-soft text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground", compact ? "h-11 w-11" : "h-14 w-14")}>
        <DeptIcon name={dept.icon} className={cn("transition-transform duration-300 group-hover:scale-110", compact ? "h-5 w-5" : "h-7 w-7")} strokeWidth={1.75} />
      </span>
      <h3 className={cn("mt-4 font-bold text-navy", compact ? "text-[0.98rem]" : "text-xl")}>{dept.title}</h3>
      <p className={cn("mt-1.5 text-muted-foreground", compact ? "text-sm leading-snug" : "")}>{compact ? dept.short : dept.intro}</p>
      {!compact && (
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
          Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      )}
    </Link>
  );
}

export function DoctorAvatar({ doctor, size = "lg" }: { doctor: Doctor; size?: "lg" | "xl" }) {
  if (doctor.photo) {
    return <img src={doctor.photo} alt={`Portrait of ${doctor.name}`} className="h-full w-full object-cover" />;
  }
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden bg-gradient-navy" role="img" aria-label={`Photo of ${doctor.name} to be added`}>
      <div className="absolute inset-0 grid-dots" aria-hidden="true" />
      <span className={cn("relative font-display font-bold text-navy-foreground", size === "xl" ? "text-7xl" : "text-5xl")}>
        {doctor.initials}
      </span>
    </div>
  );
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to="/articles/$slug"
      params={{ slug: article.slug }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
    >
      <div className="aspect-[3/2] overflow-hidden bg-soft">
        <img
          src={article.image}
          alt={article.imageAlt}
          loading="lazy"
          width={1200}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider">
          <span className="text-primary">{article.category}</span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readMinutes} min read
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold text-navy group-hover:text-primary">{article.title}</h3>
        <p className="mt-2 text-muted-foreground">{article.excerpt}</p>
        <span className="mt-auto flex items-center gap-1.5 pt-5 text-sm font-semibold text-primary">
          Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
