import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import QuantitySelector from "./QuantityStepper.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useCallback, useState } from "preact/hooks";

export interface Item {
  image: {
    src: string;
    alt: string;
  };
  name: string;
  quantity: number;
  price: {
    sale: number;
    list: number;
  };
}

export interface Props {
  item: Item;
  index: number;

  locale: string;
  currency: string;

  onUpdateQuantity: (quantity: number, index: number) => Promise<void>;
  itemToAnalyticsItem: (index: number) => AnalyticsItem | null | undefined;
}

function CartItem(
  {
    item,
    index,
    locale,
    currency,
    onUpdateQuantity,
    itemToAnalyticsItem,
  }: Props,
) {
  const { image, name, price: { sale, list }, quantity } = item;
  const isGift = sale < 0.01;
  const [loading, setLoading] = useState(false);

  const withLoading = useCallback(
    <A,>(cb: (args: A) => Promise<void>) => async (e: A) => {
      try {
        setLoading(true);
        await cb(e);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return (
    <div
      class="flex items-center xl:grid xl:grid-rows-1 gap-5 xl:gap-4 px-4 xl:p-4 max-h-[96px] xl:max-h-[132px] xl:max-w-[312px]"
      style={{
        gridTemplateColumns: "auto 1fr",
      }}
    >
      <Image
        src={image.src.replace("55-55", "100-100")}
        alt={image.alt}
        style={{ aspectRatio: "100 / 100" }}
        width={100}
        height={100}
        class="h-full object-contain max-h-[72px] max-w-[72px] xl:max-w-[100px] xl:max-h-[100px]"
      />

      <div class="flex flex-col gap-2 max-w-[176px]">
        <div class="flex justify-between items-center">
          <div class="w-[148px] h-[40px]">
            <span class="text-[#000] font-medium text-sm line-clamp-2 mr-2">
              {name}
            </span>
          </div>
          <Button
            disabled={loading || isGift}
            loading={loading}
            class="!bg-transparent border-none hover:bg-transparent"
            onClick={withLoading(async () => {
              const analyticsItem = itemToAnalyticsItem(index);

              await onUpdateQuantity(0, index);

              analyticsItem && sendEvent({
                name: "remove_from_cart",
                params: { items: [analyticsItem] },
              });
            })}
          >
            <Icon id="Trash" size={20} />
          </Button>
        </div>
        <div>
          <div class="flex items-center justify-between gap-2">
            <QuantitySelector
              disabled={loading || isGift}
              quantity={quantity}
              onChange={withLoading(async (quantity) => {
                const analyticsItem = itemToAnalyticsItem(index);
                const diff = quantity - item.quantity;

                await onUpdateQuantity(quantity, index);

                if (analyticsItem) {
                  sendEvent({
                    name: diff < 0 ? "remove_from_cart" : "add_to_cart",
                    params: {
                      items: [{ ...analyticsItem, quantity: Math.abs(diff) }],
                    },
                  });
                }
              })}
            />
            <div class="flex flex-col">
              {list !== sale
                ? (
                  <span class="line-through text-[#545859] font-medium text-sm">
                    {formatPrice(list, currency, locale)}
                  </span>
                )
                : <></>}

              <span class="text-sm text-[#000] font-bold">
                {isGift ? "Grátis" : formatPrice(sale, currency, locale)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
