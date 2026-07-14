import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { CategoryGrid } from "@/features/projects/components/CategoryGrid";

export function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Explore the live projects our participants have led, across every wing."
      />
      <Section>
        <CategoryGrid />
      </Section>
    </>
  );
}
