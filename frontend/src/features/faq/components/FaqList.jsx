import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useFaqContent } from "@/features/faq/hooks/useFaqContent";

/**
 * Renders a single answer, which may be:
 *  - a string (one paragraph)
 *  - an array of strings (multiple paragraphs)
 *  - an object { intro?, list: [] } for a lead-in line + bullet list
 */
function FaqAnswer({ answer }) {
  if (Array.isArray(answer)) {
    return (
      <div className="space-y-3">
        {answer.map((paragraph) => (
          <Text key={paragraph} variant="body" size="base" className="text-foreground/80">
            {paragraph}
          </Text>
        ))}
      </div>
    );
  }

  if (answer && typeof answer === "object") {
    return (
      <div className="space-y-3">
        {answer.intro ? (
          <Text variant="body" size="base" className="text-foreground/80">
            {answer.intro}
          </Text>
        ) : null}
        <ul className="list-disc space-y-2 pl-5 marker:text-accent">
          {answer.list.map((point) => (
            <li key={point}>
              <Text as="span" variant="body" size="base" className="text-foreground/80">
                {point}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Text variant="body" size="base" className="text-foreground/80">
      {answer}
    </Text>
  );
}

export function FaqList() {
  const { sections } = useFaqContent();

  return (
    <Section className="pt-6 sm:pt-8 xl:pt-10">
      <div className="mx-auto max-w-3xl space-y-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-[2rem] border border-border bg-surface p-6 shadow-md sm:p-8"
          >
            <Text
              as="h2"
              variant="heading"
              size="section"
              leading="tight"
              className="text-highlight-pink"
            >
              {section.title}
            </Text>

            <Accordion className="mt-4 divide-border/70">
              {section.items.map((item) => (
                <AccordionItem key={item.question} value={item.question}>
                  <AccordionTrigger className="py-4 text-base font-semibold text-foreground sm:text-lg">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 pr-8">
                    <FaqAnswer answer={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </Section>
  );
}
