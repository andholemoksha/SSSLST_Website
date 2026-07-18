import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button/button-variants";

export function NotFoundPage() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className={cn(buttonVariants(), "mt-6")}>
        Back to home
      </Link>
    </Section>
  );
}
