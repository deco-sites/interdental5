import Button from "deco-sites/interdental/components/ui/Button.tsx";
import { Signal, useSignal } from "@preact/signals";

interface Props {
  setStepActive: Signal<number>;
  customName: Signal<string>;
}

function ProductAttachmentStep1({ setStepActive, customName }: Props) {
  const errorName = useSignal(false);

  const setNameAndStep = () => {
    if (!customName.value.length) {
      return errorMessage(customName.value, errorName);
    }
    globalThis?.localStorage?.setItem("customName", customName.value);
    setStepActive.value = 1;
  };

  const errorMessage = (param: string, error: Signal<boolean>) => {
    if (!param.length) {
      error.value = true;
    } else {
      error.value = false;
    }
  };

  return (
    <>
      <span class="text-base font-medium text-[#545859]">
        Digite o que deseja gravar
      </span>
      <input
        name="name"
        class="border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-12 focus-visible:outline-none placeholder:text-black placeholder:text-opacity-50 placeholder:font-medium"
        required={true}
        minLength={1}
        maxLength={10}
        type="text"
        onChange={(e) =>
          customName.value = (e.target as HTMLSelectElement).value}
        placeholder="Insira o texto aqui"
      />
      {errorName.value
        ? (
          <span class="text-[#ff4c4c] text-xs">
            Campo Obrigatório
          </span>
        )
        : <></>}
      <Button
        onClick={() => setNameAndStep()}
        class="bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] h-12 min-h-fit rounded-lg text-white text-base font-bold w-full mb-2"
      >
        Avançar
      </Button>
      <p class="text-xs font-medium text-[#545859]">
        Atenção: Caso opte pela personalização, adicione um dia útil na entrega
        final de seu pedido. **Itens personalizados com gravação a laser não
        serão trocados por arrependimento com base no Código de Defesa do
        Consumidor (CDC).ATENTE-SE PARA NÃO ESCOLHER O ITEM EQUIVOCADAMENTE.
        Caso deseje gravar o seu logo, entre em contato com o atendimento pelo
        {"  "}<span class="underline">WhatsApp para maiores informações</span>
      </p>
    </>
  );
}

export default ProductAttachmentStep1;
