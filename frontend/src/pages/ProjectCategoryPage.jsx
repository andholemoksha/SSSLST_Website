import { useParams } from "react-router-dom";
import { PagePlaceholder } from "@/components/layout/PagePlaceholder";
import { projectsContent } from "@/content/projects";

/** Turn a slug into a title, e.g. "medical-healthcare" -> "Medical Healthcare". */
function slugToTitle(slug) {
  return slug
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * A category's project list — placeholder for now, reusing the shared
 * PagePlaceholder layout. Real list (Component -> Hook -> Service -> API) later.
 */
export function ProjectCategoryPage() {
  const { categorySlug } = useParams();
  const title = slugToTitle(categorySlug);

  return (
    <PagePlaceholder
      title={title}
      backTo="/projects"
      backLabel={projectsContent.categoryPage.backLabel}
      message={projectsContent.categoryPage.comingSoon(title)}
    />
  );
}
