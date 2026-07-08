import { useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { testimonialsContent } from "@/content/testimonials";

/** Turn a slug into a title, e.g. "andhra-pradesh" -> "Andhra Pradesh". */
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * A state's participant testimonials — placeholder for now, reusing the shared
 * PagePlaceholder layout. Real cards (Component -> Hook -> Service -> API) later.
 */
export function StateTestimonialsPage() {
  const { year, stateSlug } = useParams();
  const stateName = slugToTitle(stateSlug);
  const { statePage, backLabel } = testimonialsContent;

  return (
    <PagePlaceholder
      title={stateName}
      description={statePage.description(year)}
      backTo="/testimonials"
      backLabel={backLabel}
      message={statePage.comingSoon(stateName, year)}
    />
  );
}
