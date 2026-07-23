import { Section } from "@/components/layout/Section";
import { TileCard } from "@/components/ui/tile-card";
import { useContactContent } from "@/features/contact/hooks/useContactContent";
import { Text } from "@/components/ui/Text/text";

export function ContactDetails() {
  const contact = useContactContent();

  return (
    <Section>
      <Text className="max-w-xl">{contact.description}</Text>
      <TileCard
        title="Get in touch"
        description={
          <div className="space-y-2">
            <Text size="sm">Email: {contact.email}</Text>
            <Text size="sm">Phone: {contact.phone}</Text>
            <Text size="sm">Address: {contact.address}</Text>
          </div>
        }
        showFooter={false}
        className="mt-6 max-w-sm"
      />
    </Section>
  );
}
