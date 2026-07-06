import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/**
 * Generic reusable tile card for hub/grid/scroller layouts across the app
 * (state cards, project categories, activities, …).
 *
 * Props:
 * - to           destination route (whole card is a link)
 * - title        heading text
 * - description  optional supporting text
 * - image        optional image src; if omitted, `initials` shows on a brand panel
 * - initials     optional short text shown centered when there is no image
 * - meta         optional small text on the footer's left (e.g. a count)
 * - cta          footer call-to-action label (default "View")
 * - className    extra classes on the outer link (e.g. fixed width for scrollers)
 */
export function TileCard({
  to,
  title,
  description,
  image,
  initials,
  meta,
  cta = "View",
  className,
}) {
  return (
    <Link
      to={to}
      className={cn(
        "group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
    >
      <Card className="flex h-full flex-col overflow-hidden p-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        {/* Media: image if provided, else initials on a brand panel */}
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-primary">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          ) : initials ? (
            <span className="text-4xl font-bold tracking-wide text-white">
              {initials}
            </span>
          ) : null}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          {description ? (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between pt-3">
            {meta ? (
              <span className="text-sm font-medium text-primary">{meta}</span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent">
              {cta}
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                &rarr;
              </span>
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
