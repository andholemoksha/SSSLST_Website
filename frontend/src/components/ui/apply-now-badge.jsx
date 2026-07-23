import { applyNow } from "@/content/applynow";
import { Text } from "@/components/ui/Text/text";

export function ApplyNowBadge() {
  return (
    <a
      href={applyNow.formLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed
        bottom-6
        right-6
        z-50
        w-72
        rounded-3xl
        bg-primary
        p-6
        text-center
        text-primary-foreground
        shadow-2xl
        transition-transform
        duration-300
        hover:scale-105

        sm:w-80
      "
    >
      <Text as="div" variant="label" size="xs" color="text-accent-foreground" className="mx-auto mb-4 inline-flex rounded-full bg-accent px-4 py-1 tracking-wide">
        Admissions Open
      </Text>

      <Text as="h2" size="sm" color="text-inherit" leading="relaxed" className="mt-3 opacity-95">
        {applyNow.title}
      </Text>

      <Text as="div" variant="button" size="sm" color="text-accent-foreground" className="mt-6 inline-flex rounded-full bg-accent px-6 py-3">
        {applyNow.buttonText} →
      </Text>
    </a>
  );
}