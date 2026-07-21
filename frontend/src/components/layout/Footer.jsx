import { Link } from "react-router-dom";
import { footer } from "@/content/footer";
import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <Container className="grid gap-8 py-10 sm:grid-cols-[2fr_1fr_1fr]">
        <p className="text-sm text-foreground">{footer.tagline}</p>
        {footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-heading">{column.title}</h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-foreground hover:text-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="border-t border-border py-4 text-xs text-foreground">
        {footer.copyright}
      </Container>
    </footer>
  );
}
