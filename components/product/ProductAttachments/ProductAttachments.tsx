import { invoke } from "deco-sites/interdental/runtime.ts";
import { useSignal } from "@preact/signals";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";
import ProductAttachmentStep1 from "deco-sites/interdental/components/product/ProductAttachments/ProductAttachmentStep1.tsx";
import ProductAttachmentStep2 from "deco-sites/interdental/components/product/ProductAttachments/ProductAttachmentStep2.tsx";
import ProductAttachmentStep3 from "deco-sites/interdental/components/product/ProductAttachments/ProductAttachmentStep3.tsx";
import ProductAttachmentStep4 from "deco-sites/interdental/components/product/ProductAttachments/ProductAttachmentStep4.tsx";

export interface Props {
  skuId: string;
}
interface AssemblyOption {
  id: string;
}

interface Item {
  assemblyOptions: AssemblyOption[];
}

interface ResponseType {
  itemMetadata: {
    items: Item[];
  };
}

function ProductAttachment({ skuId }: Props) {
  const open = useSignal(false);
  const stepActive = useSignal(0);
  const customName = useSignal("");
  const hasLaserEngraving = useSignal(false);
  const hasCustomName = globalThis?.localStorage?.getItem("customName");

  const getProductAttachment = async () => {
    const response = await invoke["deco-sites/interdental"].actions
      .getProductAttachments({ id: skuId }) as ResponseType;

    const getLaserEngraving = response?.itemMetadata?.items?.some((item) => {
      return item?.assemblyOptions?.some((option) => {
        return option?.id.includes("Gravação");
      });
    });

    hasLaserEngraving.value = getLaserEngraving;

    if (!hasLaserEngraving.value) {
      globalThis?.localStorage?.setItem("hasAttachment", "false");
    }
  };

  getProductAttachment();

  const renderStep = () => {
    switch (stepActive.value) {
      case 0:
        if (hasCustomName) {
          return (
            <ProductAttachmentStep3
              setStepActive={stepActive}
              customName={customName}
            />
          );
        } else {
          return (
            <ProductAttachmentStep1
              setStepActive={stepActive}
              customName={customName}
            />
          );
        }
      case 1:
        return <ProductAttachmentStep2 setStepActive={stepActive} />;
      case 2:
        return (
          <ProductAttachmentStep3
            setStepActive={stepActive}
            customName={customName}
          />
        );
      case 3:
        return <ProductAttachmentStep4 setStepActive={stepActive} />;
      default:
        return null;
    }
  };

  return (
    <>
      {hasLaserEngraving.value
        ? (
          <div class="p-6 lg:px-8 lg:py-6 border-2 border-[#E4E4E4] rounded-lg my-4 bg-white">
            <div class="flex flex-row items-center justify-between">
              <div class="flex flex-row gap-2 w-full justify-between lg:justify-start items-center">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    class="sr-only peer"
                    onClick={() => {
                      open.value = !open.value;
                      stepActive.value = 0;
                      globalThis?.localStorage?.setItem(
                        "hasAttachment",
                        `${open.value}`,
                      );
                    }}
                    checked={open.value}
                  />
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none   
                 rounded-full peer dark:bg-[#515971] peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
                 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 
                 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#6562E5] peer-hover:after:ring-8 peer-hover:after:ring-black/20">
                  </div>
                </label>
                <div class="order-1 lg:order-3">
                  <Icon
                    class={"lg:hidden flex"}
                    id={"Laser"}
                    width={40}
                    height={24}
                  />
                  <Icon
                    class={"hidden lg:flex"}
                    id={"Laser"}
                    width={64}
                    height={40}
                  />
                </div>
                <span class="order-2 lg:order-3 text-base font-bold text-black">
                  Incluir Gravação a Laser
                </span>
              </div>
              <div class="px-[6px] py-1 lg:px-4 lg:py-2 bg-[#6562E5] rounded-tl-lg rounded-br-lg lg:rounded-lg text-xs lg:text-sm font-extrabold text-[#F9F9FF] absolute lg:relative ml-[-1.6rem] lg:ml-0 mb-[3.1rem] lg:mb-0">
                Grátis
              </div>
            </div>
            <div
              class={open.value
                ? "flex flex-col gap-2 mt-4 w-[280px] lg:w-auto"
                : "hidden"}
            >
              {renderStep()}
            </div>
          </div>
        )
        : <></>}
    </>
  );
}

export default ProductAttachment;
