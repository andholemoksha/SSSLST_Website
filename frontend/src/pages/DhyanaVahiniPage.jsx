import { Section } from "@/components/layout/Section";
import { DhyanaVahiniAbout } from "@/features/dhyana-vahini/components/DhyanaVahiniAbout";
import { DhyanaVahiniGallery } from "@/features/dhyana-vahini/components/DhyanaVahiniGallery";
import { DhyanaVahiniHero } from "@/features/dhyana-vahini/components/DhyanaVahiniHero";


export function DhyanaVahiniPage() {
  return (
    <>
      <DhyanaVahiniHero />

      <Section
        className="bg-background py-6 sm:py-10 lg:py-14 xl:py-18"
        containerClassName="max-w-[1700px] px-3 sm:px-5 lg:px-7 xl:px-8 2xl:px-10"
      >
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          <DhyanaVahiniAbout />
          <DhyanaVahiniGallery />
        </div>
      </Section>
    </>
  );
}