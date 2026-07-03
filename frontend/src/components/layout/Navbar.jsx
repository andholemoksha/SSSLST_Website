import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { NavLogo } from "@/components/layout/nav/NavLogo";
import { DesktopNav } from "@/components/layout/nav/DesktopNav";
import { MobileNav } from "@/components/layout/nav/MobileNav";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <Container className="relative flex h-20 items-center justify-between">
        <NavLogo />

        <DesktopNav />

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </Container>

      <div id="mobile-nav">
        <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </div>
    </header>
  );
}
