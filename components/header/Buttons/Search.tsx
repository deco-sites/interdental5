import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { IconProps } from "deco-sites/interdental/islands/Header/Buttons.tsx";

export default function SearchButton({
  icon = "Search",
  size = 24,
}: IconProps) {
  const { displaySearchDrawer, displaySearchPopup } = useUI();

  return (
    <>
      <Button
        class="btn-circle btn-sm btn-ghost hidden sm:block w-auto"
        aria-label="search icon button"
        onClick={() => {
          displaySearchPopup.value = !displaySearchPopup.value;
        }}
      >
        <Icon id={icon} size={size} />
      </Button>
      <Button
        class="btn-circle btn-sm btn-ghost sm:hidden w-auto"
        aria-label="search icon button"
        onClick={() => {
          displaySearchDrawer.value = !displaySearchDrawer.value;
        }}
      >
        <Icon
          id={`${displaySearchDrawer.value ? "MarkXBackgroundMobile" : icon}`}
          size={size}
        />
      </Button>
    </>
  );
}
