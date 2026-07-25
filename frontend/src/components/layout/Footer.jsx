import { Link } from "react-router-dom";
import { footer } from "@/content/footer";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer-gradient">
      <Container className="grid gap-8 py-10 sm:grid-cols-[2fr_1fr_1fr]">
        <Text size="sm">{footer.tagline}</Text>
        {footer.columns.map((column) => (
          <div key={column.title}>
            <Text as="h3" variant="heading" size="sm">{column.title}</Text>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Text as={Link} to={link.to} variant="link" size="sm">
                    {link.label}
                  </Text>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="border-t border-border py-4">
        <Text size="xs">
        {footer.copyright}
        </Text>
      </Container>
    </footer>
  );
}
