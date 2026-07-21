import { useId } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One expandable section of the mobile menu. Height animates smoothly via
 * a CSS grid-rows transition (no JS height measuring needed).
 */
export function MobileAccordionItem({ item, isOpen, onToggle, onNavigate }) {
  const panelId = useId();

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-link outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {item.title}
        <ChevronDown
          className={cn("h-5 w-5 transition-transform duration-200", isOpen && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 pb-3 pl-3">
            {item.children.map((child) => (
              <NavLink
                key={child.href + child.title}
                to={child.href}
                onClick={onNavigate}
                className="rounded-lg px-3 py-2 text-sm text-link transition-colors hover:bg-muted"
              >
                {child.title}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
