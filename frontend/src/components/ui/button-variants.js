import { cva } from "class-variance-authority";

/**
 * Shared button style variants used across the app.
 *
 * The default visual language is the same as the hero section so every action
 * feels consistent across the interface.
 *
 * Supported variants:
 * - primary
 * - outline
 * - ghost
 */
export const buttonVariants = cva(
  "inline-flex w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-auto",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-hero-accent text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:glow-accent",
        outline:
          "border border-accent/80 bg-transparent text-accent hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent",
        ghost:
          "bg-transparent text-accent hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent",
      },
      size: {
        default: "h-11 px-5 py-2 text-sm", // 44px min touch target
        sm: "h-9 px-3 text-xs",
        lg: "h-12 px-8 text-sm sm:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
