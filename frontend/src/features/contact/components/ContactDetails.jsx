import { Section } from "@/components/layout/Section";
import { TileCard } from "@/components/ui/tile-card";
import { useContactContent } from "@/features/contact/hooks/useContactContent";

export function ContactDetails() {
  const contact = useContactContent();

  return (
    <Section>
      <p className="max-w-xl text-text">{contact.description}</p>
      <TileCard
        title="Get in touch"
        description={
          <div className="space-y-2 text-sm text-text">
            <p>Email: {contact.email}</p>
            <p>Phone: {contact.phone}</p>
            <p>Address: {contact.address}</p>
          </div>
        }
        showFooter={false}
        className="mt-6 max-w-sm"
      />
    </Section>
  );
}
