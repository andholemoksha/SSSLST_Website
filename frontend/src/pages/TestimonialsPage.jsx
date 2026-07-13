import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { TestimonialFilters } from "@/features/testimonials/components/TestimonialFilters";
import { TestimonialResults } from "@/features/testimonials/components/TestimonialResults";
import { testimonialsContent } from "@/content/testimonials";

export function TestimonialsPage() {
  const [filters, setFilters] = useState({
    search: "",
    states: [],
    years: [],
    genders: [],
  });
  const t = testimonialsContent;

  return (
    <>
      <PageHeader title={t.page.title} description={t.page.description} />
      <Section>
        <div className="flex flex-col gap-8 lg:flex-row">
          <TestimonialFilters filters={filters} setFilters={setFilters} />
          <TestimonialResults filters={filters} />
        </div>
      </Section>
    </>
  );
}
