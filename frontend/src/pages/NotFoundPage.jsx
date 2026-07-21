import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function NotFoundPage() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl font-semibold text-heading">Page not found</h1>
      <p className="mt-2 text-foreground">The page you're looking for doesn't exist.</p>
      <Link to="/" className={cn(buttonVariants(), "mt-6")}>
        Back to home
      </Link>
    </Section>
  );
}
