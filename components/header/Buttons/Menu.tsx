import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost w-auto"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = !displayMenu.value;
      }}
    >
      <Icon
        id={`${displayMenu.value ? "MarkXBackgroundMobile" : "MenuDrawer"}`}
        size={48}
      />
    </Button>
  );
}
