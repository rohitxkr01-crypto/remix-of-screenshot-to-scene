import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  as: H = "h2",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-3 flex items-center gap-2", align === "center" && "justify-center", light && "text-teal-bright")}>
          <span className={cn("h-px w-6", light ? "bg-teal-bright" : "bg-primary")} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <H className={cn("text-3xl font-bold sm:text-4xl", light ? "text-navy-foreground" : "text-navy")}>{title}</H>
      {description && (
        <p className={cn("mt-4 text-lg", light ? "text-navy-muted" : "text-muted-foreground")}>{description}</p>
      )}
    </div>
  );
}
