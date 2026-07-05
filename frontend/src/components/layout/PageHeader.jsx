import { Container } from "@/components/layout/Container";

export function PageHeader({ title, description }) {
  return (
    <div className="border-b border-border bg-muted/40 py-10">
      <Container>
        <h1 className="text-3xl md:text-4xl lg:text-5xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        ) : null}
      </Container>
    </div>
  );
}
