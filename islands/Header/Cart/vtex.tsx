import Component from "$store/components/header/Buttons/Cart/vtex.tsx";
import { IconProps } from "deco-sites/interdental/islands/Header/Buttons.tsx";

function Island({ icon, size }: IconProps) {
  return <Component icon={icon} size={size} />;
}

export default Island;
