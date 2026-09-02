import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";
import { NewsletterCard } from "@/features/newsletter/components/NewsletterCard";
import { NewsletterYearArchive } from "@/features/newsletter/components/NewsletterYearArchive";
import { useNewsletters } from "@/features/newsletter/hooks/useNewsletters";

export function NewsletterPage() {
  const { data, isLoading, error } = useNewsletters();

  const latest = data?.latest ?? null;
  const groups = data?.groups ?? [];
  const latestId = latest?.id;

  // Newest year is shown expanded; older years collapse into archive cards.
  const currentGroup = groups.find((group) => group.is_current) ?? null;
  const archivedGroups = groups.filter((group) => !group.is_current); // already ascending

  const currentIssues = currentGroup
    ? currentGroup.issues.filter((issue) => issue.id !== latestId)
    : [];

  return (
    <>
      {/* Hero band — reuses the site highlight gradient (no hardcoded colors) */}
      <section className="bg-gradient-highlight">
        <Container className="py-14 sm:py-16 lg:py-20">
          <Text as="h1" variant="heading" size="page" color="text-heading">
            SSSLST Newsletter
          </Text>
          <Text variant="muted" size="base" leading="relaxed" className="mt-3 max-w-2xl md:text-lg">
            Monthly reflections, updates and highlights from the SSSLST community —
            read every edition of our newsletter.
          </Text>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-video animate-pulse rounded-xl bg-muted" />
              ))}
            </div>
          ) : error ? (
            <Text variant="muted" className="py-12 text-center">
              Unable to load newsletters. Please try again later.
            </Text>
          ) : groups.length === 0 ? (
            <Text variant="muted" className="py-12 text-center">
              Newsletters will be published soon.
            </Text>
          ) : (
            <div className="space-y-14">
              {/* Special "Latest issue" card, directly below the heading */}
              {latest ? <NewsletterCard issue={latest} featured /> : null}

              {/* Current (newest) year, expanded like a normal month grid */}
              {currentGroup && currentIssues.length > 0 ? (
                <div>
                  <Text as="h2" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
                    {currentGroup.year}
                  </Text>
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentIssues.map((issue) => (
                      <NewsletterCard key={issue.id} issue={issue} />
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Past years, collapsed into ascending archive cards */}
              {archivedGroups.length > 0 ? (
                <div>
                  <Text as="h2" variant="heading" size="xl" leading="tight" className="mb-6 sm:text-2xl">
                    Past editions
                  </Text>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
