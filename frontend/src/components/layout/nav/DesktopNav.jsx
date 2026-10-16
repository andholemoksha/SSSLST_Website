import { navigation } from "@/content/navigation";
import { DesktopNavItem } from "@/components/layout/nav/DesktopNavItem";

/**
 * Horizontally-centered desktop navigation. Hidden below `xl`; see
 * MobileNav for the small-screen equivalent.
 */
export function DesktopNav() {
  return (
    <nav
      aria-label="Primary"
      className="ml-12 mr-auto hidden items-center gap-6 xl:flex 2xl:ml-16 2xl:gap-8"
    >
      {navigation.links.map((item) => (
        <DesktopNavItem key={item.title} item={item} />
      ))}
    </nav>
  );
}
