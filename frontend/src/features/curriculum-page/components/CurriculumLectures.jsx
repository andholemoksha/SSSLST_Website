import { useRef, useState } from "react";

import { Section } from "@/components/layout/Section";
import { Text } from "@/components/ui/Text/text";
import { useCurriculumPageContent } from "@/features/curriculum-page/hooks/useCurriculumPageContent";

export function CurriculumLectures() {
  const { lectures } = useCurriculumPageContent();
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);

  const themes = lectures.themes;
  const active = themes[selected];

  const onKeyDown = (event) => {
    let next = null;
    if (event.key === "ArrowRight") next = (selected + 1) % themes.length;
    if (event.key === "ArrowLeft") next = (selected - 1 + themes.length) % themes.length;
    if (next === null) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section id="lectures" className="scroll-mt-24 pb-0 pt-8 sm:pt-10 xl:pt-12">
      <section className="rounded-[2rem] border border-border bg-background p-6 shadow-md sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
        <div className="max-w-3xl">
          <Text variant="eyebrow" size="xs">
            {lectures.eyebrow}
          </Text>
          <Text as="h2" variant="heading" size="section" className="mt-2">
            {lectures.title}
          </Text>
          <Text variant="muted" className="mt-3">
            {lectures.description}
          </Text>
        </div>

        <div
          role="tablist"
          aria-label="Lecture themes"
          className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4"
          onKeyDown={onKeyDown}
        >
          {themes.map((theme, index) => {
            const isActive = index === selected;
            return (
              <button
                key={theme.key}
                ref={(node) => (tabRefs.current[index] = node)}
                type="button"
                role="tab"
                id={`lecture-tab-${index}`}
                aria-selected={isActive}
                aria-controls="lecture-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setSelected(index)}
                className={`rounded-lg border border-b-4 px-3 py-3 text-center font-heading text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  isActive
                    ? "border-primary border-b-accent bg-secondary text-primary"
                    : "border-border bg-surface text-foreground hover:bg-muted"
                }`}
              >
                {theme.key}
              </button>
            );
          })}
        </div>

        <div
          id="lecture-panel"
          role="tabpanel"
          aria-labelledby={`lecture-tab-${selected}`}
          aria-live="polite"
          className="mt-4 rounded-lg border border-border bg-surface p-6 sm:p-8"
        >
          <Text as="h3" variant="heading" size="xl" color="text-primary">
            {active.title}
          </Text>
          <Text variant="muted" className="mt-2">
            {active.theme}
          </Text>

          <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {active.topics.map((topic) => (
              <li key={topic.title} className="border-l-2 border-accent pl-4">
                <Text as="h4" variant="heading" size="base" weight="semibold">
                  {topic.title}
                </Text>
                <Text variant="muted" size="sm" leading="relaxed" className="mt-1">
                  {topic.description}
                </Text>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-border pt-5">
            <Text variant="quote" size="lg" color="text-primary">
              {active.insight}
            </Text>
          </div>
        </div>
      </section>
    </Section>
  );
}
