import { Container } from "@/components/layout/Container";

export function PageHeader({ title, description }) {
  return (
    <div className="border-b border-border bg-muted/40 py-10">
      <Container>
        <h1 className="text-3xl font-semibold text-text-h">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-text">{description}</p>
        ) : null}
      </Container>
    </div>
  );
}
