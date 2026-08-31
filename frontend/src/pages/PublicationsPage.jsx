import { useEffect, useState } from "react";

import { apiClient } from "@/api/client";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Loader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text/text";
import { NetritvamCard } from "@/features/netritvam/components/NetritvamCard";
import { NetritvamYearArchive } from "@/features/netritvam/components/NetritvamYearArchive";

export function PublicationsPage() {
  const [data, setData] = useState({ latest: null, groups: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    apiClient.get("/v1/publications/")
      .then(({ data: payload }) => {
        if (isCurrent) setData(payload);
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

  const latest = data?.latest ?? null;
  const groups = data?.groups ?? [];
  const latestId = latest?.id;

  // Newest year is shown expanded; older years collapse into archive cards.
  const currentGroup = groups.find((group) => group.is_current) ?? null;
  const archivedGroups = groups.filter((group) => !group.is_current); // ascending

  const currentIssues = currentGroup
    ? currentGroup.issues.filter((issue) => issue.id !== latestId)
    : [];

  return (
    <>
      <PageHeader
        title="Netritvam"
        description="Leadership through self transformation — explore every edition of our publication."
      />
      <section className="bg-background py-12 sm:py-16 xl:py-24">
        <Container>
          {isLoading ? (
            <div className="flex justify-center py-16" aria-label="Loading Netritvam issues">
              <Loader />
            </div>
          ) : isError ? (
            <Text variant="muted" className="py-16 text-center">
              Netritvam issues could not be loaded. Please try again later.
            </Text>
          ) : groups.length === 0 ? (
            <Text variant="muted" className="py-16 text-center">
              Netritvam issues will be available soon.
            </Text>
          ) : (
            <div className="space-y-14">
              {/* Special "Latest issue" card, directly below the heading */}
              {latest ? <NetritvamCard issue={latest} featured /> : null}

              {/* Current (newest) year, expanded like a normal issue grid */}
              {currentGroup && currentIssues.length > 0 ? (
                <div>
                  <Text as="h2" variant="heading" size="xl" leading="tight" className="sm:text-2xl">
                    {currentGroup.year}
                  </Text>
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentIssues.map((issue) => (
                      <NetritvamCard key={issue.id} issue={issue} />
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
                      <NetritvamYearArchive
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
