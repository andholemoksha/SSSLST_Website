import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";

export function SatsangAbout() {
  const { about } = useSatsangContent();

  return (
    <div className="max-w-xl lg:-ml-4">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
        {about.eyebrow}
      </p>
      <div className="mt-6 border-l border-accent/70 pl-6 sm:pl-8">
        {about.quotes.map((quote) => (
          <blockquote
            key={quote}
            className="border-b border-white/15 py-6 text-2xl font-medium leading-snug text-white drop-shadow-sm last:border-b-0 sm:text-3xl lg:text-[2rem]"
          >
            "{quote}"
          </blockquote>
        ))}
      </div>
    </div>
  );
}
