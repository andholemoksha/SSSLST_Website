import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button/button";
import { FaqList } from "@/features/faq/components/FaqList";

// Example usage for the shared action button across different interactions:
// - route navigation: <Button to="/">Go home</Button>
// - external links: <Button href="https://example.com">Visit</Button>
// - modal trigger: <Button onOpenModal={() => setOpen(true)}>Open</Button>
export function FaqPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        description="Everything you need to know before joining the course."
      />

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/60 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-foreground">
              Shared action button patterns
            </h2>
            <p className="text-sm text-muted-foreground">
              One component now supports regular buttons, route links, external links,
              and modal-style triggers.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Variants
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Route and link actions
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button to="/">Go to home</Button>
                <Button to="/courses" variant="outline">
                  View courses
                </Button>
                <Button href="https://example.com" target="_blank" rel="noreferrer" variant="ghost">
                  External link
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Hero style CTA
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button to="/" variant="primary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Explore
                </Button>
                <Button to="/" variant="outline" size="lg">
                  Learn more
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Modal trigger
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onOpenModal={() => setIsModalOpen(true)}>
                  Open demo modal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl border border-border/60 bg-background p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-foreground">Demo modal</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              This confirms the shared action button can trigger a modal-style interaction
              without needing a separate component wrapper.
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Close
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>Done</Button>
            </div>
          </div>
        </div>
      ) : null}

      <FaqList />
    </>
  );
}
