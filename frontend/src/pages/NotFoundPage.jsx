import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button/button";

export function NotFoundPage() {
  return (
    <Section className="text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="mt-2">The page you're looking for doesn't exist.</p>
      <Button to="/">
        Back to home
      </Button>
    </Section>
  );
}
