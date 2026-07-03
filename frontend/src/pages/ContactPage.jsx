import { PageHeader } from "@/components/layout/PageHeader";
import { ContactDetails } from "@/features/contact/components/ContactDetails";
import { useContactContent } from "@/features/contact/hooks/useContactContent";

export function ContactPage() {
  const { heading } = useContactContent();

  return (
    <>
      <PageHeader title={heading} />
      <ContactDetails />
    </>
  );
}
