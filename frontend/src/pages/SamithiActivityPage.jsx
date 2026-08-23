import { useState } from "react";
import { useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { TextReflectionsPanel } from "@/components/ui/text-reflections-panel";
import { samithiContent } from "@/content/samithiConnect";
import { useSamithiConnectText, useSamithiConnectTextYears } from "@/features/samithi/hooks/useSamithiConnectText";

/** Turn a slug into a title, e.g. "nagar-sankeertan" -> "Nagar Sankeertan". */
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function SamithiTextReflections() {
  const [selectedYear, setSelectedYear] = useState("");
  const { years, isLoading: isYearsLoading, isError: isYearsError } = useSamithiConnectTextYears();
  const year = selectedYear || years[0] || "";
  const { reflections, isLoading, isError } = useSamithiConnectText(year);

  return (
    <div className="rounded-4xl border border-border bg-background p-8 shadow-md sm:p-12">
      <TextReflectionsPanel
        eyebrow="Samithi Connect"
        title="Text Reflections"
        headingAs="h2"
        selectId="samithi-reflection-year"
        years={years}
        selectedYear={year}
        onYearChange={setSelectedYear}
        isYearsLoading={isYearsLoading}
        isYearsError={isYearsError}
        reflections={reflections}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
}

/**
 * A Samithi Connect activity — placeholder for now, reusing the shared
 * PagePlaceholder layout. Real content (Component -> Hook -> Service -> API) later.
 */
export function SamithiActivityPage() {
  const { sectionSlug, activitySlug } = useParams();
  const activityName = slugToTitle(activitySlug);
  const { activityPage } = samithiContent;

  if (sectionSlug === "reflections" && activitySlug === "text") {
    return (
      <PagePlaceholder
        title={activityName}
        description={activityPage.description(slugToTitle(sectionSlug))}
        backTo="/programme/samithi-connect"
        backLabel={activityPage.backLabel}
      >
        <SamithiTextReflections />
      </PagePlaceholder>
    );
  }

  return (
    <PagePlaceholder
      title={activityName}
      description={activityPage.description(slugToTitle(sectionSlug))}
      backTo="/programme/samithi-connect"
      backLabel={activityPage.backLabel}
      message={activityPage.comingSoon(activityName)}
    />
  );
}
