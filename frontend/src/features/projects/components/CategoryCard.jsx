import { TileCard } from "@/components/ui/tile-card";
import { projectsContent } from "@/content/projects";

/**
 * One project category tile. Thin wrapper over the shared TileCard.
 */
export function CategoryCard({ category }) {
  const { slug, title, description, image, count } = category;

  return (
    <TileCard
      to={`/projects/${slug}`}
      title={title}
      description={description}
      image={image}
      meta={`${count} ${projectsContent.countNoun}`}
      className="w-full sm:w-60"
    />
  );
}
