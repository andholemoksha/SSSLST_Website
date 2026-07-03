import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";

/**
 * PagePlaceholder
 *
 * Minimal header + "coming soon" body for routes that exist for
 * navigation purposes but don't have real content yet.
 */
export function PagePlaceholder({ title, description }) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Section>
        <p className="text-muted-foreground">Content coming soon.</p>
      </Section>
    </>
  );
}
