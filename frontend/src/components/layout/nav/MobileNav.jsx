import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";
import { MobileAccordionItem } from "@/components/layout/nav/MobileAccordionItem";

/**
 * Full-width slide-down mobile menu. Only one accordion section can be
 * open at a time. Closes on Escape or when a leaf link is clicked.
 */
export function MobileNav({ open, onClose }) {
  const [openSection, setOpenSection] = useState(null);

  const closeAll = () => {
    setOpenSection(null);
    onClose();
  };

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenSection(null);
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <div
      className="grid overflow-hidden border-b border-border bg-background transition-[grid-template-rows] duration-250 ease-in-out lg:hidden"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="min-h-0 overflow-hidden">
        <nav aria-label="Mobile" className="flex flex-col px-4 py-2">
          {navigation.links.map((item) => {
            const hasChildren = Boolean(item.children?.length);

            if (!hasChildren) {
              return (
                <NavLink
                  key={item.title}
                  to={item.href}
                  end={item.href === "/"}
                  onClick={closeAll}
                  className="border-b border-border py-4 text-base font-medium text-link last:border-b-0"
                >
                  {item.title}
                </NavLink>
              );
            }

            return (
              <MobileAccordionItem
                key={item.title}
                item={item}
                isOpen={openSection === item.title}
                onToggle={() =>
                  setOpenSection((current) => (current === item.title ? null : item.title))
                }
                onNavigate={closeAll}
              />
            );
          })}
        </nav>
      </div>
    </div>
  );
}
