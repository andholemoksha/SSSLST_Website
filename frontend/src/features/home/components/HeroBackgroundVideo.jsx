/**
 * Full-bleed background layer for the Hero.
 *
 * On mobile (< md) a static image is shown when `mobileImage` is provided,
 * which keeps the hero light and avoids autoplaying video on small screens.
 * From md up, an optional autoplaying video is shown. When neither the mobile
 * image nor the video src is available, the --hero-bg dark gradient shows
 * through. The dark + translucent grey overlays are always stacked on top so
 * hero content stays readable.
 */
export function HeroBackgroundVideo({ src, poster, mobileImage }) {
  const resolvedSrc = src || null;
  // When a mobile image exists, hide the video below md so it doesn't load.
  const videoVisibility = mobileImage ? "hidden md:block" : "block";

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-hero-bg">
      {mobileImage && (
        <img
          className="h-full w-full object-cover md:hidden"
          src={mobileImage}
          alt=""
          aria-hidden="true"
        />
      )}
      {resolvedSrc && (
        <video
          className={`h-full w-full object-cover ${videoVisibility}`}
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
