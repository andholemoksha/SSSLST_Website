import { navigation } from "@/content/navigation";
import { DesktopNavItem } from "@/components/layout/nav/DesktopNavItem";

/**
 * Horizontally-centered desktop navigation. Hidden below `lg`; see
 * MobileNav for the small-screen equivalent.
 */
export function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex"
    >
      {navigation.links.map((item) => (
        <DesktopNavItem key={item.title} item={item} />
      ))}
    </nav>
  );
}
