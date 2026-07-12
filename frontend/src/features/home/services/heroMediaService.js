const DEFAULT_HERO_VIDEO = "/hero/hero-background.mp4";

export function resolveHeroMedia(heroContent = {}) {
  const backgroundMedia = heroContent.backgroundMedia || {};
  const primarySrc = backgroundMedia.src || backgroundMedia.url || DEFAULT_HERO_VIDEO;
  const fallbackSrc = backgroundMedia.fallbackSrc || null;
  const poster = backgroundMedia.poster || null;

  return {
    src: primarySrc,
    fallbackSrc,
    poster,
    hasFallback: Boolean(fallbackSrc),
  };
}
