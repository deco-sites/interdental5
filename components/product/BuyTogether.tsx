import { Product, ProductDetailsPage } from "apps/commerce/types.ts";
import { AppContext } from "deco-sites/interdental/apps/site.ts";
import { useOffer } from "deco-sites/interdental/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/interdental/sdk/format.ts";
import AddToCartBuyTogether from "deco-sites/interdental/islands/AddToCartBuyTogether.tsx";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

export type SkuListType = {
  id: string;
  name: string | undefined;
  image: string | null;
  price: number | null;
  seller: string | undefined;
};

interface BuyTogetherProps {
  page: ProductDetailsPage | null;
  skuList?: SkuListType[];
  totalDiscount?: number;
}

export type Props = BuyTogetherProps;

export async function loader(props: Props, ctx: AppContext) {
  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product } = props.page;
  const { offers } = product;

  const { teasers } = useOffer(offers);

  const getSkuIds = (name: string) => {
    return teasers?.find((teaser) =>
      teaser.conditions?.parameters?.some((param) => param.name === name)
    )?.conditions?.parameters?.find((param) => param.name === name)
      ?.value;
  };

  const getDiscount = (name: string) => {
    return teasers?.find((teaser) =>
      teaser.effects?.parameters?.some((param) => param.name === name)
    )?.effects?.parameters?.find((param) => param.name === name)
      ?.value;
  };

  const skuIdsList1 = getSkuIds("SkuIdsList1");
  const skuIdsList2 = getSkuIds("SkuIdsList2");
  const discountList1 = getDiscount("PercentualDiscountSkusList1");
  const discountList2 = getDiscount("PercentualDiscountSkusList2");

  const skuIdsList2Array = skuIdsList2 ? skuIdsList2.split(",") : [];

  const updatedProductIds: string[] = [skuIdsList1, ...skuIdsList2Array].filter(
    Boolean,
  ) as string[];

  if (!updatedProductIds.length) return null;

  // deno-lint-ignore no-explicit-any
  const response = await (ctx.invoke as any).vtex.loaders.intelligentSearch
    .productList({
      ids: updatedProductIds,
    });

  const validProductIds = new Set(updatedProductIds);

  const productMap: Record<string, SkuListType> = {};

  response.forEach((product: Product) => {
    const productId = product.productID;

    if (validProductIds.has(productId)) {
      productMap[productId] = {
        id: product.productID,
        name: product.name,
        price: product?.offers?.offers?.[0]?.price ?? null,
        image: product.image?.[0]?.url ?? null,
        seller: product?.offers?.offers?.[0]?.seller,
      };

      if (product.isVariantOf?.hasVariant) {
        product.isVariantOf.hasVariant.forEach((variant) => {
          const variantId = variant.productID;

          if (validProductIds.has(variantId)) {
            productMap[variantId] = {
              id: product.productID,
              name: variant.name,
              price: variant?.offers?.lowPrice ?? null,
              image: variant.image?.[0]?.url ?? null,
              seller: variant?.offers?.offers?.[0]?.seller,
            };
          }
        });
      }
    }
  });

  const skuList = Object.values(productMap);

  const totalDiscount = parseFloat(discountList1 ?? "0") +
    parseFloat(discountList2 ?? "0");

  return {
    page: response,
    skuList,
    totalDiscount,
  };
}

function BuyTogether({ skuList, totalDiscount }: Props) {
  if (skuList === null) {
    throw new Error("Missing Product Details Page Info");
  }

  return (
    <div
      class={`${
        !skuList?.length
          ? "hidden"
          : "container mx-4 lg:mx-auto w-auto mt-4 mb-8 lg:mb-20"
      }`}
      id="buy-together"
    >
      <h2 class="text-xl lg:text-[28px] text-black font-bold mb-6">
        Compre junto
      </h2>
      <div class="flex flex-col  lg:flex-row items-center">
        {skuList?.map((sku: SkuListType, index: number) => (
          <>
            <div
              class="h-[152px] w-full lg:w-[398px] bg-white py-7 px-6 mr-0 lg:mr-3 rounded-lg border-2 border-[#E4E4E4] mb-2 lg:mb-0"
              key={sku.id}
            >
              <div class="flex flex-row">
                <img
                  src={sku.image ?? ""}
                  alt={sku.name}
                  class="w-24 h-24 mr-6"
                />
                <div class="flex flex-col justify-center">
                  <p class="text-sm font-bold text-[#56565A] max-w-[300px] mb-4">
                    {sku.name}
                  </p>
                  <p class="text-base font-bold text-[#101820]">
                    {formatPrice(sku.price ?? 0)}
                  </p>
                </div>
              </div>
            </div>

            <Icon
              class={`${index === 0 ? "flex mb-2 lg:mr-4 lg:mb-0" : "hidden"}`}
              id="BuyPlus"
              size={16}
            />
            <Icon
              class={`${index === 0 ? "hidden" : "flex mb-2 lg:mr-4 lg:mb-0"}`}
              id="BuyEqual"
              size={16}
            />
          </>
        ))}
        <AddToCartBuyTogether skuList={skuList} totalDiscount={totalDiscount} />
      </div>
    </div>
  );
}

export default BuyTogether;
