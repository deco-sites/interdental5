import type { Props as SearchbarProps } from "../search/Searchbar.tsx";
import Navbar from "deco-sites/interdental/components/header/Navbar.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { Platform } from "deco-sites/interdental/apps/site.ts";

export interface Props {
  searchbar?: Omit<SearchbarProps, "platform">;
  platform?: Platform;
  logo?: { src: ImageWidget; alt: string };
  phone: number;
}

function HeaderFixed({ searchbar, platform, logo, phone }: Props) {
  return (
    <div class="bg-base-100 top-0 fixed w-full z-30">
      <Navbar
        searchbar={searchbar && { ...searchbar, platform }}
        logo={logo}
        phone={phone}
      />
    </div>
  );
}

export default HeaderFixed;
