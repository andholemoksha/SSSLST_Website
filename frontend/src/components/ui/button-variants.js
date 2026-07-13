import { cva } from "class-variance-authority";

/**
 * Button style variants (see DESIGN_SYSTEM.md "Buttons").
 * `default` is the Primary button — brand purple, never orange.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        // Scoped to dark/glass contexts (the Hero and future dark sections)
        // ONLY — do not use these as general-purpose primary buttons.
        heroPrimary:
          "bg-gradient-hero-accent text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:glow-accent",
        heroOutline:
          "border border-accent/70 bg-transparent text-white hover:-translate-y-0.5 hover:bg-white/10",
      },
      size: {
        default: "h-11 px-5 py-2", // 44px min touch target
        sm: "h-9 px-3",
        lg: "h-12 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
