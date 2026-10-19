import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/Text/text";
import { cn } from "@/lib/utils";
import { useAdministrationContent } from "@/features/administration/hooks/useAdministrationContent";

/**
 * Board of Studies roster — a grouped list of members on the left and a
 * detail panel (photo, name, role, affiliation, bio) on the right.
 *
 * Mirrors the reference design: on desktop the list is a sticky sidebar and
 * the panel fills the rest; on smaller screens the list becomes a horizontal
 * scroller above the panel. Colours/fonts come from the shared design tokens
 * (primary purple, highlight-pink accent, Poppins/Inter) — no hard-coded hex.
 */
function initialsOf(name) {
  return name
    .replace(/^(Prof\.?|Dr\.?|Sri|Smt\.?|\(Dr\.?\))\s+/gi, "")
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Circular member photo with an initials fallback if the image is missing. */
function Avatar({ person, className, textClassName }) {
  const [failed, setFailed] = useState(false);
  if (failed || !person.image) {
    return (
      <span
        className={cn(
          "flex items-center justify-center bg-primary font-heading font-semibold text-white",
          className,
          textClassName
        )}
        aria-label={person.name}
      >
        {initialsOf(person.name)}
      </span>
    );
  }
  return (
    <span className={cn("overflow-hidden", className)}>
      <img
        src={person.image}
        alt={person.name}
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </span>
  );
}

export function AdministrationMembers() {
  const { members } = useAdministrationContent();
  const { eyebrow, title, description, groups, people } = members;

  const [activeIndex, setActiveIndex] = useState(0);
  const active = people[activeIndex];

  // Members bucketed by group, preserving their original index.
  const grouped = useMemo(
    () =>
      groups.map((_, groupIndex) =>
        people
          .map((person, index) => ({ person, index }))
          .filter(({ person }) => person.group === groupIndex)
      ),
    [groups, people]
  );

  return (
    <div>
      {/* Section header */}
      <div className="max-w-3xl">
        {eyebrow ? (
          <Text variant="eyebrow" size="xs">
            {eyebrow}
          </Text>
        ) : null}
        <Text as="h2" variant="heading" size="3xl" className="mt-2 sm:text-4xl">
          {title}
        </Text>
        {description ? (
          <Text
            size="base"
            color="text-muted-foreground"
            leading="relaxed"
            className="mt-3"
          >
            {description}
          </Text>
        ) : null}
      </div>

      {/* Roster + detail */}
      <div className="mt-8 grid items-start gap-7 lg:grid-cols-[340px_1fr]">
        {/* List */}
        <div className="rounded-[18px] border border-border bg-background p-2.5 lg:sticky lg:top-24">
          <div className="flex gap-1.5 overflow-x-auto lg:block lg:overflow-visible">
            {grouped.map((bucket, groupIndex) => (
              <div key={groupIndex} className="contents lg:block">
                <Text
                  as="h4"
                  variant="eyebrow"
                  size="xs"
                  weight="bold"
                  className="hidden px-3 pb-1.5 pt-3.5 tracking-widest text-highlight-pink lg:block"
                >
                  {groups[groupIndex]}
                </Text>
                {bucket.map(({ person, index }) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={person.slug ?? person.name}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-pressed={isActive}
                      className={cn(
                        "flex w-[230px] shrink-0 items-center gap-3 rounded-xl border-l-4 border-transparent px-3 py-2.5 text-left transition-colors lg:w-full",
                        "hover:bg-secondary/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        isActive && "border-highlight-pink bg-secondary/70"
                      )}
                    >
                      <Avatar
                        person={person}
                        className="h-11 w-11 shrink-0 rounded-full"
                        textClassName="text-xs"
                      />
                      <span className="min-w-0">
                        <Text
                          as="span"
                          variant="body"
                          size="sm"
                          weight="semibold"
                          className="block leading-tight text-heading"
                        >
                          {person.name}
                        </Text>
                        <Text
                          as="span"
                          variant="muted"
                          size="xs"
                          className="mt-0.5 block leading-snug"
                        >
                          {person.role}
                        </Text>
                      </span>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <Card className="overflow-hidden p-0">
          <div className="flex flex-col items-center gap-6 bg-primary p-7 text-center sm:flex-row sm:text-left">
            <Avatar
              person={active}
              className="h-[130px] w-[130px] shrink-0 rounded-full border-4 border-highlight-pink/80"
              textClassName="text-3xl"
            />
            <div>
              <Text
                as="span"
                variant="eyebrow"
                size="xs"
                weight="bold"
                className="block tracking-widest text-highlight-pink"
              >
                {groups[active.group]}
              </Text>
              <Text
                as="h3"
                variant="heading"
                size="2xl"
                color="text-white"
                className="mt-1"
              >
                {active.name}
              </Text>
              <Text
                size="sm"
                color="text-white/90"
                leading="snug"
                className="mt-1"
              >
                {active.role}
              </Text>
            </div>
          </div>

          <div className="space-y-3.5 p-6 sm:p-8">
            {active.bio.map((paragraph, i) => (
              <Text
                key={i}
                size="base"
                color="text-foreground"
                leading="relaxed"
              >
                {paragraph}
              </Text>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
