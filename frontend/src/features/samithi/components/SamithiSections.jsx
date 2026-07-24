import { Loader } from "@/components/ui/loader";
import { useSamithiSections } from "@/features/samithi/hooks/useSamithiSections";
import { SectionRow } from "@/features/samithi/components/SectionRow";
import { samithiContent } from "@/content/samithiConnect";
import { Text } from "@/components/ui/Text/text";

export function SamithiSections() {
  const { data: sections, isLoading, isError } = useSamithiSections();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <Text variant="muted" className="py-12 text-center">
        {samithiContent.emptyMessage}
      </Text>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <SectionRow key={section.slug} section={section} />
      ))}
    </div>
  );
}
