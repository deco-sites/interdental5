import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function UserButton() {
  const { displayUserDrawer } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost w-auto"
      aria-label="open menu"
      onClick={() => {
        displayUserDrawer.value = !displayUserDrawer.value;
      }}
    >
      <Icon
        id={`${
          displayUserDrawer.value ? "MarkXBackgroundMobile" : "UserDrawer"
        }`}
        size={48}
      />
    </Button>
  );
}
