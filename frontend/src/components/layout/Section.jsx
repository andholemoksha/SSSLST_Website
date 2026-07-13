import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

/**
 * Section
 *
 * Wraps a page section with the standard vertical rhythm and a
 * `Container` for horizontal padding. Every major page section should
 * use this instead of a bare `<section>` so spacing stays consistent.
 *
 * Rules (see DESIGN_SYSTEM.md "Section Component"):
 * - Mobile:  py-12
 * - Tablet:  py-16 (sm)
 * - Desktop: py-24 (xl)
 *
 * @param {string} [containerClassName] - extra classes for the inner Container
 * @param {string} [className] - extra classes for the outer <section>
 */
export function Section({ className, containerClassName, id, ...props }) {
  return (
    <section id={id} className={cn("py-12 sm:py-16 xl:py-24", className)}>
      <Container className={containerClassName} {...props} />
    </section>
  );
}
