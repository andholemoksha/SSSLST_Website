import { forwardRef } from "react";
import { cn } from "@/lib/utils";

/**
 * The one glassmorphism surface used across the app (dark/hero contexts).
 * Every glass card — feature tiles, the UGC card, future stat/info cards —
 * should render through this component rather than re-declaring the glass
 * styling inline.
 */
export const GlassCard = forwardRef(function GlassCard(
  { as: Component = "div", className, ...props },
  ref
) {
  return (
    <Component
      ref={ref}
      className={cn(
        "glass-surface rounded-2xl border-glass-border p-6 transition-all duration-300",
        "hover:scale-[1.02] hover:border-glass-border-hover hover:glow-accent",
        className
      )}
      {...props}
    />
  );
});
