import Icon from "$store/components/ui/Icon.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useEffect, useState } from "preact/hooks";
import { useCart } from "apps/vtex/hooks/useCart.ts";

interface Props {
  total: number;
  target: number;
  locale: string;
  currency: string;
}

const CATEGORIES_EXCLUDED_FREE_SHIPPING = [167, 3, 4, 5, 500];

function FreeShippingProgressBar({ total, target, currency, locale }: Props) {
  const { cart } = useCart();
  const orderForm = cart.value;
  const [targetOffsetToGo, setTargetOffsetToGo] = useState<number>(
    target - total,
  );
  const [isEveryItemExcluded, setIsEveryItemExcluded] = useState<boolean>(
    false,
  );

  useEffect(() => {
    if (orderForm) {
      const includedItemsTotal = orderForm.items.reduce((prevTotal, item) => {
        const isExcludedItem = Object.keys(item.productCategories).some(
          (category) =>
            CATEGORIES_EXCLUDED_FREE_SHIPPING.includes(parseInt(category)),
        );

        if (isExcludedItem) return prevTotal;

        return prevTotal + item.sellingPrice * item.quantity;
      }, 0);

      setTargetOffsetToGo(target - includedItemsTotal);

      const hasCategoryInAllItems = orderForm.items.every((item) =>
        Object.keys(item.productCategories).some((category) =>
          CATEGORIES_EXCLUDED_FREE_SHIPPING.includes(parseInt(category))
        )
      );

      setIsEveryItemExcluded(hasCategoryInAllItems);
    }
  }, [orderForm?.items, total, target]);

  const percent = Math.floor(((target - targetOffsetToGo) / target) * 100);

  return (
    <div class="flex flex-col w-full gap-2 pt-[32px] xl:pt-0">
      {isEveryItemExcluded
        ? (
          <>
          </>
        )
        : (
          <>
            <div class="flex justify-center items-center gap-2 text-primary">
              {targetOffsetToGo > 0
                ? (
                  <div class="flex flex-col">
                    <div class="flex gap-2">
                      <Icon
                        class="w-[20%]"
                        id="Truck"
                        size={24}
                      />
                      <span class="text-[#000] text-sm font-normal mb-1">
                        Faltam{" "}
                        {formatPrice(targetOffsetToGo / 100, currency, locale)}
                        {" "}
                        para ganhar frete grátis! (Exceto toxinas, alcools e
                        soros.)
                      </span>
                    </div>
                    <progress
                      class="progress progress-primary w-full bg-[#D9D9D9]rounded-lg 
                    [&::-webkit-progress-bar]:bg-[#D9D9D9] [&::-webkit-progress-value]:bg-[#5DD4BF] [&::-moz-progress-bar]:bg-[#D9D9D9]"
                      value={percent}
                      max={100}
                    />
                  </div>
                )
                : (
                  <div class="flex flex-col w-full">
                    <div class="flex gap-2">
                      <Icon
                        class="w-[20%]"
                        id="Truck"
                        size={24}
                      />
                      <span class="text-[#000] text-sm font-normal">
                        Você conseguiu{" "}
                        <b class="font-bold text-sm text-[#000]">
                          FRETE GRÁTIS!
                        </b>
                      </span>
                    </div>
                    <progress
                      class="progress progress-primary w-full bg-[#D9D9D9]rounded-lg 
                  [&::-webkit-progress-bar]:bg-[#D9D9D9] [&::-webkit-progress-value]:bg-[#5DD4BF] [&::-moz-progress-bar]:bg-[#D9D9D9]"
                      value={100}
                      max={100}
                    />
                  </div>
                )}
            </div>
          </>
        )}
    </div>
  );
}

export default FreeShippingProgressBar;
