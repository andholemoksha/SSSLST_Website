import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A centered label flanked by horizontal rules. `variant="sparkle"` adds
 * decorative sparkle icons either side of the label (e.g. "Programme
 * Highlights"); `variant="plain"` is a plain line + label (e.g. "In
 * Association With"). Colors are inherited from the caller's context.
 */
export function SectionDivider({ label, variant = "plain", className }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="h-px flex-1 bg-current opacity-20" aria-hidden="true" />
      {variant === "sparkle" && (
        <Sparkles className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      )}
      <span className="shrink-0 whitespace-nowrap text-sm font-medium tracking-wide">
        {label}
      </span>
      {variant === "sparkle" && (
        <Sparkles className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      )}
      <span className="h-px flex-1 bg-current opacity-20" aria-hidden="true" />
    </div>
  );
}
