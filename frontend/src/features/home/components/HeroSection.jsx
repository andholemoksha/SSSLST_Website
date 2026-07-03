import { Link } from "react-router-dom";
import { Section } from "@/components/layout/Section";
import { buttonVariants } from "@/components/ui/button-variants";
import { useHomeContent } from "@/features/home/hooks/useHomeContent";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const { hero } = useHomeContent();

  return (
    <Section className="text-center">
      <h1 className="text-4xl font-semibold text-text-h sm:text-5xl">
        {hero.heading}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-text">{hero.subheading}</p>
      <Link to={hero.ctaTo} className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
        {hero.ctaLabel}
      </Link>
    </Section>
  );
}
