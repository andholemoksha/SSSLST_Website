import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";
import { Text } from "@/components/ui/Text/text";
import ssslstLogo from "@/assets/logos/SSSLS Logo PNG.png";

function LogoMark() {
  return (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white">
      <img
        src={ssslstLogo}
        alt="SSSLST logo"
        className="h-24 w-24"
      />
    </span>
  );
}

export function NavLogo() {
  return (
    <NavLink
      to="/"
      className="flex shrink-0 items-center gap-3 max-w-[420px]"
      end
    >
      <LogoMark />

      <div className="leading-tight">
        <Text
          as="span"
          variant="heading"
          color="text-white"
          className="whitespace-pre-line leading-tight"
        >
          {navigation.logoText}
        </Text>
      </div>
    </NavLink>
  );
}