import Button from "deco-sites/interdental/components/ui/Button.tsx";
import { Signal, useSignal } from "@preact/signals";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

interface Props {
  setStepActive: Signal<number>;
  customName: Signal<string>;
}

function ProductAttachmentStep3({ setStepActive, customName }: Props) {
  const edit = useSignal(false);
  const customNameLocal = globalThis?.localStorage?.getItem("customName") ?? "";

  const saveNewName = (nameToSave: string) => {
    globalThis?.localStorage?.setItem("customName", nameToSave);
    edit.value = false;
  };

  return (
    <>
      <span class="text-xs font-medium text-[#545859]">
        Será gravado o texto abaixo
      </span>
      <div class="join border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-12 bg-white items-center lg:w-[500px]">
        <input
          name="name"
          class="w-full disabled:bg-white focus-visible:outline-none"
          required={true}
          minLength={1}
          maxLength={10}
          type="text"
          value={customNameLocal}
          onChange={(e) =>
            customName.value = (e.target as HTMLSelectElement).value}
          disabled={!edit.value}
        />
        {edit.value ? <></> : (
          <div class="cursor-pointer">
            <Icon
              id={"Edit"}
              size={24}
              onClick={() => edit.value = !edit.value}
            />
          </div>
        )}
      </div>
      {edit.value
        ? (
          <>
            <Button
              onClick={() => saveNewName(customName.value)}
              class="bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] h-12 min-h-fit rounded-lg text-white text-base font-bold w-full mb-2"
            >
              Gravar
            </Button>
            <Button
              onClick={() => setStepActive.value = 3}
              class="px-3 py-2 bg-white border-[#B7112F] hover:bg-[#F8D0D7] hover:border-[#B7112F] hover:bg-opacity-80 h-8 min-h-fit rounded-lg text-[#B7112F] text-sm font-bold w-max content-center self-center"
            >
              Excluir Gravação
            </Button>
          </>
        )
        : <></>}
    </>
  );
}

export default ProductAttachmentStep3;
