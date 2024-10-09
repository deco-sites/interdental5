import {
  Possibility,
  useVariantPossibilities,
} from "$store/sdk/useVariantPossiblities.ts";
import type { Product } from "apps/commerce/types.ts";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import { useOffer } from "deco-sites/interdental/sdk/useOffer.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useState } from "preact/hooks";

export interface Props {
  product: Product;
}

type UniquePossibility = Possibility & {
  isAvailable: boolean;
};

function ProductVariantSelector({ product }: Props) {
  const platform = "vtex";
  const hasAttachment = globalThis?.localStorage?.getItem("hasAttachment") ??
    "false";
  const customName = globalThis?.localStorage?.getItem("customName") ?? "";
  const { isVariantOf, offers } = product;
  const {
    seller = "1",
  } = useOffer(offers);
  const hasVariant = isVariantOf?.hasVariant ?? [];
  const possibilities = useVariantPossibilities(hasVariant);
  const eventItem = mapProductToAnalyticsItem({
    product,
    quantity: 1,
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const uniquePossibilities = possibilities.reduce((prev, possibility) => {
    const isAlreadyFiltered = prev.some(({ productId }) =>
      productId === possibility.productId
    );

    if (isAlreadyFiltered) return prev;

    const isAvailable = /InStock/.test(possibility.availability ?? "");

    const variantInfos = hasVariant.find((variant) =>
      variant.sku === possibility.productId
    );
    const variantSpecifications = variantInfos?.additionalProperty?.filter((
      { valueReference },
    ) => valueReference === "SPECIFICATION");
    const specificationsValues = variantSpecifications?.map(({ value }) =>
      value
    );
    const specificationsAsName = specificationsValues
      ? specificationsValues.join(" ")
      : possibility.name;

    return [
      ...prev,
      {
        ...possibility,
        name: specificationsAsName,
        isAvailable,
      },
    ];
  }, [] as UniquePossibility[]);

  const handleDecreaseQuantity = (id: string) => {
    const currentQuantity = quantities[id] ?? 1;
    const newQuantity = currentQuantity - 1;

    if (newQuantity === 0) return;

    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  const handleIncreaseQuantity = (id: string) => {
    const currentQuantity = quantities[id] ?? 1;
    const newQuantity = currentQuantity + 1;

    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  const handleManualQuantityInput = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      return setQuantities((prev) => ({ ...prev, [id]: 1 }));
    }

    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
  };

  const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const sortedProducts = uniquePossibilities.sort((a, b) => {
    return a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1;
  });

  return (
    <div class="xl:p-3 rounded-lg border-[1px] border-[#E3E3E3] bg-[#FFF]">
      <div class="p-2 pr-2 xl:pr-5 gap-2 flex flex-col overflow-y-auto max-h-[292px]">
        {sortedProducts.map(
          ({ productId, name, imageSku, price, isAvailable }) => (
            <div class="flex items-center w-full gap-4 even:bg-[#F9F9FF] h-[52px] py-2 px-1 xl:p-0">
              <div class="flex items-center w-full">
                <img
                  class="rounded-lg w-[40px] h-[40px] border-none"
                  src={imageSku}
                  alt={name}
                />
                <div class="flex items-start xl:items-center flex-col xl:flex-row w-full ml-2 xl:ml-3">
                  <div class="flex w-full max-w-[130px]">
                    <span class="text-[#545859] text-sm font-bold">
                      {name}
                    </span>
                  </div>
                  <div class="flex items-center w-full max-w-[104px]">
                    <span class="flex items-center text-[#27239E] text-sm font-bold whitespace-nowrap">
                      {currencyFormatter.format(price)}{" "}
                      <span class="hidden xl:flex text-[#545859] text-xs font-normal">
                        /cada
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {isAvailable
                ? (
                  <>
                    <div class="flex items-center gap-2">
                      <div class="flex join px-3 py-1 items-center bg-[#fff] justify-between w-[80px] xl:w-full lg:max-w-[98px] h-9 border-[1px] border-[#898d8d] border-opacity-60 mr-0 rounded-lg">
                        <button
                          onClick={() => handleDecreaseQuantity(productId)}
                          class="join-item w-4 h-5 min-h-fit border-none bg-transparent mr-2 hover:bg-transparent"
                        >
                          -
                        </button>
                        <input
                          class="flex items-center justify-center text-center w-5 h-6 join-item [appearance:textfield] bg-transparent"
                          type="number"
                          value={quantities[productId] ?? 1}
                          onChange={({ currentTarget }) =>
                            handleManualQuantityInput(
                              productId,
                              parseInt(currentTarget.value),
                            )}
                        />
                        <button
                          onClick={() => handleIncreaseQuantity(productId)}
                          class="join-item w-4 h-5 min-h-fit border-none bg-transparent ml-2 hover:bg-transparent"
                        >
                          +
                        </button>
                      </div>
                      <div class="flex w-full">
                        {platform === "vtex" && (
                          <>
                            <AddToCartButtonVTEX
                              _class={`bg-[#27239E] text-sm border-[#27239E] min-h-0 hover:bg-[#6562E5] hover:border-[#6562E5] w-full xl:w-[108px] h-9 rounded-lg p-1 xl:p-0`}
                              eventParams={{ items: [eventItem] }}
                              productID={productId}
                              seller={seller}
                              quantity={quantities[productId] ?? 1}
                              hasAttachment={hasAttachment}
                              customName={customName}
                            />
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )
                : (
                  <div class="flex items-center justify-center w-full lg:max-w-[108px]">
                    <span class="text-sm font-bold 1] text-[#0000004d] bg-[#F1F1F1] p-1 xl:p-0 h-9  rounded-lg border-[#00000033] w-full flex items-center justify-center">
                      Indisponível
                    </span>
                  </div>
                )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default ProductVariantSelector;
