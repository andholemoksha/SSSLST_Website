import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { ProjectsGrid } from "@/features/projects/components/ProjectsGrid";

export function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Projects"
        description="Work from our alumni, applying leadership principles in the real world."
      />
      <Section>
        <ProjectsGrid />
      </Section>
    </>
  );
}
