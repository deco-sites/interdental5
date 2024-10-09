import Button from "deco-sites/interdental/components/ui/Button.tsx";
import { Signal } from "@preact/signals";
import RadioOption from "deco-sites/interdental/components/ui/RadioOption.tsx";

interface Props {
  setStepActive: Signal<number>;
}

function ProductAttachmentStep2({ setStepActive }: Props) {
  return (
    <>
      <span class="text-base font-medium text-[#545859]">
        Selecione uma opção
      </span>
      <RadioOption optionName="Gravar somente esta peça" />
      <RadioOption optionName="Salvar para as próximas peças" />
      <Button
        onClick={() => setStepActive.value = 2}
        class="bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] h-12 min-h-fit rounded-lg text-white text-base font-bold w-full mb-2"
      >
        Gravar
      </Button>
      <p class="text-xs font-medium text-[#545859]">
        Atenção: Caso opte pela personalização, adicione um dia útil na entrega
        final de seu pedido. **Itens personalizados com gravação a laser não
        serão trocados por arrependimento com base no Código de Defesa do
        Consumidor (CDC).ATENTE-SE PARA NÃO ESCOLHER O ITEM EQUIVOCADAMENTE.
        Caso deseje gravar o seu logo, entre em contato com o atendimento pelo
        WhatsApp para maiores informações
      </p>
    </>
  );
}

export default ProductAttachmentStep2;
