import { useEffect, useState } from "react";
import { Section } from "@/components/layout/Section";
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

  return (
    <Section>
      <div ref={ref}>
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-primary">
            Programme by the Numbers
          </h2>

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

                <h3 className="text-5xl font-bold text-primary">
                  {counts[index].toLocaleString()}
                  {item.value.includes("+") && "+"}
                </h3>

                <p className="mt-3 text-center text-muted-foreground">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}