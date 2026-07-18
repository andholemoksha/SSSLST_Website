import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";

/**
 * Shared action button that can behave as:
 * - a regular button for local actions
 * - a route link for internal navigation
 * - an external link for outbound URLs
 * - a modal trigger when onOpenModal is provided
 *
 * Usage examples:
 * <Button>Save</Button>
 * <Button to="/about">About</Button>
 * <Button href="https://example.com" target="_blank">Visit</Button>
 * <Button variant="outline" onOpenModal={() => setOpen(true)}>Open</Button>
 * <Button textColor="text-white">White label</Button>
 */
export const Button = forwardRef(function Button(
  {
    className,
    variant = "primary",
    size,
    textColor,
    to,
    href,
    target,
    rel,
    onOpenModal,
    icon,
    iconPosition = "right",
    type = "button",
    onClick,
    disabled,
    children,
    ...props
  },
  ref
) {
  // Build the shared class list from the variant map so every usage stays consistent.
  const baseClassName = cn(buttonVariants({ variant, size }), textColor, className);
  // Render icon placement consistently for all button modes.
  const content = (
    <>
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  // Centralize click behavior so route, link, and modal-trigger use cases all work.
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    if (onOpenModal) {
      event.preventDefault();
      onOpenModal(event);
      return;
    }

    onClick?.(event);
  };

  // Prefer internal router navigation when a route is supplied.
  if (to) {
    return (
      <Link ref={ref} to={to} className={baseClassName} onClick={handleClick} {...props}>
        {content}
      </Link>
    );
  }

  // Render an anchor for external destinations.
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={baseClassName}
        onClick={handleClick}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      className={baseClassName}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
});
