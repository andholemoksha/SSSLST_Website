import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { useNavTheme } from "@/components/layout/nav/NavThemeContext";
import ssslstLogo from "@/assets/logos/SSSLST.jpg";

function LogoMark() {
  return (
    <img // TODO: consume transparent prop
      src={ssslstLogo}
      alt="SSSLST logo"
      className="h-10 w-10 shrink-0 rounded object-contain"
    />
  );
}

export function NavLogo() {
  const { transparent } = useNavTheme();

  return (
    <NavLink to="/" className="flex shrink-0 items-center gap-3" end>
      <LogoMark transparent={transparent} />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-heading text-xl font-bold transition-colors",
            transparent ? "text-white" : "text-primary"
          )}
        >
          {navigation.logoText}
        </span>
        <span
          className={cn(
            "hidden max-w-55 text-xs transition-colors sm:block",
            transparent ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {navigation.logoSubtitle}
        </span>
      </span>
    </NavLink>
  );
}
