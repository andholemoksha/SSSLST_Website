import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/features/projects/services/project.service";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
}
