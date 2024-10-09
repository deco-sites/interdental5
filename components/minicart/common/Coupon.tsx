import Button from "$store/components/ui/Button.tsx";
import { useState } from "preact/hooks";

export interface Props {
  coupon?: string;
  onAddCoupon: (text: string) => Promise<void>;
}

function Coupon({ coupon, onAddCoupon }: Props) {
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);

  return (
    <div class="flex justify-between items-center h-[auto]">
      <span class="text-sm font-normal">Cupom de desconto</span>
      {display
        ? (
          <form
            class="join flex gap-1 h-[44px] mb-[12px]"
            onSubmit={async (e) => {
              e.preventDefault();
              const { currentTarget: { elements } } = e;

              const input = elements.namedItem("coupon") as HTMLInputElement;
              const text = input.value;

              if (!text) return;

              try {
                setLoading(true);
                await onAddCoupon(text);
                setDisplay(false);
              } finally {
                setLoading(false);
              }
            }}
          >
            <input
              name="coupon"
              class="input max-w-[140px] xl:max-w-[140px] h-[44px] p-2 pr-0 rounded-lg border-[#898D8D99]  text-base font-medium focus:outline-none"
              type="text"
              value={coupon ?? ""}
              placeholder={"Cupom"}
            />
            <Button
              class=" bg-[#27239E] rounded-lg w-[44px] h-[44px] text-[#F9F9FF] font-bold text-sm min-h-0 hover:bg-[#6562E5] border-none"
              type="submit"
              htmlFor="coupon"
              loading={loading}
            >
              Ok
            </Button>
          </form>
        )
        : (
          <Button
            class="btn-ghost underline font-medium p-0 text-base hover:bg-white"
            onClick={() => setDisplay(true)}
          >
            {coupon || "Adicionar"}
          </Button>
        )}
    </div>
  );
}

export default Coupon;
