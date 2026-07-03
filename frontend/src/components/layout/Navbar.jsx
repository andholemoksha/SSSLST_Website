import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <header className="border-b border-border bg-white">
      <Container className="flex h-16 items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold text-text-h">
          {navigation.logoText}
        </NavLink>
        <nav className="flex items-center gap-6">
          {navigation.links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium text-text hover:text-text-h",
                  isActive && "text-accent"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
}
