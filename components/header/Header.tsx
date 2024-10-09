import type { Props as SearchbarProps } from "../search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type {
  BreadcrumbList,
  ProductListingPage,
  SiteNavigationElement,
} from "apps/commerce/types.ts";
import Navbar from "./Navbar.tsx";
import TopBar, {
  TopBarItem,
} from "deco-sites/interdental/components/header/TopBar.tsx";
import Link, { LinkItem } from "deco-sites/interdental/components/ui/Link.tsx";

import { Category } from "apps/commerce/types.ts";
import TabItem from "deco-sites/interdental/islands/TabItem.tsx";
import { TabItemType } from "deco-sites/interdental/components/header/TabItem.tsx";
import NavItem from "deco-sites/interdental/islands/Header/NavItem.tsx";
import DropdownMenu from "deco-sites/interdental/islands/Dropdown.tsx";
import Breadcrumb from "deco-sites/interdental/components/ui/Breadcrumb.tsx";
import HeaderFixed from "deco-sites/interdental/islands/Header/HeaderFixed.tsx";
import { useEffect, useState } from "preact/hooks";

export interface Props {
  url: string;
  topBar?: TopBarItem;
  tabItems?: TabItemType[];
  links?: Array<LinkItem>;

  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;
  /**
   * @title Choose Which Department will be render
   * @description based on Url
   */
  renderDepartment: string[];

  /** @title Logo */
  logo?: { src: ImageWidget; alt: string };
  categories: Category | Category[];
  page: ProductListingPage | null;
  breadcrumb: BreadcrumbList;
  activeBreadcrumb?: boolean;
  phone: number;
}

export const loader = (props: Props, req: Request) => {
  const url = new URL(req.url);
  const searchParams = url.searchParams.get("q");
  const formatName = (name: string) => {
    const formattedName = name.replaceAll("-", " ");
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  let breadcrumb = {};
  if (searchParams) {
    breadcrumb = {
      itemListElement: [
        {
          "@type": "ListItem",
          position: 2,
          name: searchParams,
          item: url.pathname,
        },
      ],
    };
  } else {
    breadcrumb = {
      itemListElement: [
        ...url.pathname
          .split("/")
          .filter((item) => item)
          .map((item, index) => {
            const name = formatName(item);
            return {
              "@type": "ListItem",
              position: index + 2,
              name,
              item: url.pathname
                .split("/")
                .slice(0, index + 2)
                .join("/"),
            };
          }),
      ],
    };
  }

  return {
    ...props,
    breadcrumb,
  };
};

function Header({
  topBar,
  tabItems,
  links,
  searchbar,
  navItems,
  renderDepartment,
  logo,
  url,
  categories,
  breadcrumb,
  phone,
}: Props) {
  const platform = "vtex";
  const items = navItems ?? [];

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(globalThis.scrollY);
    };

    globalThis.addEventListener("scroll", handleScroll);

    return () => {
      globalThis.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header class={`h-[140px] xl:h-full`}>
        <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
          <div
            class={`
          ${scrollY === 0 ? "flex flex-col" : "hidden"}
          bg-base-100 w-full z-5`}
          >
            <TopBar topBar={topBar} />
            <div className="flex flex-row justify-center xl:justify-between bg-[#E2E2E7] sm:px-4 xl:px-0">
              <div class="container flex justify-center xl:justify-between md:px-[16px] xl:px-0">
                <TabItem tabItems={tabItems} />
                <div class="hidden xl:flex">
                  <Link links={links} />
                </div>
              </div>
            </div>
            <Navbar
              searchbar={searchbar && { ...searchbar, platform }}
              logo={logo}
              phone={phone}
            />
            <div class="hidden xl:flex relative bg-white">
              <div className="container hidden xl:flex  xl:h-12 xl:items-center">
                <DropdownMenu categories={categories} />
                <div class="flex-auto flex ml-56">
                  {items.map((item) => (
                    <NavItem
                      item={item}
                      renderDepartment={renderDepartment}
                    />
                  ))}
                </div>
                <div class="hidden xl:flex">
                  <a
                    class="w-full flex gap-2"
                    target="_blank"
                    href={url}
                  >
                    <img
                      src="/image/whatsapp-icon.svg"
                      alt={"icon-plus"}
                      width={32}
                      height={32}
                      class="flex"
                    />
                    <div class="flex flex-col">
                      <span class="flex text-[#27239E] text-sm font-black">
                        Atendimento
                      </span>
                      <span class="flex text-[#27239E] text-xs font-medium">
                        {phone}
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-b-[1px] border-[#E6E7EB]">
              {breadcrumb.itemListElement?.length > 0 && (
                <div class="container">
                  <Breadcrumb
                    itemListElement={breadcrumb?.itemListElement}
                  />
                </div>
              )}
            </div>
          </div>
          <div
            class={`${scrollY === 0 ? "hidden" : "flex "}`}
          >
            <HeaderFixed
              phone={phone}
              searchbar={searchbar}
              platform={platform}
              logo={logo}
            />
          </div>
        </Drawers>
      </header>
    </>
  );
}

export default Header;
