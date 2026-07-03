import { Section } from "@/components/layout/Section";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useFaqContent } from "@/features/faq/hooks/useFaqContent";

export function FaqList() {
  const faqItems = useFaqContent();

  return (
    <Section>
      <Accordion>
        {faqItems.map((item) => (
          <AccordionItem key={item.question} value={item.question}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}
