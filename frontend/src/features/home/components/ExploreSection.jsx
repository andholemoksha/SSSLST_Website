import { Link } from "react-router-dom";

import { useHomeContent } from "@/features/home/hooks/useHomeContent";
import { Text } from "@/components/ui/Text/text";
import { colors } from "@/components/ui/palette";

export function ExploreSection() {
  const { exploreSections } = useHomeContent();

  const hoverOverlay = `linear-gradient(
    135deg,
    ${colors.primary[0]}CC,
    ${colors.primary[3]}B3,
    ${colors.secondary[1]}99,
    ${colors.secondary[3]}80
  )`;

  return (
    <section className="py-0">
      <div className="grid w-full grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-5">
        {exploreSections.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="group relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[600px]"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Base Dark Overlay */}
            <div className="absolute inset-0 bg-black/45 transition-all duration-500 group-hover:bg-black/20" />

            {/* Brand Gradient Hover Overlay */}
            <div
              className="absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100"
              style={{
                background: hoverOverlay,
              }}
            />

            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <Text
                as="h2"
                variant="heading"
                size="2xl"
                color="text-primary-foreground"
                className="font-heading uppercase tracking-wide transition-all duration-500 group-hover:-translate-y-2 sm:text-3xl"
              >
                {item.title}
              </Text>

              <div className="mt-6 h-1 w-16 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}