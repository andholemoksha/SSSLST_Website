import { HeroSection } from "@/components/ui/hero-section";
import { CourseDetails } from "@/features/curriculum/components/CourseDetails";
import { SelectionInformationBanner } from "@/features/curriculum/components/SelectionInformationBanner";
import { CurriculumJourney } from "@/features/curriculum/components/CurriculumJourney";
import { CurriculumGains } from "@/features/curriculum/components/CurriculumGains";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

export function CurriculumPage() {
  const { hero } = useCurriculumContent();

  return (
    <>
      <HeroSection {...hero}/>
      <CourseDetails />
      <SelectionInformationBanner />
      <CurriculumJourney />
      <CurriculumGains />
    </>
  );
}
