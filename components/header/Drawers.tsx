import type { Props as MenuProps } from "$store/components/header/Menu.tsx";
import Cart from "$store/components/minicart/Cart.tsx";
import type { Props as SearchbarProps } from "../search/Searchbar.tsx";
import Button from "$store/components/ui/Button.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ComponentChildren, VNode } from "preact";
import { lazy, Suspense } from "preact/compat";
import DrawerUser from "deco-sites/interdental/components/header/DrawerUser.tsx";

const Menu = lazy(() => import("$store/components/header/Menu.tsx"));
const Searchbar = lazy(() => import("../search/Searchbar.tsx"));

export interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
  /**
   * @ignore_gen true
   */
  children?: ComponentChildren;
  platform: ReturnType<typeof usePlatform>;
}

const Aside = ({
  title,
  desktopTitle,
  onClose,
  children,
  customIcon,
}: {
  title: string;
  desktopTitle?: string;
  onClose?: () => void;
  children: ComponentChildren;
  customIcon?: VNode;
}) => (
  <div
    className={`ContainerDrawer flex flex-col h-full bg-[#F9F9FF] max-w-[100vw] `}
  >
    <div
      className={`MenuTitle rounded-lg flex justify-end flex-row-reverse items-center px-6 pt-6 pb-0 gap-[14px] max-w-[360px] xl:max-w-none xl:flex-row xl:justify-between }`}
    >
      <h2 class="px-0 py-3 xl:p-0">
        {desktopTitle && (
          <span class="font-bold text-[#000000] xl:block desktopTitle hidden peer ">
            {desktopTitle}
          </span>
        )}
        <span class="font-bold xl:font-medium text-2xl text-[#6562E5] peer-[.desktopTitle] xl:hidden">
          {title}
        </span>
      </h2>
      {onClose && (
        <>
          {customIcon && (
            <Button
              class="border-none bg-transparent hover:bg-transparent xl:block min-h-0 h-[20px] customIcon hidden peer"
              onClick={onClose}
            >
              {customIcon}
            </Button>
          )}

          <Button
            class="btn btn-ghost peer-[.customIcon] xl:hidden"
            onClick={onClose}
          >
            <Icon id="MarkXBackground" size={48} strokeWidth={2} />
          </Button>
        </>
      )}
    </div>
    <Suspense
      fallback={
        <div class="w-screen flex items-center justify-center">
          <span class="loading loading-ring" />
        </div>
      }
    >
      {children}
    </Suspense>
  </div>
);

function Drawers({ menu, searchbar, children, platform }: Props) {
  const { displayCart, displayMenu, displaySearchDrawer, displayUserDrawer } =
    useUI();

  return (
    <Drawer // left drawer
      open={displayMenu.value ||
        displaySearchDrawer.value ||
        displayUserDrawer.value}
      onClose={() => {
        displayMenu.value = false;
        displaySearchDrawer.value = false;
        displayUserDrawer.value = false;
      }}
      aside={
        <Aside
          onClose={() => {
            displayMenu.value = false;
            displaySearchDrawer.value = false;
            displayUserDrawer.value = false;
          }}
          title={displayMenu.value
            ? "Menu"
            : displayUserDrawer.value
            ? "Minha Conta"
            : "Buscar"}
        >
          {displayMenu.value && (
            <div className="w-screen max-w-[360px]">
              <Menu {...menu} />
            </div>
          )}
          {displayUserDrawer.value && (
            <div className="w-screen max-w-[360px] h-screen">
              <DrawerUser />
            </div>
          )}
          {searchbar && displaySearchDrawer.value && (
            <div class="w-screen border-none max-w-[360px] h-screen bg-[#F9F9FF]">
              <Searchbar {...searchbar} />
            </div>
          )}
        </Aside>
      }
    >
      <Drawer // right drawer
        class="drawer-end text-[#000] text-xl font-bold"
        open={displayCart.value !== false}
        onClose={() => (displayCart.value = false)}
        aside={
          <Aside
            title="Carrinho"
            desktopTitle="Meu carrinho"
            customIcon={
              <Icon
                id="desktopMarkX"
                size={20}
                width={20}
                height={20}
                strokeWidth={2}
              />
            }
            onClose={() => (displayCart.value = false)}
          >
            <Cart platform={platform} />
          </Aside>
        }
      >
        {children}
      </Drawer>
    </Drawer>
  );
}

export default Drawers;
