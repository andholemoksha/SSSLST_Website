import { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export function Accordion({ className, children, allowMultiple = false, ...props }) {
  // Single-open by default (one item open at a time). With allowMultiple, any
  // number of items can be open independently.
  const [openValues, setOpenValues] = useState(() => new Set());

  const toggle = (value) => {
    setOpenValues((current) => {
      const next = new Set(allowMultiple ? current : []);
      if (current.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      return next;
    });
  };

  const isOpen = (value) => openValues.has(value);

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div className={cn("divide-y divide-border", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className, children, ...props }) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn("py-2", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children, ...props }) {
  const { isOpen, toggle } = useContext(AccordionContext);
  const value = useContext(AccordionItemContext);
  const open = isOpen(value);

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={open}
      className={cn(
        "flex w-full items-center justify-between py-2 text-left text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn("h-4 w-4 shrink-0 transition-transform", open && "rotate-180")}
      />
    </button>
  );
}

export function AccordionContent({ className, children, ...props }) {
  const { isOpen } = useContext(AccordionContext);
  const value = useContext(AccordionItemContext);
  const open = isOpen(value);

  if (!open) return null;

  return (
    <div className={cn("pb-2 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}
