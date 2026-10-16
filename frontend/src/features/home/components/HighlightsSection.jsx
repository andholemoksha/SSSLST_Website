import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";

export function HighlightsSection() {
  return (
    <Section className="bg-soft-beige">
      <div className="mx-auto max-w-3xl text-center">
        <Text
          as="h2"
          variant="heading"
          size="4xl"
          weight="bold"
          className="text-highlight-pink"
        >
          What makes this course unique?
        </Text>

        <Text size="lg" leading="relaxed" className="mt-6">
          Through{" "}
          <span className="font-bold">
            impactful sessions, satsangs, and live projects
          </span>{" "}
          that enable experiential leadership,{" "}
          <em className="font-bold">
            the physical and mental prowess of the youth is strengthened
          </em>{" "}
          – which is the foundation on which our Nation is built.
        </Text>
      </div>
    </Section>
  );
}