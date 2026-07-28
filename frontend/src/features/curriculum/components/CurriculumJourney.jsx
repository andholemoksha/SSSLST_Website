import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { CurriculumIcon } from "@/features/curriculum/components/CurriculumIcon";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

const desktopPath = "M72 184 C122 184 174 248 224 248 S326 184 376 184 S478 248 528 248 S630 184 680 184 S782 248 832 248 S934 184 984 184 S1086 248 1136 248";

function JourneyIcon({ step }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-muted bg-primary text-primary-foreground shadow-sm">
      <Text
        as="span"
        size="xs"
        weight="bold"
        color="text-primary-foreground"
        className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent"
      >
        {step.number}
      </Text>
      <CurriculumIcon name={step.icon} className="h-5 w-5" />
    </div>
  );
}

function JourneyCard({ step }) {
  return (
    <Card className="w-36 min-h-28">
      <CardContent className="p-4 text-center">
        <Text as="h3" variant="heading" size="sm" className="whitespace-nowrap">
          {step.title}
        </Text>
        <Text variant="muted" size="sm" className="mt-2">
          {step.description}
        </Text>
      </CardContent>
    </Card>
  );
}

function MobileJourney({ steps, stepLabel }) {
  return (
    <div className="relative mt-10 pl-14 md:hidden">
      <div className="absolute bottom-6 left-6 top-6 w-px bg-primary/25" aria-hidden="true" />
      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="relative min-h-28">
            <div className="absolute left-0 top-1"><JourneyIcon step={step} /></div>
            <div className="min-w-0">
              <Text as="span" variant="eyebrow" size="xs">{stepLabel} {step.number}</Text>
              <div className="mt-2"><JourneyCard step={step} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopJourney({ steps }) {
  return (
    <div className="mt-10 hidden overflow-x-auto pb-4 md:block">
      <div className="relative h-[28rem] min-w-[1208px]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1208 448"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={desktopPath}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.4"
          />
        </svg>

        <div className="relative grid h-full grid-cols-8 gap-2">
          {steps.map((step, index) => {
            const isOddStep = index % 2 === 0;

            return (
              <div key={step.number} className="relative flex justify-center">
                <div className={isOddStep ? "absolute top-0" : "absolute top-72"}>
                  <JourneyCard step={step} />
                </div>
                <div className={isOddStep ? "absolute top-40" : "absolute top-56"}>
                  <JourneyIcon step={step} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CurriculumJourney() {
  const { journey } = useCurriculumContent();

  return (
    <Section id="journey" className="bg-muted/50 pb-28 md:pb-16 xl:pb-24">
      <div className="mx-auto max-w-4xl text-center">
        <Text variant="eyebrow" size="xs">{journey.eyebrow}</Text>
        <Text as="h2" variant="heading" size="section" className="mt-2">{journey.title}</Text>
        <Text variant="muted" className="mt-3">{journey.description}</Text>
      </div>

      <DesktopJourney steps={journey.steps} />
      <MobileJourney steps={journey.steps} stepLabel={journey.stepLabel} />
    </Section>
  );
}
