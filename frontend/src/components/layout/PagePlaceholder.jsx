import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Text/text";

/**
 * PagePlaceholder
 *
 * Shared layout for routes that exist for navigation but don't have real
 * content yet: header + optional back-link + a "coming soon" body.
 *
 * Props:
 * - title, description   page header text
 * - backTo, backLabel    optional back-link (e.g. to a hub page)
 * - message              body text (defaults to "Content coming soon.")
 * - children             optional custom body (overrides `message`)
 */
export function PagePlaceholder({
  title,
  description,
  backTo,
  backLabel = "Back",
  message = "Content coming soon.",
  children,
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Section>
        {backTo ? (
          <Container className="px-0">
            <Button to={backTo} variant="link" size="sm">
              &larr; {backLabel}
            </Button>
          </Container>
        ) : null}
        {children ?? (
          <Text variant="muted" className="py-16 text-center">{message}</Text>
        )}
      </Section>
    </>
  );
}
