import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  description?: string;
  layout?: {
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large";
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  description,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = "vtex";

  if (!products || products.length === 0) {
    return null;
  }

  const hasAttachment = globalThis?.localStorage?.getItem("hasAttachment") ??
    "false";

  function Dots({ products }: Props) {
    return (
      <>
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @property --dot-progress {
              syntax: '<percentage>';
              inherits: false;
              initial-value: 0%;
            }
            `,
          }}
        />
        <ul class="carousel col-span-full z-10 row-start-4 w-auto h-6 justify-self-center mt-4 justify-center xl:justify-start bg-none xl:relative top-10">
          {products?.map((_, index) => (
            <li class="carousel-item px-2 focus:bg-black [&:not(:nth-child(5n-4))]:hidden">
              <Slider.Dot index={index}>
                <div className="hidden group-disabled:flex">
                  <Icon id={"ActiveDot"} size={16} />
                </div>
                <div className="flex group-disabled:hidden">
                  <Icon id={"Dot"} size={16} />
                </div>
              </Slider.Dot>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <div class="w-full container pb-4 pt-8 xl:pt-[48px] lg:pb-9 flex flex-col gap-5 px-[16px] xl:px-0 relative">
      <Header
        title={title || ""}
        description={description || ""}
        fontSize={layout?.headerfontSize || "Large"}
        alignment={layout?.headerAlignment || "center"}
      />

      <div
        id={id}
        class="container flex flex-col xl:grid  xl:grid-cols-[0px_1fr_48px] xl:grid-rows-[0px_1fr_53px_0fr]  xl:ml-0 xl:px-0"
      >
        <Slider class="carousel carousel-start sm:carousel-end gap-2 xl:gap-6 col-span-full row-start-2 row-end-5 justify-start">
          {products?.map((product, index) => (
            <Slider.Item
              index={index}
              class="carousel-item w-[158px] xl:w-[228px] xl:h-[416px] h-[386px] border border-black border-opacity-10 rounded-lg hover:border-[#6562E5]"
            >
              <ProductCard
                product={product}
                itemListName={title}
                layout={cardLayout}
                platform={platform}
                index={index}
                hasAttachment={hasAttachment}
              />
            </Slider.Item>
          ))}
        </Slider>

        <>
          {products.length > 1
            ? (
              <>
                <div class="absolute sm:block z-10 col-start-1 row-start-3 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] top-[39.5%] xl:top-[49.5%] xl:bottom-[238px] left-[4px] xl:-left-[36px]">
                  <Slider.PrevButton class="btn btn-circle btn-outline absolute  xl:right-1/2 bg-base-100 min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] border-black border-opacity-10 hover:bg-[#FFF000] hover:border-hidden hover:text-black">
                    <Icon
                      class="hover:text-black w-[20px]"
                      size={20}
                      id="ChevronLeft"
                      strokeWidth={3}
                    />
                  </Slider.PrevButton>
                </div>
                <div class="absolute sm:block z-10 col-start-3 row-start-3 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] top-[39.5%] xl:top-[49.5%] xl:bottom-[238px] right-0 xl:-right-[34px]">
                  <Slider.NextButton class="btn btn-circle btn-outline absolute -left-[14%] xl:left-1/2 bg-base-100 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] border-black border-opacity-10 hover:bg-[#FFF000] hover:border-hidden hover:text-black">
                    <Icon
                      class="hover:text-black"
                      size={20}
                      id="ChevronRight"
                      strokeWidth={3}
                    />
                  </Slider.NextButton>
                </div>
              </>
            )
            : <></>}
        </>

        <Dots products={products} />

        <SliderJS rootId={id} />
        <SendEventOnView
          id={id}
          event={{
            name: "view_item_list",
            params: {
              item_list_name: title,
              items: products.map((product, index) =>
                mapProductToAnalyticsItem({
                  index,
                  product,
                  ...useOffer(product.offers),
                })
              ),
            },
          }}
        />
      </div>
    </div>
  );
}

export default ProductShelf;
