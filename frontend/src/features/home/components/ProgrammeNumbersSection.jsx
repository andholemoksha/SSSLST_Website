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
  FolderKanban,
} from "lucide-react";

import { colors } from "@/components/ui/palette";

const iconMap = {
  graduation: GraduationCap,
  location: MapPin,
  book: BookOpen,
  users: Users,
  projects: FolderKanban,
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
      const target =
        Number.parseFloat(String(rawValue).replace(/[^\d.-]/g, "")) || 0;

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
    colors.primary[0], // Projects — same color as the first stat (2400+)
  ];

  return (
    <Section className="relative overflow-hidden bg-soft-beige">
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
              background: "var(--gradient-purple-to-pink)",
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {programmeNumbers.map((item, index) => {
              const Icon = iconMap[item.icon];
              const currentColor = statColors[index];
              // Borders are derived from the item's position in each
              // breakpoint's grid (2 / 3 / 5 columns), so adding or removing a
              // stat needs no change here.
              const total = programmeNumbers.length;
              const isColEnd = (cols) => index % cols === cols - 1;
              const isRowEnd = (cols) =>
                index >= total - ((total % cols) || cols);

              return (
                <div
                  key={item.label}
                  className={[
                    "flex flex-col items-center px-6 py-12 transition-all duration-300 hover:-translate-y-1",
                    isColEnd(2) ? "" : "border-r",
                    isRowEnd(2) ? "" : "border-b",
                    isColEnd(3) ? "sm:border-r-0" : "sm:border-r",
                    isRowEnd(3) ? "sm:border-b-0" : "sm:border-b",
                    isColEnd(5) ? "lg:border-r-0" : "lg:border-r",
                    "lg:border-b-0",
                  ].join(" ")}
                  style={{
                    borderColor: colors.neutral[4],
                  }}
                >
                  <div
                    className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary shadow-sm"
                    style={{
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
                    {item.showPlus && "+"}
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