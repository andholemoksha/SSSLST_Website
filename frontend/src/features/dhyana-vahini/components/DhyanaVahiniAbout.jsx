import { useDhyanaVahiniContent } from "@/features/dhyana-vahini/hooks/useDhyanaVahiniContent";

export function DhyanaVahiniAbout() {
  const { about } = useDhyanaVahiniContent();

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-border bg-surface p-6 shadow-[0_20px_60px_rgba(75,54,29,0.08)] sm:p-8 lg:p-12 xl:p-14 2xl:p-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.75),_transparent_55%)]" />
      <div className="relative grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12 xl:gap-16 2xl:gap-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-border/70 bg-white/80 shadow-inner shadow-accent/20">
              <svg viewBox="0 0 64 64" className="h-8 w-8 text-accent" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 18h24a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4Z" />
                <path d="M24 18V14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
                <path d="M24 28h16" />
                <path d="M24 34h10" />
              </svg>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              {about.eyebrow}
            </p>
          </div>

          <h2 className="mt-7 font-serif text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
            {about.title}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            {about.description}
          </p>

          <button className="mt-8 inline-flex items-center rounded-full border border-border/60 bg-white/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent transition hover:bg-white hover:shadow-lg">
            {about.buttonLabel || "Learn More"}
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-border bg-white/95 p-4 shadow-[0_18px_45px_rgba(95,74,50,0.16)]">
            <div className="absolute inset-4 rounded-[1.5rem] border border-white/70" />
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white/90 p-3 sm:p-4">
              <img
                src={about.image}
                alt={about.title}
                className="h-[300px] w-full rounded-[1.25rem] object-contain object-center shadow-[0_16px_35px_rgba(95,74,50,0.16)] sm:h-[340px] lg:h-[400px] xl:h-[440px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
