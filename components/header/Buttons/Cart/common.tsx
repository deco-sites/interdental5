import Button from "$store/components/ui/Button.tsx";
import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";

interface Props {
  icon?: AvailableIcons;
  size?: number;
  loading: boolean;
  currency: string;
  total: number;
  items: AnalyticsItem[];
}

function CartButton({
  icon = "ShoppingCart",
  size = 24,
  loading,
  currency,
  total,
  items,
}: Props) {
  const { displayCart } = useUI();
  const totalItems = items.length;

  const onClick = () => {
    sendEvent({
      name: "view_cart",
      params: { currency, value: total, items },
    });
    displayCart.value = !displayCart.value;
  };

  return (
    <div class="indicator h-8 md:h-auto">
      <Button
        class="pl-2 pr-0 lg:pl-3 md:rounded-full bg-white border-transparent md:bg-[#6562E5] md:hover:bg-[#6562E5] w-auto md:w-[70px]  lg:w-[86px] md:h-[52px] justify-start xl:gap-2.5"
        aria-label="open cart"
        data-deco={displayCart.value && "open-cart"}
        loading={loading}
        onClick={onClick}
      >
        <Icon
          id={`${displayCart.value ? "MarkXBackgroundMobile" : icon}`}
          size={size}
        />
        <span
          class={`bg-[#FFF440] text-[#27239E] absolute top-[-6px] right-[-6px] md:top-auto md:right-auto md:relative md:bg-[#9897d4] md:text-white text-sm font-bold rounded-2xl px-2 py-[2px] first-letter:${
            totalItems === 0 ? "hidden" : ""
          }`}
        >
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      </Button>
    </div>
  );
}

export default CartButton;
