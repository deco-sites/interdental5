import { Signal, useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
import Button from "$store/components/ui/Button.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useCart } from "apps/vtex/hooks/useCart.ts";
import type { SimulationOrderForm, SKU, Sla } from "apps/vtex/utils/types.ts";

export interface Props {
  items: Array<SKU>;
}

const formatShippingEstimate = (estimate: string) => {
  const [, time, type] = estimate.split(/(\d+)/);

  if (type === "bd") return `${time} dias úteis`;
  if (type === "d") return `${time} dias`;
  if (type === "h") return `${time} horas`;
};

function ShippingContent({ simulation }: {
  simulation: Signal<SimulationOrderForm | null>;
}) {
  const { cart } = useCart();

  const methods = simulation.value?.logisticsInfo?.reduce(
    (initial, { slas }) => [...initial, ...slas],
    [] as Sla[],
  ) ?? [];

  const locale = cart.value?.clientPreferencesData.locale || "pt-BR";
  const currencyCode = cart.value?.storePreferencesData.currencyCode || "BRL";

  if (simulation.value == null) {
    return null;
  }

  if (methods.length === 0) {
    return (
      <div class="p-2">
        <span>CEP inválido</span>
      </div>
    );
  }

  return (
    <ul class="flex flex-col gap-1 bg-white rounded-[4px]">
      <p class="mb-3 mt-4 text-sm font-medium text-black">Entrega</p>
      {methods.map((method) => (
        <li class="flex items-center border-base-200 ">
          <span class="text-button text-center text-[#27239E] font-bold text-sm">
            {method.name}&nbsp; &nbsp; -
          </span>
          <span class="text-[#545859] font-bold text-sm mx-2">
            até {formatShippingEstimate(method.shippingEstimate)}
          </span>
          <span class="text-[#27239E] font-bold text-sm">
            - &nbsp; &nbsp;
            {method.price === 0 ? "Grátis" : (
              formatPrice(method.price / 100, currencyCode, locale)
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ShippingSimulation({ items }: Props) {
  const postalCode = useSignal("");
  const loading = useSignal(false);
  const simulateResult = useSignal<SimulationOrderForm | null>(null);
  const { simulate, cart } = useCart();

  const handleSimulation = useCallback(async () => {
    if (postalCode.value.length !== 8) {
      return;
    }

    try {
      loading.value = true;
      simulateResult.value = await simulate({
        items: items,
        postalCode: postalCode.value,
        country: cart.value?.storePreferencesData.countryCode || "BRA",
      });
    } finally {
      loading.value = false;
    }
  }, []);

  return (
    <div class="flex flex-col px-8 pb-8 pt-5 bg-white rounded-lg border-2 border-[#E4E4E4] border-solid min-h-[204px] min-w-full lg:min-w-[564px] max-w-[564px]">
      <div class="flex flex-col mb-4">
        <span class="text-center lg:text-start text-base font-bold text-black lg:mr-44">
          Calcule o valor do frete e prazo de entrega para sua região
        </span>
      </div>

      <form
        class="join flex flex-col lg:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSimulation();
        }}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered w-full mb-3 lg:mb-0 lg:w-[329px] text-[#00000080] mr-4 rounded-lg border-[1.5px] border-[#898d8d] border-opacity-60 hover:bg-black hover:bg-opacity-5"
          placeholder="Digite seu CEP"
          value={postalCode.value}
          maxLength={8}
          size={8}
          onChange={(e: { currentTarget: { value: string } }) => {
            postalCode.value = e.currentTarget.value;
          }}
        />
        <Button
          type="submit"
          loading={loading.value}
          class="btn border-[#27239E] border-[1.5px] rounded-lg text-[#27239E] w-full lg:w-[155px] px-6 py-3 bg-white hover:border-[#27239E] hover:bg-[#DADEF5] hover:bg-opacity-60 font-bold text-base"
        >
          Calcular
        </Button>
      </form>

      <a
        class="mt-4 text-sm font-medium text-[#636466] underline"
        href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
      >
        Não sei meu CEP
      </a>

      <div>
        <div>
          <ShippingContent simulation={simulateResult} />
        </div>
      </div>
    </div>
  );
}

export default ShippingSimulation;
