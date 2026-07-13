import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";

export function HeroButtons({ ctaPrimary, ctaSecondary }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Link
        to={ctaPrimary.to}
        className={cn(buttonVariants({ variant: "heroPrimary", size: "lg" }), "rounded-full")}
      >
        {ctaPrimary.label.toUpperCase()}
        <ArrowRight className="h-4 w-4" />
      </Link>
      <Link
        to={ctaSecondary.to}
        className={cn(buttonVariants({ variant: "heroOutline", size: "lg" }), "rounded-full")}
      >
        {ctaSecondary.label.toUpperCase()}
      </Link>
    </div>
  );
}
