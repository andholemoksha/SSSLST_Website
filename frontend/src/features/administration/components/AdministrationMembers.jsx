import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import { CardGrid } from "@/components/ui/card-grid";
import { TileCard } from "@/components/ui/tile-card";
import { Text } from "@/components/ui/Text/text";
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

/** Profile modal: purple band, circular photo, name/role, full bio. */
function MemberModal({ person, groupLabel, onClose }) {
  const [imgFailed, setImgFailed] = useState(false);

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

  const showImage = person.image && !imgFailed;

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
            <span className="mx-auto -mt-20 block h-40 w-40 overflow-hidden rounded-full border-4 border-background shadow-[0_0_0_4px_var(--accent)]">
              {showImage ? (
                <img
                  src={person.image}
                  alt={person.name}
                  onError={() => setImgFailed(true)}
                  className="h-full w-full object-cover object-[center_22%]"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center bg-primary font-heading text-5xl font-semibold text-white">
                  {initialsOf(person.name)}
                </span>
              )}
            </span>

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
                <TileCard
                  key={person.slug ?? person.name}
                  onClick={() => setActiveIndex(index)}
                  ariaLabel={`View profile of ${person.name}`}
                  eyebrow={groupsShort?.[groupIndex] ?? groups[groupIndex]}
                  title={person.name}
                  description={person.role}
                  image={person.image}
                  initials={initialsOf(person.name)}
                  mediaAspect="aspect-square"
                  imagePosition="center 20%"
                  cta="View profile"
                  ctaAlign="left"
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
