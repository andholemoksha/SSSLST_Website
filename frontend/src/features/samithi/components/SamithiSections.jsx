import { Loader } from "@/components/ui/loader";
import { useSamithiSections } from "@/features/samithi/hooks/useSamithiSections";
import { WingColumn } from "@/features/samithi/components/WingColumn";
import { ReflectionsRow } from "@/features/samithi/components/ReflectionsRow";
import { SamithiPhotos } from "@/features/samithi/components/SamithiPhotos";
import { samithiContent } from "@/content/samithiConnect";
import { Text } from "@/components/ui/Text/text";

const WING_SLUGS = ["spiritual", "education", "service"];

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

  const wings = WING_SLUGS.map((slug) =>
    sections.find((section) => section.slug === slug),
  ).filter(Boolean);
  const reflections = sections.find((section) => section.slug === "reflections");

  return (
    <div className="space-y-12">
      {/* Spiritual / Education / Service — side by side on large screens,
          stacked on tablet and below. */}
      <div className="grid gap-8 lg:grid-cols-3 lg:gap-6 xl:gap-8">
        {wings.map((section) => (
          <WingColumn key={section.slug} section={section} />
        ))}
      </div>

      {reflections ? <ReflectionsRow section={reflections} /> : null}

      <SamithiPhotos />
    </div>
  );
}
