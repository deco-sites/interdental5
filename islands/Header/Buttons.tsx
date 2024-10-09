import { default as MenuButtonComponent } from "$store/components/header/Buttons/Menu.tsx";
import { default as UserButtonComponent } from "$store/components/header/Buttons/User.tsx";
import { default as SearchButtonComponent } from "$store/components/header/Buttons/Search.tsx";
import { AvailableIcons } from "deco-sites/interdental/components/ui/Icon.tsx";

export interface IconProps {
  icon?: AvailableIcons;
  size?: number;
}

export function MenuButton() {
  return <MenuButtonComponent />;
}

export function UserButton() {
  return <UserButtonComponent />;
}

export function SearchButton({ icon, size }: IconProps) {
  return <SearchButtonComponent icon={icon} size={size} />;
}
