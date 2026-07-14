import { applyNow } from "@/content/applynow";

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
      <div className="mx-auto mb-4 inline-flex rounded-full bg-accent px-4 py-1 text-xs font-semibold uppercase tracking-wide text-accent-foreground">
        Admissions Open
      </div>

      <h2 className="mt-3 text-sm leading-6 opacity-95">
        {applyNow.title}
      </h2>

      <div className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground">
        {applyNow.buttonText} →
      </div>
    </a>
  );
}