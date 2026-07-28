import { HeroSection } from "@/components/ui/hero-section";
import { Button } from "@/components/ui/Button/button";
import { CourseDetails } from "@/features/curriculum/components/CourseDetails";
import { SelectionInformationBanner } from "@/features/curriculum/components/SelectionInformationBanner";
import { CurriculumJourney } from "@/features/curriculum/components/CurriculumJourney";
import { CurriculumGains } from "@/features/curriculum/components/CurriculumGains";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

export function CurriculumPage() {
  const { hero } = useCurriculumContent();

  return (
    <>
      <HeroSection
        {...hero}
        actions={(
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {hero.actions.map((action) => (
              <Button key={action.label} to={action.to} href={action.href} variant={action.variant} size="lg">
                {action.label}
              </Button>
            ))}
          </div>
        )}
      />
      <CourseDetails />
      <SelectionInformationBanner />
      <CurriculumJourney />
      <CurriculumGains />
    </>
  );
}
