import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { AnalyticsItem } from "apps/commerce/types.ts";
import CartItem, { Item, Props as ItemProps } from "./CartItem.tsx";
import Coupon, { Props as CouponProps } from "./Coupon.tsx";
import FreeShippingProgressBar from "./FreeShippingProgressBar.tsx";

interface Props {
  items: Item[];
  loading: boolean;
  total: number;
  subtotal: number;
  discounts: number;
  locale: string;
  currency: string;
  coupon?: string;
  freeShippingTarget: number;
  checkoutHref: string;
  onAddCoupon?: CouponProps["onAddCoupon"];
  onUpdateQuantity: ItemProps["onUpdateQuantity"];
  itemToAnalyticsItem: ItemProps["itemToAnalyticsItem"];
}

function Cart({
  items,
  total,
  subtotal,
  locale,
  coupon,
  loading,
  currency,
  discounts,
  freeShippingTarget,
  checkoutHref,
  itemToAnalyticsItem,
  onUpdateQuantity,
  onAddCoupon,
}: Props) {
  const { displayCart } = useUI();
  const isEmtpy = items.length === 0;

  return (
    <div
      class="flex flex-col justify-center items-center overflow-hidden border-none h-screen bg-white"
      style={{ minWidth: "calc(min(100vw, 360px))", maxWidth: "360px" }}
    >
      {isEmtpy
        ? (
          <div class="flex flex-col max-w-[300px] rounded-lg">
            <div class="w-full flex justify-center mb-3">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.9999 58.6666C25.4727 58.6666 26.6666 57.4727 26.6666 55.9999C26.6666 54.5272 25.4727 53.3333 23.9999 53.3333C22.5272 53.3333 21.3333 54.5272 21.3333 55.9999C21.3333 57.4727 22.5272 58.6666 23.9999 58.6666Z"
                  stroke="#27239E"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M53.3334 58.6666C54.8062 58.6666 56.0001 57.4727 56.0001 55.9999C56.0001 54.5272 54.8062 53.3333 53.3334 53.3333C51.8607 53.3333 50.6667 54.5272 50.6667 55.9999C50.6667 57.4727 51.8607 58.6666 53.3334 58.6666Z"
                  stroke="#27239E"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.66675 2.66675H13.3334L20.4801 38.3734C20.7239 39.6011 21.3918 40.704 22.3669 41.4889C23.3419 42.2738 24.5619 42.6907 25.8134 42.6667H51.7334C52.9849 42.6907 54.2049 42.2738 55.18 41.4889C56.155 40.704 56.8229 39.6011 57.0667 38.3734L61.3334 16.0001H16.0001"
                  stroke="#27239E"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <span class="font-bold text-xl text-center text-[#000] max-w-[256px] m-auto">
              Desculpe, você não tem produtos aqui
            </span>
            <span class="text-sm text-center font-medium text-[#545859] mt-3 max-w-[256px] mb-8 mx-auto">
              Volte e explore para adicionar produtos no seu carrinho de
              compras.
            </span>
            <Button
              class="btn-outline rounded-lg bg-[#27239E] mx-[auto] w-full hover:border-none hover:bg-[#6562E5] text-base font-bold text-[#F9F9FF] max-w-[185px] xl:max-w-none"
              onClick={() => {
                displayCart.value = false;
              }}
            >
              Adicionar Produtos
            </Button>
          </div>
        )
        : (
          <>
            {/* Free Shipping Bar */}
            <div class="px-5 pt-0 xl:pt-6 pb-6 xl:pb-2 w-full ">
              <FreeShippingProgressBar
                total={total}
                locale={locale}
                currency={currency}
                target={freeShippingTarget}
              />
            </div>

            {/* Cart Items */}
            <ul
              role="list"
              class="mt-0 px-6 xl:px-5 flex-grow overflow-y-auto flex flex-col gap-6 xl:gap-2 w-full "
            >
              {items.map((item, index) => (
                <li key={index}>
                  <CartItem
                    item={item}
                    index={index}
                    locale={locale}
                    currency={currency}
                    onUpdateQuantity={onUpdateQuantity}
                    itemToAnalyticsItem={itemToAnalyticsItem}
                  />
                </li>
              ))}
            </ul>

            {/* Cart Footer */}
            <footer class="w-full max-h-[201px] h-[100%]">
              {/* Subtotal */}
              <div class="border-t pt-5 pb-[12px] xl:pb-0 border-base-200 flex xl:flex-col flex-col-reverse px-6">
                {discounts > 0 && (
                  <div class="flex justify-between items-center pt-5 xl:pt-5 px-6">
                    <span class="text-sm">Descontos</span>
                    <span class="text-sm">
                      {formatPrice(discounts, currency, locale)}
                    </span>
                  </div>
                )}
                <div class="w-full flex justify-between text-sm">
                  <span class="text-[#000] font-bold xl:font-normal text-base xl:text-sm">
                    Subtotal
                  </span>
                  <span class=" text-[#000] text-base font-bold">
                    {formatPrice(subtotal, currency, locale)}
                  </span>
                </div>
                {onAddCoupon && (
                  <Coupon onAddCoupon={onAddCoupon} coupon={coupon} />
                )}
              </div>

              {/* Total */}
              <div class=" flex flex-col justify-end items-end gap-3">
                <span class="text-xs flex items-center w-[100%] justify-center text-[#000] font-medium">
                  Frete e impostos calculados no checkout.
                </span>
              </div>

              <div class="p-4 pt-3 pb-5 px-6">
                <a class="inline-block w-full border-none" href={checkoutHref}>
                  <Button
                    data-deco="buy-button"
                    class="bg-[#27239E] font-bold text-base rounded-lg btn-block text-[#F9F9FF] hover:bg-[#6562E5] hover:border-none border-none"
                    disabled={loading || isEmtpy}
                    onClick={() => {
                      sendEvent({
                        name: "begin_checkout",
                        params: {
                          coupon,
                          currency,
                          value: total - discounts,
                          items: items
                            .map((_, index) => itemToAnalyticsItem(index))
                            .filter((x): x is AnalyticsItem => Boolean(x)),
                        },
                      });
                    }}
                  >
                    Finalizar compra
                  </Button>
                </a>
              </div>
            </footer>
          </>
        )}
    </div>
  );
}

export default Cart;
