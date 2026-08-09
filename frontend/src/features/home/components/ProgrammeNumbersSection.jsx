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
      const rawValue = item.value ?? 0;
      const target = Number.parseFloat(String(rawValue).replace(/[^\d.-]/g, "")) || 0;

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

  return (
    <Section>
      <div ref={ref}>
        <div className="mb-14 text-center">
          <Text as="h2" variant="heading" size="4xl" weight="bold" color="text-primary">
            Programme by the Numbers
          </Text>

          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-accent" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4">
          {programmeNumbers.map((item, index) => {
            const Icon = iconMap[item.icon];

            return (
              <div
                key={item.label}
                className={`flex flex-col items-center px-6 py-8 ${
                  index !== programmeNumbers.length - 1
                    ? "md:border-r border-border"
                    : ""
                }`}
              >
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border">
                  <Icon className="h-9 w-9 text-primary" />
                </div>

                <Text as="h3" variant="heading" size="5xl" weight="bold" color="text-primary">
                  {counts[index].toLocaleString()}
                  {item.showPlus && "+"}
                </Text>

                <Text variant="muted" className="mt-3 text-center">
                  {item.label}
                </Text>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}