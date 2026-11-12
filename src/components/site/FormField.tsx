import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const fieldInput =
  "block w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground shadow-sm transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-4 focus:ring-ring/20 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive/15";

export function Field({
  id,
  label,
  required,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  required?: boolean | undefined;
  optional?: boolean | undefined;
  error?: string | undefined;
  hint?: string | undefined;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {required && <span className="text-destructive" aria-hidden="true"> *</span>}
        {optional && <span className="font-normal text-muted-foreground"> (optional)</span>}
      </label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="text-sm text-muted-foreground">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-sm font-medium text-destructive animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
