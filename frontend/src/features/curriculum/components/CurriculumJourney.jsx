import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { CurriculumIcon } from "@/features/curriculum/components/CurriculumIcon";
import { useCurriculumContent } from "@/features/curriculum/hooks/useCurriculumContent";

const desktopPath =
  "M72 200 C122 200 174 264 224 264 S326 200 376 200 S478 264 528 264 S630 200 680 200 S782 264 832 264 S934 200 984 200 S1086 264 1136 264 S1240 200 1288 200";

function JourneyIcon({ step }) {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-muted bg-primary text-primary-foreground shadow-sm">
      <Text
        as="span"
        size="sm"
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
    <Card className="h-40 w-36">
      <CardContent className="flex h-full flex-col items-center justify-center p-4 text-center">
        <Text
          as="h3"
          variant="heading"
          size="sm"
          className="whitespace-nowrap"
        >
          {step.title}
        </Text>

        <Text
          variant="muted"
          size="xs"
          leading="tight"
          className="mt-2"
        >
          {step.description}
        </Text>
      </CardContent>
    </Card>
  );
}

function MobileJourney({ steps, stepLabel }) {
  return (
    <div className="relative mt-10 pl-14 min-[1408px]:hidden">
      <div
        className="absolute bottom-6 left-6 top-6 w-px bg-primary/25"
        aria-hidden="true"
      />

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.number} className="relative min-h-28">
            <div className="absolute left-0 top-1">
              <JourneyIcon step={step} />
            </div>

            <div className="min-w-0">
              <Text as="span" variant="eyebrow" size="xs">
                {stepLabel} {step.number}
              </Text>

              <div className="mt-2">
                <JourneyCard step={step} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DesktopJourney({ steps }) {
  return (
    <div className="mt-10 hidden min-[1408px]:block">
      <div className="relative mx-auto h-[30rem] w-full max-w-[1360px]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 1360 480"
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

        <div className="relative grid h-full grid-cols-9 gap-1">
          {steps.map((step, index) => {
            const isOddStep = index % 2 === 0;

            return (
              <div
                key={step.number}
                className="relative flex justify-center"
              >
                <div
                  className={
                    isOddStep
                      ? "absolute top-0"
                      : "absolute top-76"
                  }
                >
                  <JourneyCard step={step} />
                </div>

                <div
                  className={
                    isOddStep
                      ? "absolute top-44"
                      : "absolute top-60"
                  }
                >
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
    <Section
      id="journey"
      className="bg-muted/50 pb-28 md:pb-16 xl:pb-24"
      containerClassName="max-w-none"
    >
      <div className="mx-auto max-w-4xl text-center">
        <Text variant="eyebrow" size="xs">
          {journey.eyebrow}
        </Text>

        <Text
          as="h2"
          variant="heading"
          size="section"
          className="mt-2"
        >
          {journey.title}
        </Text>

        <Text variant="muted" className="mt-3">
          {journey.description}
        </Text>
      </div>

      <DesktopJourney steps={journey.steps} />
      <MobileJourney
        steps={journey.steps}
        stepLabel={journey.stepLabel}
      />
    </Section>
  );
}