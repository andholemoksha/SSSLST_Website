import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { colors } from "@/components/ui/palette";

export function HighlightsSection() {
  return (
    <Section className="bg-soft-beige">
      <div className="mx-auto max-w-3xl text-center">
        <Text
          as="h2"
          variant="heading"
          size="4xl"
          weight="bold"
          style={{
            color: colors.secondary[1],
          }}
        >
          What makes this course unique?
        </Text>

        <Text size="lg" leading="relaxed" className="mt-6">
          Through{" "}
          <span className="font-bold">
            impactful sessions, Satsangs and live projects
          </span>{" "}
          that enable Experiential Leadership,{" "}
          <em className="font-bold">
            the physical and mental prowess of the youth is strengthened
          </em>{" "}
          – which is the foundation on which a Nation is built.
        </Text>
      </div>
    </Section>
  );
}