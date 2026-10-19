import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { CardGrid } from "@/components/ui/card-grid";
import { Text } from "@/components/ui/Text/text";
import { cn } from "@/lib/utils";
import { useAdministrationContent } from "@/features/administration/hooks/useAdministrationContent";

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

/** Member photo with an initials fallback if the image is missing/fails. */
function MemberImage({ person, className, textClassName, imgClassName }) {
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
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </span>
  );
}

/** A single member card: photo + affiliation tag + name + role + view button. */
function MemberCard({ person, shortLabel, onOpen }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="aspect-[4/3] w-full bg-muted">
        <MemberImage
          person={person}
          className="block h-full w-full"
          textClassName="text-4xl"
          imgClassName="object-[center_18%]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4 sm:p-5">
        <Text as="span" variant="eyebrow" size="xs">
          {shortLabel}
        </Text>
        <Text as="h3" variant="heading" size="base" className="leading-snug">
          {person.name}
        </Text>
        <Text variant="muted" size="sm" leading="snug">
          {person.role}
        </Text>
        <button
          type="button"
          onClick={onOpen}
          className="mt-auto inline-flex w-fit items-center gap-1 pt-2.5 text-sm font-semibold text-accent transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View profile
          <ArrowRight
            className="h-4 w-4"
            style={{ color: "var(--accent)" }}
            aria-hidden="true"
          />
        </button>
      </div>
    </Card>
  );
}

/** Profile modal: gradient band, circular photo, name/role, full bio. */
function MemberModal({ person, groupLabel, onClose }) {
  const onKeyDown = useCallback(
    (event) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!person) return undefined;
    document.addEventListener("keydown", onKeyDown);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [onKeyDown, person]);

  if (!person) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={person.name}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.5rem] bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-5 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background text-primary shadow-md transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex-1 overflow-y-auto">
          <div className="h-28 bg-primary" />

          <div className="px-6 pb-8 sm:px-10">
            <MemberImage
            person={person}
            className="mx-auto -mt-20 block h-40 w-40 rounded-full border-4 border-background shadow-[0_0_0_4px_var(--accent)]"
            textClassName="text-5xl"
            imgClassName="object-[center_22%]"
          />

          <div className="mt-4 text-center">
            <Text as="span" variant="eyebrow" size="xs">
              {groupLabel}
            </Text>
            <Text as="h3" variant="heading" size="2xl" className="mt-1">
              {person.name}
            </Text>
            <Text variant="muted" size="sm" className="mt-1">
              {person.role}
            </Text>
          </div>

            <div className="mt-6 space-y-3.5">
              {person.bio.map((paragraph, i) => (
                <Text key={i} size="base" color="text-foreground" leading="relaxed">
                  {paragraph}
                </Text>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function AdministrationMembers() {
  const { members } = useAdministrationContent();
  const { eyebrow, title, description, groups, groupsShort, people } = members;

  const [activeIndex, setActiveIndex] = useState(null);

  const grouped = useMemo(
    () =>
      groups.map((_, groupIndex) =>
        people
          .map((person, index) => ({ person, index }))
          .filter(({ person }) => person.group === groupIndex)
      ),
    [groups, people]
  );

  const activePerson = activeIndex === null ? null : people[activeIndex];

  return (
    <div>
      {/* Section header */}
      <div className="max-w-3xl">
        {eyebrow ? (
          <Text variant="eyebrow" size="xs">
            {eyebrow}
          </Text>
        ) : null}
        <Text as="h2" variant="heading" size="section" className="mt-2">
          {title}
        </Text>
        {description ? (
          <Text variant="muted" leading="relaxed" className="mt-3">
            {description}
          </Text>
        ) : null}
      </div>

      {/* Grouped card grids */}
      <div className="mt-10 space-y-12">
        {grouped.map((bucket, groupIndex) => (
          <section key={groupIndex}>
            <div className="mb-6 flex items-center gap-3.5">
              <span
                className="h-8 w-1.5 shrink-0 rounded bg-accent"
                aria-hidden="true"
              />
              <Text as="h3" variant="heading" size="lg" color="text-primary">
                {groups[groupIndex]}
              </Text>
              <Text
                variant="muted"
                size="sm"
                className="ml-auto hidden whitespace-nowrap sm:block"
              >
                {bucket.length} members
              </Text>
            </div>

            <CardGrid columns={4}>
              {bucket.map(({ person, index }) => (
                <MemberCard
                  key={person.slug ?? person.name}
                  person={person}
                  shortLabel={groupsShort?.[groupIndex] ?? groups[groupIndex]}
                  onOpen={() => setActiveIndex(index)}
                />
              ))}
            </CardGrid>
          </section>
        ))}
      </div>

      <MemberModal
        person={activePerson}
        groupLabel={activePerson ? groups[activePerson.group] : ""}
        onClose={() => setActiveIndex(null)}
      />
    </div>
  );
}
