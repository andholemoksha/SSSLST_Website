import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text/text";

export function Card({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface shadow-sm transition-shadow hover:shadow-md",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return (
    <Text as="h3" variant="heading" size="lg" leading="none" className={className} {...props} />
  );
}

export function CardDescription({ className, ...props }) {
  return <Text variant="muted" size="sm" className={className} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0", className)} {...props} />;
}
