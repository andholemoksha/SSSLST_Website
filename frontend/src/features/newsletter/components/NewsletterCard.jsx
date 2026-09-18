import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/Button/button";
import { Text } from "@/components/ui/Text/text";

export function NewsletterCard({ issue, featured = false }) {
  const cover = issue.cover_image;
  const hasCover = Boolean(cover);

  if (featured) {
    return (
      <article
        className="flex flex-col rounded-2xl border border-primary/40 bg-surface p-4 shadow-sm md:flex-row md:items-stretch md:gap-4 md:p-4"
        aria-label={`Read newsletter: ${issue.title}`}
      >
        <div className="w-full md:w-[38%] md:max-w-[320px] md:flex-shrink-0">
          <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-muted/30">
            {hasCover ? (
              <img
                src={cover}
                alt={issue.title}
                loading="lazy"
                className="h-full w-full object-contain object-center"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted/30 text-muted-foreground">
                <span className="text-sm font-medium">Newsletter</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-1 flex-col justify-center md:mt-0 md:pl-1">
          <div className="flex justify-end">
            <Text as="span" variant="eyebrow" size="xs" className="rounded-full bg-primary/10 px-3 py-1 text-primary">
              Latest issue
            </Text>
          </div>

          <Text as="h2" variant="heading" size="xl" className="mt-4 md:mt-4">
            {issue.title}
          </Text>

          <Text size="sm" leading="relaxed" className="mt-3 flex-1 text-muted-foreground">
            Read the newest edition of our newsletter.
          </Text>

          <Button
            href={issue.flipbook_url}
            target="_blank"
            rel="noreferrer"
            icon={<ArrowUpRight className="h-4 w-4" />}
            className="mt-4 w-fit"
          >
            Read newsletter
          </Button>
        </div>
      </article>
    );
  }

  return (
    <article
      className="flex flex-col rounded-2xl border border-border bg-surface p-4 shadow-sm"
      aria-label={`Read newsletter: ${issue.title}`}
    >
      <div className="aspect-[3/4] w-full overflow-hidden rounded-xl border border-border bg-muted/30">
        {hasCover ? (
          <img
            src={cover}
            alt={issue.title}
            loading="lazy"
            className="h-full w-full object-contain object-center"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/30 text-muted-foreground">
            <span className="text-sm font-medium">Newsletter</span>
          </div>
        )}
      </div>

      <Text as="h2" variant="heading" size="xl" className="mt-4">
        {issue.title}
      </Text>

      <Text size="sm" leading="relaxed" className="mt-3 flex-1 text-muted-foreground">
        Read this edition of our newsletter.
      </Text>

      <Button
        href={issue.flipbook_url}
        target="_blank"
        rel="noreferrer"
        icon={<ArrowUpRight className="h-4 w-4" />}
        className="mt-4 w-fit"
      >
        Read newsletter
      </Button>
    </article>
  );
}
