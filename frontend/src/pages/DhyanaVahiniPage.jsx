import { Section } from "@/components/layout/Section";
import { DhyanaVahiniAbout } from "@/features/dhyana-vahini/components/DhyanaVahiniAbout";
import { DhyanaVahiniChapters } from "@/features/dhyana-vahini/components/DhyanaVahiniChapters";
import { DhyanaVahiniGallery } from "@/features/dhyana-vahini/components/DhyanaVahiniGallery";
import { DhyanaVahiniHero } from "@/features/dhyana-vahini/components/DhyanaVahiniHero";
import { DhyanaVahiniJourney } from "@/features/dhyana-vahini/components/DhyanaVahiniJourney";
import { DhyanaVahiniResources } from "@/features/dhyana-vahini/components/DhyanaVahiniResources";
import { DhyanaVahiniTimeline } from "@/features/dhyana-vahini/components/DhyanaVahiniTimeline";
import { DhyanaVahiniWhy } from "@/features/dhyana-vahini/components/DhyanaVahiniWhy";

export function DhyanaVahiniPage() {
  return (
    <>
      <Section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="space-y-6">
          <DhyanaVahiniHero />
          <DhyanaVahiniAbout />
          <DhyanaVahiniWhy />
          <DhyanaVahiniTimeline />
          <DhyanaVahiniChapters />
          <DhyanaVahiniResources />
          <DhyanaVahiniGallery />
          <DhyanaVahiniJourney />
        </div>
      </Section>
    </>
  );
}
