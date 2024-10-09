interface Props {
  title?: string;
  fontSize?: "Normal" | "Large";
  description?: string;
  alignment: "center" | "left";
  colorReverse?: boolean;
}
function Header(props: Props) {
  return (
    <>
      {props.title || props.description
        ? (
          <div
            class={`flex flex-col gap-2 w-full ${
              props.alignment === "left" ? "text-left" : "text-center"
            }`}
          >
            {props.title && (
              <h2
                class={`!text-xl md:!text-[28px] leading-7 xl:leading-9 !font-bold px-0
                  ${props.colorReverse ? "text-primary-content" : "text-black"}
                  ${props.fontSize === "Normal" ? "lg:text-3xl" : "lg:text-4xl"}
                `}
              >
                {props.title}
              </h2>
            )}
            {props.description && (
              <h2
                class={`
                leading-7 xl:leading-6 lg:leading-8 !text-xl !font-bold text-left xl:max-w-sm
                  ${
                  props.colorReverse ? "text-primary-content" : "text-neutral"
                }
                  ${
                  props.fontSize === "Normal"
                    ? "lg:text-xl"
                    : "lg:!text-[32px] lg:!leading-[42px] lg:min-w-[544px]"
                }
                `}
              >
                {props.description}
              </h2>
            )}
          </div>
        )
        : null}
    </>
  );
}
export default Header;
