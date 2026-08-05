import { useEffect, useState } from "react";
import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";
import { useInView } from "react-intersection-observer";

import {
  GraduationCap,
  MapPin,
  BookOpen,
  Users,
} from "lucide-react";

import {
  colors,
  textGradients,
  backgroundGradients,
} from "@/components/ui/palette";

const iconMap = {
  graduation: GraduationCap,
  location: MapPin,
  book: BookOpen,
  users: Users,
};

export function ProgrammeNumbersSection() {
  const { programmeNumbers } = useHomeContent();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const [counts, setCounts] = useState(programmeNumbers.map(() => 0));

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const interval = 25;
    const steps = duration / interval;

    programmeNumbers.forEach((item, index) => {
      const target = parseInt(item.value.replace(/\D/g, ""), 10);

      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.round(current);
          return updated;
        });
      }, interval);
    });
  }, [inView, programmeNumbers]);

  const statColors = [
    colors.primary[0],
    colors.secondary[0],
    colors.primary[2],
    colors.secondary[1],
  ];

  return (
  <Section className="relative overflow-hidden">
    {/* Full-width background */}
    <div
      className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2"
      style={{
        background: `linear-gradient(
          135deg,
          ${backgroundGradients.lavenderMist[0]} 0%,
          ${backgroundGradients.lavenderMist[1]} 50%,
          ${backgroundGradients.lavenderMist[2]} 100%
        )`,
      }}
    />

    <div ref={ref} className="relative z-10">
      {/* Heading */}
      <div className="mb-16 text-center">
        <Text
          as="h2"
          variant="heading"
          size="4xl"
          weight="bold"
          color="text-primary"
        >
          Programme by the Numbers
        </Text>

        <div
          className="mx-auto mt-5 h-1.5 w-24 rounded-full"
          style={{
            background: `linear-gradient(
              90deg,
              ${textGradients.purpleToPink[0]},
              ${textGradients.purpleToPink[1]},
              ${textGradients.purpleToPink[2]}
            )`,
          }}
        />
      </div>

      {/* White Card */}
      <div
        className="overflow-hidden rounded-[32px] bg-white shadow-xl"
        style={{
          border: `1px solid ${colors.neutral[4]}`,
        }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4">
          {programmeNumbers.map((item, index) => {
            const Icon = iconMap[item.icon];
            const currentColor = statColors[index];

            return (
              <div
                key={item.label}
                className={`flex flex-col items-center px-6 py-12 transition-all duration-300 hover:-translate-y-1 ${
                  index !== programmeNumbers.length - 1
                    ? "border-b md:border-b-0 md:border-r"
                    : ""
                }`}
                style={{
                  borderColor: colors.neutral[4],
                }}
              >
                <div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full shadow-sm"
                  style={{
                    background: `linear-gradient(
                      135deg,
                      ${backgroundGradients.lavenderMist[0]},
                      ${backgroundGradients.lavenderMist[1]},
                      ${backgroundGradients.lavenderMist[2]}
                    )`,
                    border: `1px solid ${colors.neutral[4]}`,
                  }}
                >
                  <Icon
                    className="h-9 w-9"
                    style={{ color: currentColor }}
                  />
                </div>

                <Text
                  as="h3"
                  variant="heading"
                  size="5xl"
                  weight="bold"
                  style={{ color: currentColor }}
                >
                  {counts[index].toLocaleString()}
                  {item.value.includes("+") && "+"}
                </Text>

                <Text
                  variant="muted"
                  className="mt-4 text-center text-base"
                >
                  {item.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </Section>
);
}