import { projectCategories } from "@/content/projects";

/**
 * Returns the project categories (the 8 wings).
 *
 * Today: static content from src/content/projects.js.
 * Tomorrow: swap to React Query + a service call (getProjectCategories) once
 * Django exposes category counts. The return shape mirrors React Query so the
 * consuming component never changes. See AGENT.md > Hooks.
 */
export function useProjectCategories() {
  return { data: projectCategories, isLoading: false, isError: false };
}
