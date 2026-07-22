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
 * - link
 * - nav
 */
export const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 rounded-full text-sm font-medium transition-[transform,color,box-shadow] disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-hero-accent text-white shadow-lg shadow-black/20 hover:-translate-y-0.5 hover:glow-accent",
        outline:
          "border border-accent/80 bg-transparent text-accent hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent",
        ghost:
          "bg-transparent text-accent hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent",
        link: "rounded-none bg-transparent px-0 py-0 text-primary underline-offset-4 hover:text-accent hover:underline",
        nav: "rounded-none bg-transparent px-0 py-0 text-primary hover:text-accent",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs sm:h-11 sm:px-5 sm:text-sm", // smaller on mobile, larger on tablet+
        sm: "h-8 px-3 text-[11px] sm:h-9 sm:px-3 sm:text-xs",
        lg: "h-10 px-4 text-xs sm:h-12 sm:px-8 sm:text-sm sm:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
