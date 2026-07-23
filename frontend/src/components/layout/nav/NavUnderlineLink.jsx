import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useNavTheme } from "@/components/layout/nav/NavThemeContext";

/**
 * A nav link with the shared hover/active underline treatment:
 * a purple (link) underline that grows outward from the center.
 */
export function NavUnderlineLink({ to, children, className, onClick, ...props }) {
  const { transparent } = useNavTheme();

  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={cn(
        "group relative inline-flex py-2 text-sm font-medium outline-none transition-colors",
        transparent ? "text-white" : "text-link",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
        className
      )}
      {...props}
    >
      {(state) => (
        <>
          {typeof children === "function" ? children(state) : children}
          <span
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute -bottom-0.5 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-link transition-all duration-200 ease-out",
              "group-hover:w-full",
              state.isActive && "w-full"
            )}
          />
        </>
      )}
    </NavLink>
  );
}
