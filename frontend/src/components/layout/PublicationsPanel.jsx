import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Text/text";

const DESKTOP_BREAKPOINT = "(min-width: 1024px)";

function PublicationArtwork({ featured }) {
  return (
    <div
      aria-hidden="true"
      className={`relative aspect-3/4 w-20 shrink-0 overflow-hidden rounded-xl border shadow-sm sm:w-24 lg:w-28 ${featured ? "border-primary bg-primary" : "border-border bg-background"}`}
    >
      {featured ? (
        <>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-accent" />
          <div className="absolute bottom-8 left-1/2 h-16 w-6 -translate-x-1/2 rounded-t-full bg-foreground" />
          <Text as="span" variant="eyebrow" size="xs" weight="bold" className="absolute inset-x-2 top-4 text-center tracking-widest text-secondary">
            SSSLST
          </Text>
          <Text as="span" variant="heading" size="base" className="absolute inset-x-2 top-10 text-center tracking-wider text-secondary">
            NETRITVAM
          </Text>
          <Text as="span" size="xs" className="absolute inset-x-2 bottom-3 text-center leading-4 text-primary-foreground">
            Leadership through self transformation
          </Text>
        </>
      ) : (
        <>
          <div className="absolute inset-x-0 top-0 h-8 border-b border-border bg-surface" />
          <span className="absolute left-3 top-3 h-3 w-3 rounded-full border border-primary" />
          <Text as="span" size="xs" weight="bold" className="absolute left-8 top-2 leading-3 text-heading">
            SSSLST<br />NEWSLETTER
          </Text>
          <Text as="span" size="xs" weight="bold" className="absolute inset-x-3 top-12 leading-4 text-heading">
            Building Leaders of Character and Compassion
          </Text>
          <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-2">
            <span className="h-8 bg-accent" />
            <span className="h-8 bg-secondary" />
            <span className="h-8 bg-surface" />
            <span className="h-8 bg-primary/50" />
          </div>
        </>
      )}
    </div>
  );
}

function PublicationItem({ publication, featured = false, onNavigate }) {
  return (
    <article className="flex gap-4 py-4 first:pt-0 sm:gap-6 sm:py-6">
      <PublicationArtwork featured={featured} />
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <Text as="h3" variant="heading" size="xl">
          {publication.label}
        </Text>
        <Text size="sm" weight="medium" color="text-primary" className="mt-2">
          {publication.type}
        </Text>
        <span className="mt-2 h-0.5 w-8 bg-accent" />
        <Text size="sm" leading="relaxed" className="mt-4">
          {publication.summary}
        </Text>
        <Button
          to={publication.to}
          variant="outline"
          size="sm"
          icon={<ArrowRight className="h-4 w-4" style={{ color: 'var(--accent)' }} />}
          className="mt-4 w-fit"
          onClick={() => publication.to && onNavigate?.()}
        >
          {publication.cta}
        </Button>
      </div>
    </article>
  );
}

export function PublicationsPanel({ publications }) {
  const [open, setOpen] = useState(() => (
    typeof window !== "undefined" && window.matchMedia(DESKTOP_BREAKPOINT).matches
  ));

  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  if (!publications) return null;

  return (
    <>
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-foreground/15 transition-opacity lg:pointer-events-none lg:bg-transparent ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <button
        type="button"
        aria-label={open ? "Close publications" : "Open publications"}
        aria-expanded={open}
        aria-controls="publications-drawer"
        onClick={() => setOpen((value) => !value)}
        className={`fixed right-0 top-1/2 z-50 -translate-y-1/2 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${open ? "translate-x-full" : "translate-x-0"}`}
      >
        <span className="relative flex h-48 w-14 items-center justify-center rounded-l-2xl border border-r-0 border-border bg-surface shadow-sm sm:h-56 sm:w-16">
          <Text as="span" variant="eyebrow" size="xs" className="absolute top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap tracking-widest text-primary">
            Publications
          </Text>
          <span className="absolute bottom-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BookOpen className="h-5 w-5" />
          </span>
        </span>
      </button>

      <aside
        id="publications-drawer"
        aria-label="Our publications"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md touch-none flex-col overflow-hidden border-l border-border bg-surface shadow-md transition-transform ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="absolute right-16 top-0 flex h-20 w-12 items-center justify-center rounded-b-xl bg-primary text-primary-foreground shadow-sm">
          <Sparkles className="h-5 w-5" />
        </div>
        <Button
          variant="nav"
          size="icon"
          onClick={() => setOpen(false)}
          aria-label="Close publications"
          className="absolute right-4 top-4"
        >
          <X />
        </Button>

        <div className="flex h-full flex-col px-4 pb-4 pt-16 sm:px-6 sm:pt-8 lg:px-8">
          <Text as="h2" variant="heading" size="3xl">
            {publications.title}
          </Text>
          <div className="my-4 border-t border-border sm:my-6" />
          <PublicationItem publication={publications.featured} featured onNavigate={() => setOpen(false)} />
          <div className="border-t border-border" />
          <PublicationItem publication={publications.secondary} onNavigate={() => setOpen(false)} />
        </div>
      </aside>
    </>
  );
}
