import { Button } from "@/components/ui/Button/button";
import { ArrowRight } from "lucide-react";
import { useAdmissions } from "@/features/admissions/hooks/useAdmissions";

// Purple-to-pink brand gradient (the site's --gradient-purple-to-pink token).
const APPLY_GRADIENT = "border-0 text-white shadow-lg hover:text-white";
const APPLY_GRADIENT_STYLE = { backgroundImage: "var(--gradient-purple-to-pink)" };

// Dark-to-light red gradient for the "Watch Video" (YouTube) button.
const WATCH_GRADIENT = "border-0 text-white shadow-lg hover:text-white";
const WATCH_GRADIENT_STYLE = {
  backgroundImage: "linear-gradient(90deg, #8B0000, #FF4D4D)",
};

// Example usage for hero-style CTAs that still support normal routing.
// <Button variant="heroPrimary" to="/courses" pill>Explore</Button>
export function HeroButtons({ ctaPrimary, ctaSecondary, youtube }) {
  const { data: admissions } = useAdmissions();
  // Admissions being active (with an apply link set) is the single switch for
  // the secondary CTAs: applyUrl drives the "Apply" button and gates "Watch
  // Video" too, so both appear together when it's on and only "Explore" remains
  // when it's off.
  const applyUrl = admissions?.is_active ? admissions.apply_url : null;
  const watchIsLive = youtube?.url && youtube.url !== "#";

  return (
    <div className="flex flex-row flex-nowrap items-center gap-2 sm:gap-4">
      <Button
        to={ctaPrimary.to}
        variant="primary"
        size="lg"
        icon={<ArrowRight className="h-4 w-4" />}
        iconPosition="right"
      >
        {ctaPrimary.label.toUpperCase()}
      </Button>

      {ctaSecondary && (
        <Button to={ctaSecondary.to} variant="outline" size="lg">
          {ctaSecondary.label.toUpperCase()}
        </Button>
      )}

      {applyUrl && youtube && (
        <Button
          href={youtube.url}
          target={watchIsLive ? "_blank" : undefined}
          rel={watchIsLive ? "noopener noreferrer" : undefined}
          variant="primary"
          size="lg"
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
          className={WATCH_GRADIENT}
          style={WATCH_GRADIENT_STYLE}
        >
          WATCH VIDEO
        </Button>
      )}

      {applyUrl && (
        <Button
          href={applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          icon={<ArrowRight className="h-4 w-4" />}
          iconPosition="right"
          className={APPLY_GRADIENT}
          style={APPLY_GRADIENT_STYLE}
        >
          APPLY
        </Button>
      )}
    </div>
  );
}
