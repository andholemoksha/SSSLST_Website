import { Link } from "react-router-dom";

import { useHomeContent } from "@/features/home/hooks/useHomeContent";

export function ExploreSection() {
  const { exploreSections } = useHomeContent();

  return (
    <section className="py-0">
      <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 overflow-hidden">
        {exploreSections.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="group relative h-[320px] sm:h-[420px] lg:h-[600px] overflow-hidden"
          >
            {/* Background Image */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/45 transition-all duration-500 group-hover:bg-primary/70" />

            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <h2 className="font-heading text-2xl sm:text-3xl font-semibold uppercase tracking-wide text-primary-foreground transition-all duration-500 group-hover:-translate-y-2">
                {item.title}
              </h2>

              <div className="mt-6 h-1 w-16 rounded-full bg-accent transition-all duration-500 group-hover:w-24" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}