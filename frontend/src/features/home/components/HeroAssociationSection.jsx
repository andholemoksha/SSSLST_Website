import sssihlLogo from "@/assets/logos/SSSIHL-Logo_White.png";
import { SectionDivider } from "@/components/ui/section-divider";

/**
 * Placeholder brand mark for associations without a logo asset yet (SSSSO).
 * Swap for the real logo asset when available — layout/spacing stays the same.
 */
function PlaceholderMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-14 w-14 shrink-0" aria-hidden="true" fill="none">
      <circle cx="20" cy="20" r="19" stroke="var(--accent)" strokeWidth="1.5" />
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="20"
          cy="9"
          rx="3.2"
          ry="6.5"
          fill="var(--accent)"
          opacity="0.85"
          transform={`rotate(${i * 45} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="4" fill="#ffffff" />
    </svg>
  );
}

const logoMap = {
  SSSIHL: sssihlLogo,
};

export function HeroAssociationSection({ associations }) {
  return (
    <div className="text-white">
      <SectionDivider label="In Association With" variant="plain" />
      <div className="mt-6 flex items-start justify-center gap-8 divide-x divide-white/15 sm:justify-between">
        {associations.map((association) => {
          const logoSrc = logoMap[association.name];

          return (
            <div key={association.name} className="flex flex-1 flex-col items-center gap-2 px-4 text-center">
              {logoSrc ? (
                <img src={logoSrc} alt={`${association.name} logo`} className="h-14 w-14 object-contain" />
              ) : (
                <PlaceholderMark />
              )}
              <span className="font-heading text-lg font-bold">{association.name}</span>
              <span className="text-sm text-white/75">{association.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
