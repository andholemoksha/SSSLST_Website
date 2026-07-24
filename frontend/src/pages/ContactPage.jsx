import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { ContactDetails } from "@/features/contact/components/ContactDetails";
import { useContactContent } from "@/features/contact/hooks/useContactContent";

export function ContactPage() {
  const { heading } = useContactContent();

  return (
    <>
      <PageHeader title={heading} />
      <Section className="pt-0">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface p-5">
            <Text variant="eyebrow" size="xs" className="mb-3">
              Eyebrow / label
            </Text>
            <Text as="h3" variant="heading" size="card" className="mb-2">
              Heading variant
            </Text>
            <Text variant="body" size="sm" color="text-muted-foreground">
              Editorial heading style with refined tracking and calm contrast.
            </Text>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <Text variant="muted" size="sm" className="mb-3">
              Body / muted text
            </Text>
            <Text as="p" variant="body" size="base" leading="relaxed" className="mb-2">
              Normal body copy uses the primary reading rhythm and stays spacious for mobile and tablet screens.
            </Text>
            <Text variant="muted" size="sm">
              Secondary supporting content uses the muted foreground token.
            </Text>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-5">
            <Text variant="link" size="sm" as="a" href="/courses" className="inline-flex">
              Link text preview
            </Text>
            <Text variant="nav" size="sm" className="mt-4 inline-flex">
              Navbar text style
            </Text>
            <Text variant="button" size="sm" color="text-primary" className="mt-4 block">
              Button label text
            </Text>
          </div>

          <div className="rounded-2xl border border-border bg-primary p-5 text-white md:col-span-2 xl:col-span-1">
            <Text variant="eyebrow" size="xs" color="text-white/80" className="mb-3">
              Inverse context
            </Text>
            <Text as="h3" variant="heading" size="card" color="text-white" className="mb-2">
              Dark surface text
            </Text>
            <Text variant="body" size="sm" color="text-white/85" leading="relaxed">
              This example shows the same typography system working on a darker hero-style surface.
            </Text>
          </div>
        </div>
      </Section>
      <ContactDetails />
    </>
  );
}
