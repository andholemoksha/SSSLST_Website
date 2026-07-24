import { Loader } from "@/components/ui/loader";
import { useProjectCategories } from "@/features/projects/hooks/useProjectCategories";
import { CategoryCard } from "@/features/projects/components/CategoryCard";
import { projectsContent } from "@/content/projects";
import { Text } from "@/components/ui/Text/text";

export function CategoryGrid() {
  const { data: categories, isLoading, isError } = useProjectCategories();

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
        {projectsContent.emptyMessage}
      </Text>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  );
}
