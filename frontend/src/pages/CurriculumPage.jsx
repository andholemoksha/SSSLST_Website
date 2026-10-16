import { CurriculumIntro } from "@/features/curriculum-page/components/CurriculumIntro";
import { CurriculumParts } from "@/features/curriculum-page/components/CurriculumParts";
import { CurriculumLectures } from "@/features/curriculum-page/components/CurriculumLectures";

export function CurriculumPage() {
  return (
    <>
      <CurriculumIntro />
      <CurriculumParts />
      <CurriculumLectures />
    </>
  );
}
