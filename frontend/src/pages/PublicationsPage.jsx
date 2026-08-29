import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen } from "lucide-react";

import { apiClient } from "@/api/client";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button/button";
import { Loader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text/text";

function PublicationCard({ publication, featured = false }) {
  return (
    <article className={`flex flex-col rounded-2xl border bg-surface p-6 shadow-sm ${featured ? "border-primary/40" : "border-border"}`}>
      <div className="flex items-start justify-between gap-4">
        <span className={`flex h-11 w-11 items-center justify-center rounded-full ${featured ? "bg-primary text-primary-foreground" : "bg-muted text-primary"}`}>
          <BookOpen className="h-5 w-5" aria-hidden="true" />
        </span>
        {featured ? (
          <Text as="span" variant="eyebrow" size="xs" className="rounded-full bg-primary/10 px-3 py-1 text-primary">
            Latest issue
          </Text>
        ) : null}
      </div>

      <Text as="h2" variant="heading" size="xl" className="mt-6">
        {publication.title}
      </Text>
      {publication.published_date ? (
        <Text variant="muted" size="sm" className="mt-2">
          Published {publication.published_date}
        </Text>
      ) : null}
      <Text size="sm" leading="relaxed" className="mt-4 flex-1">
        {publication.description || "Read this edition of Netritvam."}
      </Text>
      <Button
        href={publication.publication_url}
        target="_blank"
        rel="noreferrer"
        icon={<ArrowUpRight className="h-4 w-4" />}
        className="mt-6 w-fit"
      >
        Read publication
      </Button>
    </article>
  );
}

export function PublicationsPage() {
  const [publications, setPublications] = useState({ featured: null, issues: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    apiClient.get("/v1/publications/")
      .then(({ data }) => {
        if (isCurrent) setPublications(data);
      })
      .catch(() => {
        if (isCurrent) setIsError(true);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const allPublications = [
    ...(publications.featured ? [{ ...publications.featured, featured: true }] : []),
    ...publications.issues.map((publication) => ({ ...publication, featured: false })),
  ];

  return (
    <>
      <PageHeader
        title="Netritvam"
        description="Leadership through self transformation — explore every edition of our publication."
      />
      <section className="bg-background py-12 sm:py-16 xl:py-24">
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-16" aria-label="Loading publications">
              <Loader />
            </div>
          ) : isError ? (
            <Text variant="muted" className="py-16 text-center">
              Publications could not be loaded. Please try again later.
            </Text>
          ) : allPublications.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {allPublications.map((publication) => (
                <PublicationCard
                  key={publication.issue_number}
                  publication={publication}
                  featured={publication.featured}
                />
              ))}
            </div>
          ) : (
            <Text variant="muted" className="py-16 text-center">
              Publications will be available soon.
            </Text>
          )}
        </Container>
      </section>
    </>
  );
}
