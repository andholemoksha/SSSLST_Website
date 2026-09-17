import { Loader } from "@/components/ui/loader";
import { Text } from "@/components/ui/Text/text";
import { useSamithiActivities } from "@/features/samithi/hooks/useSamithiPhotos";
import { SamithiActivityPhotos } from "@/features/samithi/components/SamithiActivityPhotos";

/** Slugify a backend activity title so it can be matched to the URL slug. */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[/]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Resolves a wing + activity slug (from the route) to a backend activity and
 * renders its photo gallery. `wing` is the section slug (spiritual/service/
 * education); `activitySlug` is the activity slug from the URL.
 */
export function SamithiActivityGallery({ wing, activitySlug, activityName }) {
  const { data: activities, isLoading, isError } = useSamithiActivities(wing);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <Text variant="muted" className="py-10 text-center">
        Photos could not be loaded right now. Please try again later.
      </Text>
    );
  }

  const match = (activities ?? []).find(
    (a) => a.slug === activitySlug || slugify(a.title) === activitySlug,
  );

  if (!match) {
    return (
      <Text variant="muted" className="py-10 text-center">
        Photos for {activityName} will be added soon.
      </Text>
    );
  }

  return <SamithiActivityPhotos activityId={match.id} />;
}
