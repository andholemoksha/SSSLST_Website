import { cva } from "class-variance-authority";

/**
 * Shared typography variants for the application.
 *
 * This keeps the site from repeating ad-hoc text classes while still using the
 * existing semantic theme tokens from src/index.css.
 */
export const textVariants = cva("max-w-full break-words", {
  variants: {
    variant: {
      heading:
        "font-heading font-semibold tracking-tight text-heading",
      body: "font-sans text-foreground",
      muted: "font-sans text-muted-foreground",
      link:
        "font-sans font-medium text-link underline-offset-4 transition-colors hover:text-accent",
      button:
        "font-sans font-semibold uppercase tracking-[0.02em] text-primary-foreground",
      nav: "font-sans font-medium text-link transition-colors hover:text-accent",
      eyebrow:
        "font-sans text-accent font-semibold uppercase tracking-[0.18em] sm:tracking-[0.28em]",
      label:
        "font-sans font-semibold uppercase tracking-[0.16em] text-muted-foreground sm:tracking-[0.2em]",
      quote: "font-heading italic text-foreground",
    },
    size: {
      display: "text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem]",
      page: "text-3xl md:text-4xl lg:text-5xl",
      section: "text-2xl md:text-3xl lg:text-4xl",
      card: "text-base md:text-lg lg:text-xl",
      xs: "text-[0.65rem] sm:text-xs",
      sm: "text-xs sm:text-sm",
      base: "text-sm sm:text-base",
      lg: "text-base sm:text-lg",
      xl: "text-lg sm:text-xl",
      "2xl": "text-xl sm:text-2xl",
      "3xl": "text-2xl sm:text-3xl",
      "4xl": "text-3xl sm:text-4xl",
      "5xl": "text-4xl sm:text-5xl",
      "6xl": "text-5xl sm:text-6xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    truncate: {
      true: "truncate",
    },
    leading: {
      none: "leading-none",
      tight: "leading-tight",
      snug: "leading-snug",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
      loose: "leading-loose",
    },
  },
  defaultVariants: {
    variant: "body",
    size: "base",
    weight: "normal",
    leading: "normal",
  },
});
