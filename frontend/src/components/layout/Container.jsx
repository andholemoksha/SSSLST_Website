import { cn } from "@/lib/utils";

/**
 * Container
 *
 * The single horizontal-padding + max-width wrapper for the site.
 * Every page/section must use this instead of ad-hoc `max-w-*`/`px-*`
 * classes, so the content column stays consistent everywhere.
 *
 * Rules (see DESIGN_SYSTEM.md "Container"):
 * - Mobile:  100% width, 16px padding   (px-4)
 * - Tablet:  24px padding               (sm:px-6)
 * - Desktop: max-width 1280px, 32px padding (max-w-7xl = 1280px, xl:px-8)
 */
export function Container({ className, ...props }) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 xl:px-8", className)}
      {...props}
    />
  );
}
