import { Loader } from "@/components/ui/loader";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { ProjectCard } from "@/features/projects/components/ProjectCard";
import { Text } from "@/components/ui/Text/text";

export function ProjectsGrid() {
  const { data: projects, isLoading, isError } = useProjects();

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <Text className="py-12 text-center">
        Projects aren't available yet. Check back soon.
      </Text>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
