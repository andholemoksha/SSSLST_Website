import { Loader } from "@/components/ui/loader";
import { useTestimonialYears } from "@/features/testimonials/hooks/useTestimonialYears";
import { YearRow } from "@/features/testimonials/components/YearRow";
import { testimonialsContent } from "@/content/testimonials";

export function TestimonialYears() {
  const { data: years, isLoading, isError } = useTestimonialYears();

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
        {testimonialsContent.emptyMessage}
      </p>
    );
  }

  return (
    <div className="space-y-10">
      {years.map((entry) => (
        <YearRow key={entry.year} year={entry.year} states={entry.states} />
      ))}
    </div>
  );
}
