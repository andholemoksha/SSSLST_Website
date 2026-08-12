import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { useNavTheme } from "@/components/layout/nav/NavThemeContext";
import ssslstLogo from "@/assets/logos/SSSLST.jpg";

function LogoMark() {
  return (
    <img
      src={ssslstLogo}
      alt="SSSLST logo"
      className="h-9 w-9 shrink-0 rounded object-contain"
    />
  );
}

export function NavLogo() {
  const { transparent } = useNavTheme();

  return (
    <NavLink
      to="/"
      className="flex shrink-0 items-center gap-3 max-w-[420px]"
      end
    >
      <LogoMark />

      <div className="leading-tight">
        <span
          className={cn(
            "block font-heading text-base md:text-lg font-semibold leading-tight whitespace-pre-line transition-colors",
            "text-white"
          )}
        >
          {navigation.logoText}
        </span>

        {navigation.logoSubtitle && (
          <span
            className={cn(
              "block text-xs transition-colors",
              transparent ? "text-white/75" : "text-white/75"
            )}
          >
            {navigation.logoSubtitle}
          </span>
        )}
      </div>
    </NavLink>
  );
}