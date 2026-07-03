import { createContext, useContext, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

export function Accordion({ className, children, ...props }) {
  const [openValue, setOpenValue] = useState(null);

  const toggle = (value) => {
    setOpenValue((current) => (current === value ? null : value));
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
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
  const { openValue, toggle } = useContext(AccordionContext);
  const value = useContext(AccordionItemContext);
  const isOpen = openValue === value;

  return (
    <button
      type="button"
      onClick={() => toggle(value)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between py-2 text-left text-sm font-medium",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown
        className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
      />
    </button>
  );
}

export function AccordionContent({ className, children, ...props }) {
  const { openValue } = useContext(AccordionContext);
  const value = useContext(AccordionItemContext);
  const isOpen = openValue === value;

  if (!isOpen) return null;

  return (
    <div className={cn("pb-2 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  );
}
