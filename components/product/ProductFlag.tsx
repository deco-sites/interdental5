export interface Props {
  flagBgColor?: string;
  flagTextColor?: string;
  promoName?: string;
}

export interface ProductFlags {
  /** @default black */
  /** @description informe a cor de fundo da flag em hex. */
  flagBgColor?: string;
  /** @default yellow */
  /** @description informe a cor do texto da flag em hex. */
  flagTextColor?: string;
}

function ProductFlag(
  {
    flagBgColor = "#000000",
    flagTextColor = "#FFF000",
    promoName,
  }: Props,
) {
  return (
    <>
      <p
        class=" flex font-bold px-2 py-[2px] align-middle rounded-[4px] text-[11px] tracking-[-0.1px] mx-[2px] mb-1 overflow-hidden whitespace-break-spaces text-center xl:whitespace-nowrap text-ellipsis max-w-[200px]"
        style={{
          backgroundColor: flagBgColor,
          color: flagTextColor,
        }}
      >
        {promoName}
      </p>
    </>
  );
}

export default ProductFlag;
