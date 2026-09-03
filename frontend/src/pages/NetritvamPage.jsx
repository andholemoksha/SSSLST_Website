import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";
import { NetritvamCard } from "@/features/netritvam/components/NetritvamCard";
import { useNetritvam } from "@/features/netritvam/hooks/useNetritvam";

export function NetritvamPage() {
  const { data, isLoading, error } = useNetritvam();

  const latest = data?.latest ?? null;
  const issues = data?.issues ?? [];
  const latestId = latest?.id;

  // The latest issue is shown as the featured card, so remove it from the grid.
  const gridIssues = issues.filter((issue) => issue.id !== latestId);

  return (
    <>
      {/* Hero band — reuses the site highlight gradient (no hardcoded colors) */}
      <section className="bg-gradient-highlight">
        <Container className="py-14 sm:py-16 lg:py-20">
          <Text as="h1" variant="heading" size="page" color="text-heading">
            Netritvam
          </Text>
          <Text variant="muted" size="base" leading="relaxed" className="mt-3 max-w-2xl md:text-lg">
            Leadership stories, insights and reflections from the SSSLST community —
            read every issue of our magazine.
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
              Unable to load Netritvam issues. Please try again later.
            </Text>
          ) : issues.length === 0 ? (
            <Text variant="muted" className="py-12 text-center">
              Netritvam issues will be published soon.
            </Text>
          ) : (
            <div className="space-y-14">
              {/* Special "Latest issue" card, directly below the heading */}
              {latest ? <NetritvamCard issue={latest} featured /> : null}

              {/* All issues, ordered Netritvam-1 -> N (latest excluded above) */}
              {gridIssues.length > 0 ? (
                <div>
                  <Text as="h2" variant="heading" size="xl" leading="tight" className="mb-6 sm:text-2xl">
                    All issues
                  </Text>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {gridIssues.map((issue) => (
                      <NetritvamCard key={issue.id} issue={issue} />
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
