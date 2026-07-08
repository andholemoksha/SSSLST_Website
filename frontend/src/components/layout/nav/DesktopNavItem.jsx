import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavUnderlineLink } from "@/components/layout/nav/NavUnderlineLink";

/**
 * One top-level desktop nav item. Renders a plain underline link when it
 * has no children, or a trigger + dropdown panel when it does.
 * Dropdown opens on hover/focus and closes on mouse-leave, blur, or Escape.
 */
export function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const menuId = useId();
  const rootRef = useRef(null);

  const hasChildren = Boolean(item.children?.length);

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  if (!hasChildren) {
    return <NavUnderlineLink to={item.href}>{item.title}</NavUnderlineLink>;
  }

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 100);
  };

  const handleBlur = (event) => {
    if (!rootRef.current?.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <div
      ref={rootRef}
      className="group relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onBlur={handleBlur}
    >
      <div className="flex items-center gap-1">
        {item.href ? (
          <NavUnderlineLink to={item.href}>{item.title}</NavUnderlineLink>
        ) : (
          <span className="relative inline-flex py-2 text-sm font-medium text-primary">
            {item.title}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-accent transition-all duration-200 ease-out",
                "group-hover:w-full",
                open && "w-full"
              )}
            />
          </span>
        )}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`Toggle ${item.title} submenu`}
          onClick={() => setOpen((prev) => !prev)}
          className="rounded p-0.5 text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronDown
            className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")}
          />
        </button>
      </div>

      <div
        id={menuId}
        role="menu"
        className={cn(
          "absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-2 transition-all duration-200 ease-out",
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <div className="rounded-xl border border-border bg-background p-3 shadow-md">
          {item.children.map((child) => (
            <NavLink
              key={child.href + child.title}
              to={child.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-primary transition-colors hover:bg-muted"
            >
              {child.title}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
