import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/layout/Section";
import { SathvamVideoGrid } from "@/features/sathvam/components/SathvamVideoGrid";
import { useSathvamVideos } from "@/features/sathvam/hooks/useSathvamVideos";

export function SatsangYearPage() {
  const { year } = useParams();
  const yearNum = Number(year);
  const { videos, isLoading, isError } = useSathvamVideos(yearNum);

  return (
    <>
      <Section className="pt-6 sm:pt-8 xl:pt-10">
        <Link
          to="/satsang"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-link transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Satsang
        </Link>
      </Section>

      <Section className="pt-0 sm:pt-0 xl:pt-0">
        <SathvamVideoGrid
          videos={videos}
          isLoading={isLoading}
          isError={isError}
        />
      </Section>
    </>
  );
}
