import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button from "deco-sites/interdental/components/ui/Button.tsx";
import { SkuListType } from "deco-sites/interdental/components/product/BuyTogether.tsx";
import { formatPrice } from "deco-sites/interdental/sdk/format.ts";

export interface Props {
  skuList: SkuListType[] | undefined;
  totalDiscount: number | undefined;
}

function AddToCartBuyTogether({ skuList, totalDiscount }: Props) {
  const { addItems } = useCart();

  const calculateTotalPrice = () => {
    if (skuList) {
      return skuList.reduce((total, sku) => {
        const price = sku.price || 0;
        return total + price;
      }, 0);
    }
    return 0;
  };

  const totalPrice = calculateTotalPrice();

  if (!totalDiscount) return null;
  const discountPercent = (totalDiscount / 100) * totalPrice;
  const discountWithPrice = totalPrice - discountPercent;

  const handleAddToCart = () => {
    if (skuList) {
      const orderItems = skuList.map((sku) => ({
        id: sku.id,
        seller: sku.seller || "",
        quantity: 1,
      }));

      addItems({ orderItems });
    }
  };
  return (
    <>
      <div class="h-[152px] w-full lg:w-[366px] bg-white py-3 px-6 rounded-lg border-2 border-[#E4E4E4]">
        <div class="text-center">
          <p class="text-sm font-medium text-[#56565A]">
            de {formatPrice(totalPrice)} por
          </p>
          <p class="text-xl font-bold text-black">
            {formatPrice(discountWithPrice)}
          </p>
          <p class="text-xs font-bold text-[#139347] mb-3">
            Economize {formatPrice(discountPercent)} comprando junto
          </p>
        </div>
        <Button
          onClick={() => handleAddToCart()}
          class="bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] h-12 min-h-fit rounded-lg text-white text-base font-bold w-full lg:w-[318px]"
        >
          Compre todos juntos
        </Button>
      </div>
    </>
  );
}

export default AddToCartBuyTogether;
