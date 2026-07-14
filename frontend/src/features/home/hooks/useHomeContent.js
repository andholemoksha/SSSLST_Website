import { home } from "@/content/home";
import { resolveHeroMedia } from "@/features/home/services/heroMediaService";

export function useHomeContent() {
  return {
    ...home,
    hero: {
      ...home.hero,
      backgroundMedia: resolveHeroMedia(home.hero),
    },
  };
}
