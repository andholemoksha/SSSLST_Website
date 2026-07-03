import { cn } from "@/lib/utils";

export function Container({ className, ...props }) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-4", className)} {...props} />
  );
}
