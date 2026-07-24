import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";

export function PageHeader({ title, description }) {
  return (
    <div className="border-b border-border bg-muted/40 py-10">
      <Container>
        <Text as="h1" variant="heading" size="page">{title}</Text>
        {description ? (
          <Text variant="muted" size="base" className="mt-2 max-w-2xl md:text-lg">
            {description}
          </Text>
        ) : null}
      </Container>
    </div>
  );
}
