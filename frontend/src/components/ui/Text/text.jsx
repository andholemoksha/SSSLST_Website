import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { textVariants } from "@/components/ui/Text/text-variants";

/**
 * Shared typography component for the application.
 *
 * Usage examples:
 * <Text as="h1" variant="heading" size="display">Welcome</Text>
 * <Text variant="body" size="base">Description</Text>
 * <Text as="h2" variant="heading" align="center">Centered heading</Text>
 * <Text variant="link" href="/courses">Browse courses</Text>
 * <Text variant="nav" size="sm">About</Text>
 */
export const Text = forwardRef(function Text(
  {
    as: Component = "p",
    className,
    variant = "body",
    size,
    weight,
    align,
    truncate,
    leading,
    color,
    children,
    ...props
  },
  ref
) {
  const baseClassName = textVariants({
    variant,
    size,
    weight,
    align,
    truncate,
    leading,
  });

  return (
    <Component ref={ref} className={cn(baseClassName, color, className)} {...props}>
      {children}
    </Component>
  );
});
