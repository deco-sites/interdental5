import type { Platform } from "$store/apps/site.ts";
import { SendEventOnClick } from "$store/components/Analytics.tsx";
import Avatar from "$store/components/ui/Avatar.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { useVariantPossibilities } from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";
import ProductFlag, {
  ProductFlags,
} from "deco-sites/interdental/components/product/ProductFlag.tsx";
import AddToCartShelfButton from "deco-sites/interdental/components/product/AddToCartShelfButton.tsx";

export interface Layout {
  basics?: {
    contentAlignment?: "Left" | "Center";
    oldPriceSize?: "Small" | "Normal";
    ctaText?: string;
  };
  elementsPositions?: {
    skuSelector?: "Top" | "Bottom";
    favoriteIcon?: "Top right" | "Top left";
  };
  hide?: {
    productName?: boolean;
    productDescription?: boolean;
    allPrices?: boolean;
    installments?: boolean;
    skuSelector?: boolean;
    cta?: boolean;
  };
  onMouseOver?: {
    image?: "Change image" | "Zoom image";
    card?: "None" | "Move up";
    showFavoriteIcon?: boolean;
    showSkuSelector?: boolean;
    showCardShadow?: boolean;
    showCta?: boolean;
  };
  /** @description Edite as cores de flags de promoção em ordem de exibição */
  productFlags?: ProductFlags[];
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  platform?: Platform;
  hasAttachment?: string;
}

const discountPercent = (
  listPrice: number | undefined,
  price: number | undefined,
) => {
  if (!listPrice || !price) return;
  const discount = listPrice - price;
  const percent = (discount / listPrice) * 100;
  return percent.toFixed(0);
};

const WIDTH = 164;
const HEIGHT = 164;

function ProductCard({
  product,
  preload,
  itemListName,
  layout,
  platform,
  index,
}: Props) {
  const {
    url,
    productID,
    name,
    image: images,
    offers,
    isVariantOf,
  } = product;
  const id = `product-card-${productID}`;
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const productGroupID = isVariantOf?.productGroupID;
  const description = product.description || isVariantOf?.description;
  const [front, back] = images ?? [];
  const { listPrice, price, installments, teasers } = useOffer(offers);
  const possibilities = useVariantPossibilities(hasVariant);
  const variants = Object.entries(Object.values(possibilities)[0] ?? {});

  const l = layout;
  const align =
    !l?.basics?.contentAlignment || l?.basics?.contentAlignment == "Left"
      ? "left"
      : "center";
  const skuSelector = variants.map(([value, link]) => (
    <li>
      <a href={link}>
        <Avatar
          variant={link === url ? "active" : link ? "default" : "disabled"}
          content={value}
        />
      </a>
    </li>
  ));

  const relative = (url: string) => {
    const link = new URL(url);
    return `${link.pathname}${link.search}`;
  };

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block bg-[#27239E] hover:bg-[#6562E5] hover:border-none rounded-lg text-[#F9F9FF] text-base capitalize lg:!min-h-[40px] !max-h-10"
    >
      {l?.basics?.ctaText || "Adicionar"}
    </a>
  );

  return (
    <div
      id={id}
      class={`card card-compact group w-full ${
        align === "center" ? "text-center" : "text-start"
      } ${l?.onMouseOver?.showCardShadow ? "lg:hover:card-bordered" : ""}
        ${
        l?.onMouseOver?.card === "Move up" &&
        "duration-500 transition-translate ease-in-out lg:hover:-translate-y-2"
      }
      `}
      data-deco="view-product"
    >
      <SendEventOnClick
        id={id}
        event={{
          name: "select_item" as const,
          params: {
            item_list_name: itemListName,
            items: [
              mapProductToAnalyticsItem({
                product,
                price,
                listPrice,
                index,
              }),
            ],
          },
        }}
      />
      <figure class="relative overflow-hidden h-auto lg:h-[246px] xl:px-3 xl:pt-3 bg-white rounded-lg">
        {/* Wishlist button */}
        <div
          class={`absolute top-2 z-10
          ${
            l?.elementsPositions?.favoriteIcon === "Top left"
              ? "left-2"
              : "right-2"
          }
          ${
            l?.onMouseOver?.showFavoriteIcon
              ? "hidden lg:group-hover:block"
              : "hidden"
          }
        `}
        >
          {platform === "vtex" && (
            <WishlistButton
              productGroupID={productGroupID}
              productID={productID}
            />
          )}
        </div>
        {/* Product Images */}
        <a
          href={url && relative(url)}
          aria-label="view product"
          class="grid grid-cols-1 grid-rows-1 justify-items-center w-full h-full rounded-lg relative"
        >
          <div class="flex flex-wrap w-full justify-center items-center absolute z-[1] top-0 left-0 px-[10px] pt-3 lg:p-0">
            {teasers?.map((teaser, index: number) => (
              <>
                <ProductFlag
                  key={index}
                  flagBgColor={l?.productFlags?.[index]?.flagBgColor}
                  flagTextColor={l?.productFlags?.[index]?.flagTextColor}
                  promoName={teaser.name}
                />
              </>
            ))}
          </div>

          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            class={`bg-base-100 col-span-full row-span-full w-[112px] h-[112px] xl:w-[164px] xl:h-[164px] rounded-lg ${
              l?.onMouseOver?.image == "Zoom image"
                ? "duration-100 transition-scale scale-100 lg:group-hover:scale-125 w-[164px] h-[164px]"
                : ""
            }`}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          {(!l?.onMouseOver?.image ||
            l?.onMouseOver?.image == "Change image") && (
            <Image
              src={back?.url ?? front.url!}
              alt={back?.alternateName ?? front.alternateName}
              width={WIDTH}
              height={HEIGHT}
              class="bg-base-100 col-span-full row-span-full transition-opacity opacity-0 lg:group-hover:opacity-100 w-[112px] h-[112px] xl:w-[164px] xl:h-[164px] rounded-lg"
              loading="lazy"
              decoding="async"
            />
          )}
        </a>
        <figcaption
          class={`
          absolute bottom-1 left-0 w-full flex flex-col gap-3 p-2 ${
            l?.onMouseOver?.showSkuSelector || l?.onMouseOver?.showCta
              ? "transition-opacity opacity-0 lg:group-hover:opacity-100"
              : "hidden"
          }`}
        >
          {/* SKU Selector */}
          {l?.onMouseOver?.showSkuSelector && (
            <ul class="flex justify-center items-center gap-2 w-full">
              {skuSelector}
            </ul>
          )}
          {l?.onMouseOver?.showCta && cta}
        </figcaption>
      </figure>
      {/* Prices & Name */}
      <div class="flex-auto flex flex-col p-3 lg:p-4 pt-0 lg:gap-0 lg:pt-0 bg-white rounded-lg">
        {/* SKU Selector */}
        {(!l?.elementsPositions?.skuSelector ||
          l?.elementsPositions?.skuSelector === "Top") && (
          <>
            {l?.hide?.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={` items-center gap-2 w-full overflow-auto p-3 hidden ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )}

        {l?.hide?.productName && l?.hide?.productDescription
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-0">
              {l?.hide?.productName
                ? (
                  ""
                )
                : (
                  <h3
                    class="text-center text-xs lg:text-sm mb-3 text-black font-medium xl:font-bold overflow-ellipsis line-clamp-2 lg:mb-2"
                    dangerouslySetInnerHTML={{ __html: name ?? "" }}
                  />
                )}
              {l?.hide?.productDescription
                ? (
                  ""
                )
                : (
                  <div
                    class="truncate text-sm lg:text-sm text-neutral"
                    dangerouslySetInnerHTML={{ __html: description ?? "" }}
                  />
                )}
            </div>
          )}
        {l?.hide?.allPrices
          ? (
            ""
          )
          : (
            <div class="flex flex-col gap-2 text-center">
              <div
                class={`flex flex-col gap-0 ${
                  l?.basics?.oldPriceSize === "Normal"
                    ? "lg:flex-row lg:gap-2"
                    : ""
                } ${align === "center" ? "justify-center" : "justify-start"}`}
              >
                <div
                  class={`hidden justify-center xl:flex line-through text-black text-xs font-bold text-opacity-60 ${
                    l?.basics?.oldPriceSize === "Normal" ? "lg:text-xl" : ""
                  }`}
                >
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </div>
                <div className="flex flex-row items-center justify-center">
                  <div class="text-base xl:text-xl font-bold text-[#27239E]">
                    {formatPrice(price, offers?.priceCurrency)}
                  </div>
                  {!listPrice || !price || listPrice === price
                    ? null
                    : (
                      <div class="flex items-center ml-2 bg-[#B6EFB1] w-12 h-5 text-xs font-bold text-[#103630] rounded px-1 py-[2px]">
                        <Icon id="DiscountBadge" size={12} />
                        <div className="ml-1">
                          {discountPercent(listPrice, price)}%
                        </div>
                      </div>
                    )}
                </div>
                <div class="text-sm font-medium text-black text-opacity-60 flex justify-center">
                  ou à vista com 5% Off
                </div>
              </div>
              {l?.hide?.installments
                ? (
                  ""
                )
                : (
                  <div className="flex lg:flex-row items-center justify-center lg:mb-3 flex-col">
                    <Icon id="Card" size={20} class="hidden lg:flex" />
                    <div class="text-xs font-medium text-black text-opacity-60 w-[100%]   lg:w-[74%] text-center lg:text-left lg:ml-2 max-w-[125px]">
                      em até{" "}
                      <span class="font-bold text-opacity-100 text-black">
                        {installments}
                      </span>
                    </div>
                  </div>
                )}
            </div>
          )}

        {/* SKU Selector */}
        {l?.elementsPositions?.skuSelector === "Bottom" && (
          <>
            {l?.hide?.skuSelector
              ? (
                ""
              )
              : (
                <ul
                  class={`flex items-center gap-2 w-full ${
                    align === "center" ? "justify-center" : "justify-start"
                  } ${l?.onMouseOver?.showSkuSelector ? "lg:hidden" : ""}`}
                >
                  {skuSelector}
                </ul>
              )}
          </>
        )}
        <div class="text-center text-xs mt-[18px] lg:mt-0 font-extrabold text-[#6562E5] lg:mb-2">
          Disponível em {hasVariant.length} opções
        </div>
        <div
          class={`lg:flex-auto flex items-end mt-3 lg:mt-0`}
        >
          <AddToCartShelfButton
            product={product}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
