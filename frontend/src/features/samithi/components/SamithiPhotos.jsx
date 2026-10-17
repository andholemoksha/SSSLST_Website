import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Text } from "@/components/ui/Text/text";
import { Loader } from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import { useSamithiPhotos } from "@/features/samithi/hooks/useSamithiPhotos";

const WING_CHIPS = [
  { slug: "service", label: "Service" },
  { slug: "education", label: "Education" },
  { slug: "spiritual", label: "Spiritual" },
];

const AUTO_ADVANCE_MS = 4000;
const SLIDE_MS = 600;

/** Number of cards visible at once per breakpoint: phone 2, tablet 3, laptop 5. */
function useVisibleCount() {
  const getCount = () => {
    if (typeof window === "undefined") return 5;
    if (window.innerWidth >= 1024) return 5; // lg+
    if (window.innerWidth >= 640) return 3; // sm+
    return 2;
  };

  const [count, setCount] = useState(getCount);

  useEffect(() => {
    const onResize = () => setCount(getCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return count;
}

/**
 * Wing-filterable, auto-advancing photo carousel.
 *
 * - Three chips (Service / Education / Spiritual), all selected by default.
 * - Shows only images for the selected wings.
 * - Slides one card every few seconds with a smooth transition, looping
 *   seamlessly (clones of the leading cards are appended so the wrap is
 *   invisible).
 * - Prev/next arrows reveal on hover.
 */
export function SamithiPhotos() {
  const { items, isLoading, isError } = useSamithiPhotos();
  const visibleCount = useVisibleCount();

  const [selectedWings, setSelectedWings] = useState(
    () => new Set(WING_CHIPS.map((chip) => chip.slug)),
  );
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // While a "snap back" (no-transition reset at the loop seam) is in progress.
  const [isAnimating, setIsAnimating] = useState(true);

  const filtered = useMemo(
    () => items.filter((item) => selectedWings.has(item.wing)),
    [items, selectedWings],
  );

  const canScroll = filtered.length > visibleCount;

  // The sliding track = the real items plus `visibleCount` leading clones at the
  // end, so sliding past the last item reveals the first ones without a gap.
  const slides = useMemo(() => {
    if (!canScroll) return filtered;
    const clones = filtered.slice(0, visibleCount);
    return [...filtered, ...clones];
  }, [filtered, canScroll, visibleCount]);

  // Auto-advance one card at a time (wrap around). Paused on hover.
  useEffect(() => {
    if (!canScroll || isPaused) return undefined;
    const id = setInterval(() => {
      setIsAnimating(true);
      setIndex((current) => current + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [canScroll, isPaused, filtered.length]);

  // When we slide onto the cloned leading cards (index === filtered.length),
  // let the transition finish, then jump back to the real first card with no
  // transition so the loop is seamless.
  useEffect(() => {
    if (!canScroll || index !== filtered.length) return undefined;
    const id = setTimeout(() => {
      setIsAnimating(false);
      setIndex(0);
    }, SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, canScroll, filtered.length]);

  const toggleWing = (slug) => {
    setSelectedWings((current) => {
      const next = new Set(current);
      if (next.has(slug)) {
        // Keep at least one chip selected.
        if (next.size > 1) next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
    // Reset to the first image of the new filtered set (event handler, not effect).
    setIsAnimating(false);
    setIndex(0);
  };

  const goPrev = () => {
    setIsAnimating(true);
    setIndex((current) => {
      if (current <= 0) return filtered.length - 1;
      return current - 1;
    });
  };
  const goNext = () => {
    setIsAnimating(true);
    setIndex((current) => current + 1);
  };

  const cardBasis = `${100 / visibleCount}%`;
  // Clamp so a stale index (after a filter shrink or breakpoint change) never
  // slides the track past its last slide.
  const maxIndex = Math.max(0, slides.length - visibleCount);
  const clampedIndex = Math.min(index, maxIndex);
  const offset = canScroll ? clampedIndex * (100 / visibleCount) : 0;

  return (
    <section className="pt-2">
      <Text as="h2" variant="heading" size="2xl" className="mb-4">
        Photos
      </Text>

      {/* Chips */}
      <div className="mb-5 flex flex-wrap gap-2">
        {WING_CHIPS.map((chip) => {
          const active = selectedWings.has(chip.slug);
          return (
            <button
              key={chip.slug}
              type="button"
              aria-pressed={active}
              onClick={() => toggleWing(chip.slug)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                active
                  ? "border-primary bg-primary text-white"
                  : "border-border bg-surface text-muted-foreground hover:bg-primary/10",
              )}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Strip */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader />
        </div>
      ) : isError ? (
        <Text variant="muted" className="py-12 text-center">
          Photos could not be loaded right now. Please try again later.
        </Text>
      ) : filtered.length === 0 ? (
        <Text variant="muted" className="py-12 text-center">
          No photos for the selected categories yet.
        </Text>
      ) : (
        <div
          className="group relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex"
            style={{
              transform: `translateX(-${offset}%)`,
              transition: isAnimating ? `transform ${SLIDE_MS}ms ease-in-out` : "none",
            }}
          >
            {slides.map((item, i) => (
              <figure
                key={`${i}-${item.title}`}
                className="shrink-0 px-1.5 sm:px-2"
                style={{ flexBasis: cardBasis, maxWidth: cardBasis }}
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
              </figure>
            ))}
          </div>

          {/* Hover arrows */}
          {canScroll ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photos"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photos"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/55 p-2 text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          ) : null}
        </div>
      )}
    </section>
  );
}
