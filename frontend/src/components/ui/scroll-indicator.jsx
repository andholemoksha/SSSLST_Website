import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Circular scroll cue with a bouncing chevron. Shows a label on mobile and
 * shrinks to a small dot on large screens. Respects reduced-motion via
 * `motion-safe:`.
 */
export function ScrollIndicator({ label, className, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 text-white transition-transform hover:scale-105 focus:outline-none",
        className
      )}
    >
      <span
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/10 shadow-lg shadow-black/20 backdrop-blur-sm",
          "motion-safe:animate-bounce",
          "lg:h-12 lg:w-12 lg:border-white/30 lg:bg-white/10"
        )}
        aria-hidden="true"
      >
        <ChevronDown className="h-5 w-5 text-white lg:h-6 lg:w-6" />
      </span>
      {label && <span className="text-xs text-white/80 lg:hidden">{label}</span>}
    </button>
  );
}
