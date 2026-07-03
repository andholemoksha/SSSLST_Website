import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";

/**
 * Placeholder brand mark. Swap the <svg> for the real logo asset when
 * it's available — the surrounding layout/spacing won't need to change.
 */
function LogoMark() {
  return (
    <svg
      viewBox="0 0 40 40"
      className="h-10 w-10 shrink-0"
      aria-hidden="true"
      fill="none"
    >
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
      <circle cx="20" cy="20" r="4" fill="var(--primary)" />
    </svg>
  );
}

export function NavLogo() {
  return (
    <NavLink to="/" className="flex shrink-0 items-center gap-3" end>
      <LogoMark />
      <span className="leading-tight">
        <span className="block font-heading text-xl font-bold text-primary">
          {navigation.logoText}
        </span>
        <span className="hidden max-w-[220px] text-xs text-muted-foreground sm:block">
          {navigation.logoSubtitle}
        </span>
      </span>
    </NavLink>
  );
}
