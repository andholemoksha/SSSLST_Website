import { Section } from "@/components/layout/Section";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";

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

  return (
    <Section>
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
              className={`flex flex-col items-center px-6 py-8
              ${
                index !== programmeNumbers.length - 1
                  ? "md:border-r border-border"
                  : ""
              }`}
            >
              <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-border">
                <Icon className="h-9 w-9 text-primary" />
              </div>

              <h3 className="text-5xl font-bold text-primary">
                {item.value}
              </h3>

              <p className="mt-3 text-center text-foreground">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}