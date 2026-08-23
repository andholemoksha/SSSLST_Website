import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { DhyanaVahiniVideos } from "@/features/dhyana-vahini/components/DhyanaVahiniVideos";

export function DhyanaVahiniVideoReflectionsPage() {
  return (
    <Section className="bg-background py-6 sm:py-10 lg:py-14 xl:py-18">
      <Link
        to="/programme/dhyana-vahini"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-link transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dhyana Vahini
      </Link>
      <DhyanaVahiniVideos />
    </Section>
  );
}
