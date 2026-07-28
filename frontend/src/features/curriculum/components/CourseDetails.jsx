import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { CurriculumIcon } from "@/features/curriculum/components/CurriculumIcon";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

export function CourseDetails() {
  const { courseDetails } = useCurriculumContent();

  return (
    <Section id="course-details">
      <div className="mx-auto max-w-4xl text-center">
        <Text variant="eyebrow" size="xs">{courseDetails.eyebrow}</Text>
        <Text as="h2" variant="heading" size="section" className="mt-2">{courseDetails.title}</Text>
        <Text variant="muted" className="mt-3">{courseDetails.description}</Text>
      </div>
      <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {courseDetails.items.map((item) => (
          <Card key={item.title} className="h-full">
            <CardHeader className="items-center px-4 pt-5 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary"><CurriculumIcon name={item.icon} className="h-6 w-6" /></div>
              <CardTitle className="pt-2 text-center">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-5 text-center">
              <ul className="space-y-2">{item.details.map((detail) => <li key={detail}><Text variant="muted" size="sm">{detail}</Text></li>)}</ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}
