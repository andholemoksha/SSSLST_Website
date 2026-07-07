import { Loader } from "@/components/ui/loader";
import { CardGrid } from "@/components/ui/card-grid";
import { useProjectCategories } from "@/features/projects/hooks/useProjectCategories";
import { CategoryCard } from "@/features/projects/components/CategoryCard";
import { projectsContent } from "@/content/projects";

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
      <p className="py-12 text-center text-muted-foreground">
        {projectsContent.emptyMessage}
      </p>
    );
  }

  return (
    <CardGrid>
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </CardGrid>
  );
}
