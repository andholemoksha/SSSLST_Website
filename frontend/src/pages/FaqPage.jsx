import { PageHeader } from "@/components/layout/PageHeader";
import { FaqList } from "@/features/faq/components/FaqList";

export function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Everything you need to know before applying to the programme."
      />
      <FaqList />
    </>
  );
}
