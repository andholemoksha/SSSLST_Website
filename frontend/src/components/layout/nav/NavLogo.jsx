import { NavLink } from "react-router-dom";
import { navigation } from "@/content/navigation";
import { Text } from "@/components/ui/Text/text";
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