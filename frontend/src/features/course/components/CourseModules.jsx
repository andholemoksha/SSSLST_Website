import { Section } from "@/components/layout/Section";
import { TileCard } from "@/components/ui/tile-card";
import { useCourseContent } from "@/features/course/hooks/useCourseContent";

export function CourseModules() {
  const { modules } = useCourseContent();

  return (
    <Section containerClassName="grid gap-6 sm:grid-cols-2">
      {modules.map((module) => (
        <TileCard
          key={module.title}
          title={module.title}
          description={module.description}
          initials={module.title.slice(0, 2).toUpperCase()}
          showFooter={false}
        />
      ))}
    </Section>
  );
}
