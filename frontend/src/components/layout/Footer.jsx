import { footer } from "@/content/footer";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button/button";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="grid gap-8 py-10 sm:grid-cols-[2fr_1fr_1fr]">
        <p className="text-sm text-foreground">{footer.tagline}</p>
        {footer.columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold text-primary">{column.title}</h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Button to={link.to} variant="link" size="sm">
                    {link.label}
                  </Button>
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