import { Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

export function SelectionInformationBanner() {
  const { selection } = useCurriculumContent();

  return (
    <section className="pb-12 sm:pb-16 xl:pb-24">
      <Container>
        <div className="flex items-start gap-3 rounded-xl border border-primary/15 bg-secondary px-4 py-4 sm:items-center sm:px-6">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary sm:mt-0" aria-hidden="true" />
          <div><Text as="h2" variant="heading" size="sm">{selection.title}</Text><Text size="sm" className="mt-1">{selection.message}</Text></div>
        </div>
      </Container>
    </section>
  );
}
