import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Example usage for hero-style CTAs that still support normal routing.
// <Button variant="heroPrimary" to="/courses" pill>Explore</Button>
export function HeroButtons({ ctaPrimary, ctaSecondary }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button
        to={ctaPrimary.to}
        variant="primary"
        size="lg"
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
      >
        {ctaPrimary.label.toUpperCase()}
      </Button>
      <Button to={ctaSecondary.to} variant="outline" size="lg">
        {ctaSecondary.label.toUpperCase()}
      </Button>
    </div>
  );
}
