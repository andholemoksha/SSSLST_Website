/**
 * Full-bleed background layer for the Hero: an optional autoplaying video
 * (falls back to the --hero-bg dark gradient when no src is supplied yet)
 * plus the dark overlay + translucent grey overlay stacked on top, in that
 * order, so hero content stays readable either way.
 */
export function HeroBackgroundVideo({ src, poster }) {
  const resolvedSrc = src || null;
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-hero-bg">
      {src && (
        <video
          className="h-full w-full object-cover"
          src={resolvedSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <div className="absolute inset-0 bg-hero-overlay-darker" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-overlay-soft" aria-hidden="true" />
    </div>
  );
}
