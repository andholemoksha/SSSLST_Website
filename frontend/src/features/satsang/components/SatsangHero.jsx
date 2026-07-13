import { useSatsangContent } from "@/features/satsang/hooks/useSatsangContent";

export function SatsangHero() {
  const { hero } = useSatsangContent();

  return (
    <div className="max-w-2xl lg:justify-self-end">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">
        {hero.eyebrow}
      </p>
      <h1 className="mt-4 text-5xl font-semibold leading-tight sm:text-7xl lg:text-[5.75rem]">
        {hero.title}
      </h1>
      <div className="mt-6 h-px w-24 bg-accent" />
      <p className="mt-6 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
        {hero.description}
      </p>
    </div>
  );
}
