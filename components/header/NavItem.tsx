import type { SiteNavigationElement } from "apps/commerce/types.ts";
import { ImageWidget } from "apps/admin/widgets.ts";
import { useState } from "preact/hooks";

interface Props {
  item: SiteNavigationElement;
  /**
   * @title Choose Which Department will be render
   * @description based on Url
   */
  image?: ImageWidget;
  renderDepartment: string[];
}

function NavItem({ item, image, renderDepartment }: Props) {
  const { url, name, children } = item;
  const shouldRender = renderDepartment.includes(url ?? "");
  const [isOverlayVisible, setOverlayVisibility] = useState(false);

  const maxRenderedItems = 26;
  const visibleChildren = children && children.slice(0, maxRenderedItems);
  const hasMoreItems = children && children.length > maxRenderedItems;

  const handleMouseEnterOverlay = () => {
    setOverlayVisibility(true);
  };

  const handleMouseLeaveOverlay = () => {
    setOverlayVisibility(false);
  };

  return (
    <>
      {shouldRender && (
        <li
          onMouseEnter={handleMouseLeaveOverlay}
          class="group flex items-center hover:bg-[#E2E2E7] transition duration-400 hover:no-underline"
          key={url}
        >
          <a href={url} class="px-4 py-3">
            <span class="group-hover:no-underline text-base font-medium text-black">
              {name}
            </span>
          </a>
          {visibleChildren && visibleChildren.length > 0 && !isOverlayVisible &&
            (
              <div class="">
                <div
                  class="fixed hidden hover:flex group-hover:flex inset-0 bg-black bg-opacity-50 z-10 top-[224px]"
                  onMouseEnter={handleMouseEnterOverlay}
                  onMouseLeave={handleMouseLeaveOverlay}
                >
                </div>

                <div
                  class="absolute hidden hover:flex group-hover:flex bg-base-100 z-50 justify-between w-screen h-[432px]  pt-12 pb-9 border-t border-base-200"
                  style={{ top: "48px", left: "0px" }}
                >
                  <div class="container flex justify-between items-center">
                    <ul class="flex flex-col items-start justify-between flex-wrap text-base max-h-full">
                      {visibleChildren.map((node) => (
                        <li class="mb-3 mr-6 w-[274px]" key={node.url}>
                          <a class="hover:underline" href={node.url}>
                            <span class="text-base font-medium text-[#545859]">
                              {node.name}
                            </span>
                          </a>
                        </li>
                      ))}
                      {hasMoreItems && (
                        <li class="mb-3 mr-6">
                          <a href={url} class="underline">
                            <span class="text-base font-bold">ver tudo</span>
                          </a>
                        </li>
                      )}
                    </ul>
                    <img
                      class="flex"
                      src={image ?? "/image/minibanner-menu.png"}
                      alt={"banner-menu"}
                    />
                  </div>
                </div>
              </div>
            )}
        </li>
      )}
    </>
  );
}

export default NavItem;
