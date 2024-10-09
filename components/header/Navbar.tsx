import type { Props as SearchbarProps } from "../search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import {
  MenuButton,
  SearchButton,
  UserButton,
} from "$store/islands/Header/Buttons.tsx";
import CartButtonVTEX from "$store/islands/Header/Cart/vtex.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import Image from "apps/website/components/Image.tsx";
import { navbarHeight } from "./constants.ts";
import WhatsApp from "deco-sites/interdental/components/ui/WhatsApp.tsx";
import Login from "deco-sites/interdental/islands/Header/Login.tsx";

function Navbar({
  searchbar,
  logo,
  phone,
}: {
  searchbar?: SearchbarProps;
  logo?: { src: string; alt: string };
  phone?: number;
}) {
  const platform = "vtex";

  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-[#b7b5e875] py-3  w-full"
      >
        <div class="flex pl-4 pr-6 gap-2 justify-between items-center w-full">
          <SearchButton />

          {logo && (
            <a
              href="/"
              class="flex-grow inline-flex items-center justify-center mr-[2rem] xl:mr-8"
              style={{ minHeight: navbarHeight }}
              aria-label="Store logo"
            >
              <Image src={logo.src} alt={logo.alt} width={108} height={32} />
            </a>
          )}
        </div>
      </div>

      <div class="fixed bottom-0 w-full bg-white md:hidden flex h-[88px] items-center justify-center z-50">
        <div className="flex flex-col w-[66px]">
          <MenuButton />
          <span class="text-[11px] font-bold leading-4 text-center tracking-[-0.1px] text-[#27239E] mt-5">
            Menu
          </span>
        </div>
        <div className="flex flex-col w-[66px]">
          <UserButton />
          <span class="text-[11px] font-bold leading-4 text-center tracking-[-0.1px] text-[#27239E] mt-5">
            Minha Conta
          </span>
        </div>
        <div className="flex flex-col w-[66px]">
          <SearchButton icon={"SearchDrawer"} size={48} />
          <span class="text-[11px] font-bold leading-4 text-center tracking-[-0.1px] text-[#27239E] mt-5">
            Buscar
          </span>
        </div>
        <div className="flex flex-col w-[66px]">
          <WhatsApp phone={phone} icon={"WhatsAppDrawer"} size={48} />
          <span class="text-[11px] font-bold leading-4 text-center tracking-[-0.1px] text-[#27239E] mt-5">
            Ajuda
          </span>
        </div>
        <div className="flex flex-col w-[66px]">
          {platform === "vtex" && (
            <CartButtonVTEX icon={"CartDrawer"} size={48} />
          )}
          <span class="text-[11px] font-bold leading-4 text-center tracking-[-0.1px] text-[#27239E] mt-5">
            Carrinho
          </span>
        </div>
      </div>

      {/* Desktop Version */}
      <div class="md:justify-between hidden md:flex flex-row  items-center border-b border-base-200 
      w-full h-20 px-0 md:gap-[8px] lg:gap-0 md:px-[16px] xl:px-0 xl:h-[96px]">
        <div class="container md:justify-between hidden md:flex flex-row  items-center  w-full h-20 px-0 md:gap-[8px] lg:gap-0 md:px-0 xl:px-0 xl:h-[96px]">
          <div class="flex-none w-auto h-12 md:w-[136px] xl:w-auto xl:mt-[12px] xl:mr-[36px]">
            {logo && (
              <a
                href="/"
                aria-label="Store logo"
                class="block px-1 xl:p-0 w-auto"
              >
                <Image src={logo.src} alt={logo.alt} width={149} height={45} />
              </a>
            )}
          </div>
          <div class="w-auto flex justify-start">
            <Searchbar searchbar={searchbar} />
          </div>
          <div class="flex-none w-auto flex items-center justify-start ">
          </div>
          <div class="w-auto xl:w-full xl:max-w-[380px] flex justify-between items-center">
            <Login />
            <a
              class="btn btn-circle btn-sm btn-ghost md:mr-[10px] md:ml-[26px] lg:mr-[26px] lg:ml-[40px] hover:bg-transparent"
              href="/wishlist"
              aria-label="Wishlist"
            >
              <Icon id="Heart" size={24} strokeWidth={2} fill="none" />
            </a>
            {platform === "vtex" && <CartButtonVTEX />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
