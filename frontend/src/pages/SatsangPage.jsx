import { Section } from "@/components/layout/Section";
import { SatsangHero } from "@/features/satsang/components/SatsangHero";
import { SatsangYearGrid } from "@/features/satsang/components/SatsangYearGrid";

export function SatsangPage() {
  return (
    <>
      {/* Full-width Hero */}
      <SatsangHero />

      {/* Remaining page content */}
      <Section
        className="bg-background py-6 sm:py-10 lg:py-14 xl:py-18"
        containerClassName="max-w-[1700px] px-3 sm:px-5 lg:px-7 xl:px-8 2xl:px-10"
      >
        <SatsangYearGrid />
      </Section>
    </>
  );
}