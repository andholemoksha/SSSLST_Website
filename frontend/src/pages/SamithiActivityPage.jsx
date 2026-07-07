import { useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { samithiContent } from "@/content/samithiConnect";

/** Turn a slug into a title, e.g. "nagar-sankeertan" -> "Nagar Sankeertan". */
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * A Samithi Connect activity — placeholder for now, reusing the shared
 * PagePlaceholder layout. Real content (Component -> Hook -> Service -> API) later.
 */
export function SamithiActivityPage() {
  const { sectionSlug, activitySlug } = useParams();
  const activityName = slugToTitle(activitySlug);
  const { activityPage } = samithiContent;

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
