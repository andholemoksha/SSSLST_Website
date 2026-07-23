import { TileCard } from "@/components/ui/tile-card";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }) {
  return (
    <TileCard
      to={project.slug ? `/projects/${project.slug}` : undefined}
      title={project.title}
      description={project.description}
      initials={project.title.slice(0, 2).toUpperCase()}
      meta={project.tag ? <Badge>{project.tag}</Badge> : undefined}
      cta="Read more"
      className="w-full"
    />
  );
}
