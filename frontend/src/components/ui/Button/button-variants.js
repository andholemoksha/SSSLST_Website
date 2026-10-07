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
        // Solid royal-purple brand button (uses the --primary token).
        solid:
          "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90 hover:text-primary-foreground",
        outline:
          "border border-accent/80 bg-transparent text-accent hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent",
        ghost:
          "bg-transparent text-accent hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent",
        // Low-emphasis neutral button — foreground text, muted hover. For
        // close/dismiss and other secondary icon actions on light surfaces.
        neutral:
          "bg-transparent text-foreground hover:bg-muted hover:text-foreground",
        link: "rounded-none bg-transparent px-0 py-0 text-primary underline-offset-4 hover:text-accent hover:underline",
        nav: "rounded-none bg-transparent px-0 py-0 text-primary hover:text-accent",
      },
      size: {
        default: "h-9 px-4 py-2 text-xs sm:h-11 sm:px-5 sm:text-sm", // smaller on mobile, larger on tablet+
        sm: "h-8 px-3 text-[11px] sm:h-9 sm:px-3 sm:text-xs",
        lg: "h-10 px-4 text-xs sm:h-12 sm:px-8 sm:text-sm sm:text-base",
        icon: "h-11 w-11 p-0 rounded-xl sm:h-12 sm:w-12 [&_svg]:h-6 [&_svg]:w-6 sm:[&_svg]:h-7 sm:[&_svg]:w-7",
        // Compact square icon button (toolbar/dialog close, pagination arrows).
        "icon-sm": "h-9 w-9 p-0 [&_svg]:h-5 [&_svg]:w-5",
        // Compact square cell for a single character/number (pagination).
        cell: "h-9 min-w-9 px-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);
