import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

export function Section({ className, containerClassName, ...props }) {
  return (
    <section className={cn("py-12", className)}>
      <Container className={containerClassName} {...props} />
    </section>
  );
}
