import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { Loader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text/text";
import { TestimonialCard } from "@/features/testimonials/components/TestimonialCard";
import { TestimonialVideoModal } from "@/features/testimonials/components/TestimonialVideoModal";
import { useTestimonials } from "@/features/testimonials/hooks/useTestimonials";
import { testimonialsContent } from "@/content/testimonials";

export function TestimonialsPage() {
  const t = testimonialsContent;
  const { data, isLoading, isError } = useTestimonials();
  const [active, setActive] = useState(null); // { embedUrl, title } | null

  return (
    <>
      <PageHeader title={t.page.title} description={t.page.description} />

      <Section>
        {isLoading ? (
          <div className="flex justify-center py-16" aria-label="Loading testimonials">
            <Loader />
          </div>
        ) : isError ? (
          <Text variant="muted" className="py-16 text-center">
            Testimonials could not be loaded. Please try again later.
          </Text>
        ) : data.length === 0 ? (
          <Text variant="muted" className="py-16 text-center">
            Testimonials will be available soon.
          </Text>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((item, index) => (
              <TestimonialCard
                key={item.id}
                number={index + 1}
                coverImage={item.cover_image}
                autoThumbnail={item.auto_thumbnail}
                onPlay={() =>
                  setActive({
                    embedUrl: item.embed_url,
                    title: `Testimonial ${index + 1}`,
                  })
                }
              />
            ))}
          </div>
        )}
      </Section>

      <TestimonialVideoModal
        open={active !== null}
        embedUrl={active?.embedUrl}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </>
  );
}
