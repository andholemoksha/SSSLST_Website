import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/Text/text";
import { cn } from "@/lib/utils";

/**
 * Generic reusable tile card for hub/grid/scroller layouts across the app
 * (state cards, project categories, activities, …).
 *
 * Props:
 * - to           destination route (whole card is a link)
 * - onClick      when provided (and no `to`), the whole card becomes a button
 *                that fires this handler — e.g. to open a modal
 * - title        heading text
 * - eyebrow      optional small label shown above the title (e.g. a tag)
 * - description  optional supporting text
 * - image        optional image src; if omitted, `initials` shows on a brand panel
 * - initials     optional short text shown centered when there is no image
 * - meta         optional small text on the footer's left (e.g. a count)
 * - cta          footer call-to-action label (default "View")
 * - ariaLabel    accessible label for the card when it is a button/link
 * - mediaAspect  tailwind aspect-ratio class for the media frame
 *                (default "aspect-[4/3]"; e.g. "aspect-square" / "aspect-[3/4]")
 * - ctaAlign     footer CTA alignment: "right" (default) or "left"
 * - className    extra classes on the outer link (e.g. fixed width for scrollers)
 */
export function TileCard({
  to,
  onClick,
  title,
  eyebrow,
  description,
  image,
  initials,
  media,
  meta,
  cta = "View",
  showFooter = true,
  variant = "default",
  ariaLabel,
  mediaAspect = "aspect-[4/3]",
  ctaAlign = "right",
  className,
  cardClassName,
  imageClassName,
  imagePosition = "center",
  onImageError,
}) {
  const isCompact = variant === "compact";
  const isExternal = to && (to.startsWith("http://") || to.startsWith("https://"));
  const isButton = !to && typeof onClick === "function";
  const Wrapper = to ? (isExternal ? "a" : Link) : isButton ? "button" : "div";
  const wrapperProps = to
    ? isExternal
      ? { href: to, target: "_blank", rel: "noopener noreferrer" }
      : { to }
    : isButton
      ? { type: "button", onClick, "aria-label": ariaLabel ?? title }
      : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group block rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isButton && "w-full text-left",
        className
      )}
    >
      <Card
        className={cn(
          "flex h-full flex-col overflow-hidden p-0 transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg",
          cardClassName
        )}
      >
        {/* Media: image if provided, else initials on a brand panel */}
        <div
          className={cn(
            "flex items-center justify-center overflow-hidden bg-primary",
            mediaAspect
          )}
        >
          {media ? (
            <div className="flex h-full w-full items-center justify-center p-6">
              {media}
            </div>
          ) : image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={onImageError}
              className={cn(
                "h-full w-full object-cover transition-transform duration-200 group-hover:scale-105",
                imageClassName
              )}
              style={{ objectPosition: imagePosition }}
            />
          ) : initials ? (
            <span className="text-4xl font-bold tracking-wide text-white">
              {initials}
            </span>
          ) : null}
        </div>

        {/* Compact body: just a tight title, no description or footer */}
        {isCompact ? (
          <div className="px-2 py-2">
            <Text
              as="h3"
              variant="heading"
              size="sm"
              className="line-clamp-2 text-center leading-snug"
            >
              {title}
            </Text>
          </div>
        ) : (
        <div className="flex flex-1 flex-col p-4">
          {eyebrow ? (
            <Text as="span" variant="eyebrow" size="xs" className="mb-1.5">
              {eyebrow}
            </Text>
          ) : null}
          <Text as="h3" variant="heading" size="base">{title}</Text>
          {description ? (
            <div className="mt-1">
              {typeof description === "string" ? (
                <Text
                  variant="muted"
                  size="sm"
                  className="line-clamp-2"
                >
                  {description}
                </Text>
              ) : (
                description
              )}
            </div>
          ) : null}

          {showFooter ? (
            <div
              className={cn(
                "mt-auto flex items-center pt-3",
                ctaAlign === "left" ? "justify-start gap-3" : "justify-between"
              )}
            >
              {meta ? (
                <Text
                  variant="body"
                  size="sm"
                  weight="medium"
                  color="text-primary"
                >
                  {meta}
                </Text>
              ) : ctaAlign === "left" ? null : (
                <span />
              )}
              {cta ? (
                <Text
                  as="span"
                  variant="body"
                  size="sm"
                  weight="semibold"
                  color="text-accent"
                  className="inline-flex items-center gap-1"
                >
                  {cta}
                  <span className="transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </Text>
              ) : null}
            </div>
          ) : null}
        </div>
        )}
      </Card>
    </Wrapper>
  );
}