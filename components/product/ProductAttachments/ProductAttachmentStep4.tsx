import Button from "deco-sites/interdental/components/ui/Button.tsx";
import { Signal } from "@preact/signals";

interface Props {
  setStepActive: Signal<number>;
}

function ProductAttachmentStep4({ setStepActive }: Props) {
  const removeCustomName = () => {
    globalThis?.localStorage?.removeItem("customName");
    setStepActive.value = 0;
  };

  return (
    <>
      <h3 class="text-xl font-bold text-black text-center">
        Tem certeza que deseja excluir a gravação?
      </h3>

      <Button
        onClick={() => removeCustomName()}
        class="bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] h-12 min-h-fit rounded-lg text-white text-base font-bold w-full lg:w-[300px] mt-4 lg:mt-0 mb-2 mx-auto"
      >
        Sim, quero excluir
      </Button>
      <Button
        onClick={() => setStepActive.value = 2}
        class="px-4 py-2 bg-white border-[#27239E] hover:bg-[#DADEF5] hover:border-[#27239E] hover:bg-opacity-60 h-8 min-h-fit rounded-lg text-[#27239E] text-sm font-bold w-[95px] content-center self-center"
      >
        Cancelar
      </Button>
    </>
  );
}

export default ProductAttachmentStep4;
