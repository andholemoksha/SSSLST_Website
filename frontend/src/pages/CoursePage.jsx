import { PageHeader } from "@/components/layout/PageHeader";
import { CourseModules } from "@/features/course/components/CourseModules";
import { useCourseContent } from "@/features/course/hooks/useCourseContent";

export function CoursePage() {
  const { title, summary } = useCourseContent();

  return (
    <>
      <PageHeader title={title} description={summary} />
      <CourseModules />
    </>
  );
}
