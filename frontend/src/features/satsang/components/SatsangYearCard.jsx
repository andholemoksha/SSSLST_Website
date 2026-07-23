import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/Button/button-variants";
import { cn } from "@/lib/utils";

export function SatsangYearCard({ item, className }) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <Link to={`/satsang/${item.year}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={`${item.title} placeholder`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-hero-bg/85 via-hero-bg/25 to-transparent opacity-95" />
          <div className="absolute left-4 top-4">
            <Badge className="border-transparent bg-white text-foreground shadow-sm">
              {item.year}
            </Badge>
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
              {item.year}
            </p>
            <h3 className="mt-2 text-lg font-semibold leading-none text-white">{item.title}</h3>
            <span
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "mt-5 border-white/50 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-foreground"
              )}
            >
              View Details
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </Card>
  );
}
