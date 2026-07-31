import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { footer } from "@/content/footer";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";
import ssslstLogo from "@/assets/logos/SSSLST.jpg";

function YoutubeIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FFFFFF" />
    </svg>
  );
}

function FooterLink({ link }) {
  if (link.type === "mailto") {
    return (
      <Text as="a" href={link.href} variant="link" size="sm">
        {link.label}
      </Text>
    );
  }

  if (link.type === "external") {
    return (
      <Text
        as="a"
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        variant="link"
        size="sm"
        className="inline-flex items-center gap-1"
      >
        {link.label}
        <ExternalLink className="h-3 w-3" />
      </Text>
    );
  }

  return (
    <Text as={Link} to={link.href} variant="link" size="sm">
      {link.label}
    </Text>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-footer-gradient">
      <Container className="grid gap-8 py-10 sm:grid-cols-[2fr_1fr_1fr_1fr]">
        {/* Brand block */}
        <div>
          <div className="flex items-center gap-3">
            <img
              src={ssslstLogo}
              alt="SSSLST logo"
              className="h-10 w-10 shrink-0 rounded object-contain"
            />
            <div className="leading-tight">
              <Text as="span" variant="heading" size="sm" className="block">
                {footer.brand.logoText}
              </Text>
              <Text as="span" variant="muted" size="xs" className="block max-w-48">
                {footer.brand.logoSubtitle}
              </Text>
            </div>
          </div>
          <a
            href={footer.brand.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube channel"
            className="mt-4 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
          >
            <YoutubeIcon className="h-8 w-8" />
            <Text as="span" size="sm">Our virtual presence</Text>
          </a>
        </div>

        {/* Link columns */}
        {footer.columns.map((column) => (
          <div key={column.title}>
            <Text as="h3" variant="heading" size="sm">
              {column.title}
            </Text>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="border-t border-border py-4">
        <Text size="xs">{footer.copyright}</Text>
      </Container>
    </footer>
  );
}
