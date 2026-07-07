import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { SamithiSections } from "@/features/samithi/components/SamithiSections";

export function SamithiConnectPage() {
  return (
    <>
      <PageHeader
        title="Samithi Connect Programme"
        description="Spiritual, educational and service activities — connect and take part."
      />
      <Section>
        <SamithiSections />
      </Section>
    </>
  );
}
