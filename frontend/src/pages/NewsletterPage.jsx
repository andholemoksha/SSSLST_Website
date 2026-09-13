import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Loader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text/text";
import { NewsletterCard } from "@/features/newsletter/components/NewsletterCard";
import { NewsletterYearArchive } from "@/features/newsletter/components/NewsletterYearArchive";
import { useNewsletters } from "@/features/newsletter/hooks/useNewsletters";

export function NewsletterPage() {
  const { data, isLoading, error } = useNewsletters();

  const latest = data?.latest ?? null;
  const groups = data?.groups ?? [];
  const latestId = latest?.id;

  const currentGroup = groups.find((group) => group.is_current) ?? null;
  const archivedGroups = groups.filter((group) => !group.is_current);

  const currentIssues = currentGroup
    ? currentGroup.issues.filter((issue) => issue.id !== latestId)
    : [];

  return (
    <>
      <PageHeader
        title="Newsletter"
        description="Monthly reflections, updates and highlights from the SSSLST community — read every edition of our newsletter."
      />

      <section className="bg-background py-12 sm:py-16 xl:py-24">
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-16" aria-label="Loading newsletters">
              <Loader />
            </div>
          ) : error ? (
            <Text variant="muted" className="py-16 text-center">
              Unable to load newsletters. Please try again later.
            </Text>
          ) : groups.length === 0 ? (
            <Text variant="muted" className="py-16 text-center">
              Newsletters will be published soon.
            </Text>
          ) : (
            <div className="space-y-14">
              {latest ? <NewsletterCard issue={latest} featured /> : null}

              {currentGroup && currentIssues.length > 0 ? (
                <div>
                  <Text as="h2" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
                    {currentGroup.year}
                  </Text>
                  <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                    {currentIssues.map((issue) => (
                      <NewsletterCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                </div>
              ) : null}

              {archivedGroups.length > 0 ? (
                <div>
                  <Text as="h2" variant="heading" size="xl" leading="tight" className="mb-6 sm:text-2xl">
                    Past editions
                  </Text>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {archivedGroups.map((group) => (
                      <NewsletterYearArchive
                        key={group.year}
                        year={group.year}
                        issues={group.issues}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
