import { Section } from "@/components/layout/Section";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCourseContent } from "@/features/course/hooks/useCourseContent";

export function CourseModules() {
  const { modules } = useCourseContent();

  return (
    <Section containerClassName="grid gap-6 sm:grid-cols-2">
      {modules.map((module) => (
        <Card key={module.title}>
          <CardHeader>
            <CardTitle>{module.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-foreground">{module.description}</CardContent>
        </Card>
      ))}
    </Section>
  );
}
