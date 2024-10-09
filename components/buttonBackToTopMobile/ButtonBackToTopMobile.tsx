import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

export interface Props {
  text?: string;
}

function ButtonBackToTopMobile({ text }: Props) {
  return (
    <div class="flex xl:hidden justify-center items-center container mx-auto bg-[#FFFFFF]">
      <div class="flex items-center gap-3 w-full justify-center border-b border-base-200 mx-4 py-4">
        <span class="flex text-sm font-bold text-[#000]">{text}</span>
        <a
          href="#top"
          class="btn border rounded-full min-h-[40px] min-w-10 w-[40px] h-[40px] bg-[#6562E5] p-0"
        >
          <Icon id="IconUpMobile" width={28} height={28} />
        </a>
      </div>
    </div>
  );
}

export default ButtonBackToTopMobile;
