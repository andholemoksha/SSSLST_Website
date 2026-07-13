import { allRegions } from "@/content/indianStates";
import { testimonialsContent } from "@/content/testimonials";
import { useTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { TestimonialCard } from "@/features/testimonials/components/TestimonialCard";
import { Loader } from "@/components/ui/loader";

const stateNameBySlug = Object.fromEntries(allRegions.map((s) => [s.slug, s.name]));

/** Right column: result count + grid of matching testimonial cards. */
export function TestimonialResults({ filters }) {
  const { data, isLoading, isError } = useTestimonials(filters);
  const t = testimonialsContent;

  if (isLoading) {
    return (
      <div className="flex flex-1 justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="flex-1 py-12 text-center text-muted-foreground">
        Testimonials aren't available yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="flex-1">
      <p className="mb-4 text-sm text-muted-foreground">
        {t.resultsCount(data.length)}
      </p>

      {data.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">{t.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((p) => (
            <TestimonialCard
              key={p.id}
              participant={p}
              stateName={stateNameBySlug[p.state] || p.state}
            />
          ))}
        </div>
      )}
    </div>
  );
}
