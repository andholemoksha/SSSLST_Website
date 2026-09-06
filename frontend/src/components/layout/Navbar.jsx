import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/Button/button-variants";
import { Container } from "@/components/layout/Container";
import { NavLogo } from "@/components/layout/nav/NavLogo";
import { DesktopNav } from "@/components/layout/nav/DesktopNav";
import { MobileNav } from "@/components/layout/nav/MobileNav";
import { NavThemeProvider } from "@/components/layout/nav/NavThemeContext";

const TRANSPARENT_SCROLL_THRESHOLD = 64;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return undefined;

    function handleScroll() {
      setScrolled(window.scrollY > TRANSPARENT_SCROLL_THRESHOLD);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHome]);

  const transparent = isHome && !scrolled;

  return (
    <NavThemeProvider value={{ transparent }}>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-colors duration-300",
          transparent
            ? "border-transparent bg-transparent"
            : "border-primary bg-nav-gradient"
        )}
      >
        <Container className="relative flex h-20 items-center justify-between">
          <NavLogo />

          <DesktopNav />

          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              buttonVariants({ variant: "nav", size: "icon" }),
              "xl:hidden text-white"
            )}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </Container>

        <div id="mobile-nav" className="absolute inset-x-0 top-full">
          <MobileNav
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
          />
        </div>
      </header>
    </NavThemeProvider>
  );
}