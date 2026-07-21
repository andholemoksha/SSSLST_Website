import { Section } from "@/components/layout/Section";
import { Card, CardContent } from "@/components/ui/card";
import { useContactContent } from "@/features/contact/hooks/useContactContent";

export function ContactDetails() {
  const contact = useContactContent();

  return (
    <Section>
      <p className="max-w-xl text-foreground">{contact.description}</p>
      <Card className="mt-6 max-w-sm">
        <CardContent className="space-y-2 pt-6 text-sm text-foreground">
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <p>Address: {contact.address}</p>
        </CardContent>
      </Card>
    </Section>
  );
}
