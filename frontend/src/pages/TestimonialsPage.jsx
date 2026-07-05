import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { TestimonialYears } from "@/features/testimonials/components/TestimonialYears";
import { testimonialsContent } from "@/content/testimonials";

export function TestimonialsPage() {
  return (
    <>
      <PageHeader
        title={testimonialsContent.page.title}
        description={testimonialsContent.page.description}
      />
      <Section>
        <TestimonialYears />
      </Section>
    </>
  );
}
