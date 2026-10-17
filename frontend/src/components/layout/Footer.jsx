import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { footer } from "@/content/footer";
import { Container } from "@/components/layout/Container";
import { Text } from "@/components/ui/Text/text";
import { YoutubeIcon } from "@/components/ui/youtube-icon";
import ssslstLogo from "@/assets/logos/SSSLS Logo PNG.png";

function FooterLink({ link }) {
  if (link.type === "mailto") {
    return (
      <Text
        as="a"
        href={link.href}
        variant="link"
        size="sm"
        className="text-white-light hover:text-white"
      >
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
        className="inline-flex items-center gap-1 whitespace-nowrap text-white-light hover:text-white"
      >
        {link.label}
        <ExternalLink className="h-3 w-3 shrink-0" />
      </Text>
    );
  }

  return (
    <Text
      as={Link}
      to={link.href}
      variant="link"
      size="sm"
      className="text-white-light hover:text-white"
    >
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
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white">
                  <img
                    src={ssslstLogo}
                    alt="SSSLST logo"
                    className="h-24 w-24"
                  />
                </span>

            <div className="leading-tight">
              {/* Default Text → renders as <p> */}
              <Text
                variant="heading"
                size="sm"
                className="text-white"
              >
                {footer.brand.logoText}
              </Text>

              <Text
                size="xs"
                className="max-w-48 text-white-light"
              >
                {footer.brand.logoSubtitle}
              </Text>
            </div>
          </div>

          <a
            href={footer.brand.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube channel"
            className="mt-4 inline-flex items-center gap-2 text-white-light transition-colors hover:text-white"
          >
            <YoutubeIcon className="h-8 w-8" />

            <Text
              as="a"
              size="sm"
              className="text-white-light"
            >
              @SSSLEADERSHIP
            </Text>
          </a>
        </div>

        {/* Link columns */}
        {footer.columns.map((column) => (
          <div key={column.title}>
            <Text
              as="h3"
              variant="heading"
              size="sm"
              className="text-white"
            >
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

      <Container className="border-t border-white/15 py-4">
        <Text size="xs" className="text-white-light">
          {footer.copyright}
        </Text>
      </Container>
    </footer>
  );
}