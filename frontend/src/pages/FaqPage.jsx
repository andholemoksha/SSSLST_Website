import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/Button/button";
import { FaqList } from "@/features/faq/components/FaqList";
import { Text } from "@/components/ui/Text/text";

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
            <Text as="h2" variant="heading" size="lg">
              Shared action button patterns
            </Text>
            <Text variant="muted" size="sm">
              One component now supports regular buttons, route links, external links,
              and modal-style triggers.
            </Text>
          </div>

          <div className="space-y-6">
            <div>
              <Text as="h3" variant="label" size="sm" className="mb-3">
                Variants
              </Text>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            <div>
              <Text as="h3" variant="label" size="sm" className="mb-3">
                Route and link actions
              </Text>
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
              <Text as="h3" variant="label" size="sm" className="mb-3">
                Hero style CTA
              </Text>
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
              <Text as="h3" variant="label" size="sm" className="mb-3">
                Modal trigger
              </Text>
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
            <Text as="h3" variant="heading" size="lg">Demo modal</Text>
            <Text variant="muted" size="sm" className="mt-2">
              This confirms the shared action button can trigger a modal-style interaction
              without needing a separate component wrapper.
            </Text>
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
