import { ArrowUpRight, BookOpen } from "lucide-react";
import { Text } from "@/components/ui/Text/text";

/**
 * A single Netritvam issue card.
 *
 * Default card matches the Sathvam / Dhyana Vahini video card sizing:
 *   shell  -> rounded-xl border border-border bg-white shadow-sm
 *   media  -> aspect-video, bg-muted
 *   body   -> px-4 py-3, title variant=body size=sm font-medium text-heading
 *
 * `featured` renders a wider highlighted "Latest issue" band shown below the
 * page heading. The whole card is an external link that opens the flip-book.
 */
export function NetritvamCard({ issue, featured = false }) {
  const cover = issue.cover_image;

  if (featured) {
    return (
      <a
        href={issue.publication_url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col overflow-hidden rounded-2xl border border-primary/40 bg-white shadow-sm ring-1 ring-primary/10 transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 sm:flex-row"
        aria-label={`Read latest Netritvam issue: ${issue.title}`}
      >
        <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-muted sm:aspect-auto sm:w-72 lg:w-80">
          {cover ? (
            <img
              src={cover}
              alt={issue.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full min-h-44 w-full items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
                <BookOpen className="h-7 w-7" aria-hidden="true" />
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
          <Text as="span" variant="eyebrow" size="xs" weight="bold" className="mb-2 tracking-widest text-primary">
            Latest Release
          </Text>
          <Text as="h2" variant="heading" size="2xl" leading="tight" className="sm:text-3xl">
            {issue.title}
          </Text>
          <Text size="sm" leading="relaxed" className="mt-3 text-muted-foreground">
            Read the latest edition of Netritvam.
          </Text>
          <span className="mt-5 inline-flex items-center gap-2 font-medium text-primary">
            Read publication
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </span>
        </div>
      </a>
    );
  }

  return (
    <a
      href={issue.publication_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-border bg-white text-left shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40"
      aria-label={`Read Netritvam issue: ${issue.title}`}
    >
      {/* Media — same 16:9 ratio as the video cards */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {cover ? (
          <img
            src={cover}
            alt={issue.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-white shadow-lg transition-transform group-hover:scale-110">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </span>
          </div>
        )}
      </div>

      {/* Body — same padding + title styling as the video cards */}
      <div className="flex items-center justify-between gap-2 px-4 py-3">
        <Text as="p" variant="body" size="sm" className="line-clamp-2 font-medium text-heading">
          {issue.title}
        </Text>
        <ArrowUpRight
          className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}
