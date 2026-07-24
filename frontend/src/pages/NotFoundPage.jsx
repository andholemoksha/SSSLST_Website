import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/Button/button-variants";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text/text";

export function NotFoundPage() {
  return (
    <Section className="text-center">
      <Text as="h1" variant="heading" size="3xl">Page not found</Text>
      <Text className="mt-2">The page you're looking for doesn't exist.</Text>
      <Link to="/" className={cn(buttonVariants(), "mt-6")}>
        Back to home
      </Link>
    </Section>
  );
}
