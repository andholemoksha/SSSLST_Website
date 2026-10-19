import { Section } from "@/components/layout/Section";
import { AdministrationHero } from "@/features/administration/components/AdministrationHero";
import { AdministrationMembers } from "@/features/administration/components/AdministrationMembers";

export function AdministrationPage() {
  return (
    <>
      <AdministrationHero />
      <Section
        className="bg-background py-6 sm:py-10 lg:py-14 xl:py-18"
        containerClassName="max-w-[1700px] px-3 sm:px-5 lg:px-7 xl:px-8 2xl:px-10"
      >
        <AdministrationMembers />
      </Section>
    </>
  );
}
