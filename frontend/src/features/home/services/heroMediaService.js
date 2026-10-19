const DEFAULT_HERO_VIDEO = "/hero/hero-background.mp4";

export function resolveHeroMedia(heroContent = {}) {
  const backgroundMedia = heroContent.backgroundMedia || {};
  const primarySrc = backgroundMedia.src || backgroundMedia.url || DEFAULT_HERO_VIDEO;
  const fallbackSrc = backgroundMedia.fallbackSrc || null;
  const poster = backgroundMedia.poster || null;
  const mobileImage = backgroundMedia.mobileImage || null;

  return {
    src: primarySrc,
    fallbackSrc,
    poster,
    mobileImage,
    hasFallback: Boolean(fallbackSrc),
  };
}
