import Icon, { AvailableIcons } from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";

export interface Props {
  title?: string;
  description?: string;
  benefits?: Array<{
    label: string;
    icon: AvailableIcons;
    description: string;
  }>;
  layout?: {
    variation?: "Simple" | "With border" | "Color reverse";
    headerAlignment?: "center" | "left";
  };
}

export default function Benefits(props: Props) {
  const {
    title = "",
    description = "",
    benefits = [
      {
        icon: "Truck",
        label: "Entrega em todo Brasil",
        description: "Consulte o prazo no fechamento da compra.",
      },
      {
        icon: "Discount",
        label: "15% na primeira compra",
        description: "Aplicado direto na sacola de compras.",
      },
      {
        icon: "ArrowsPointingOut",
        label: "Devolução grátis",
        description: "Veja as condições para devolver seu produto.",
      },
    ],
    layout,
  } = props;

  const listOfBenefits = benefits.map((benefit, index) => {
    const showDivider = index < benefits.length - 1;
    const reverse = layout?.variation === "Color reverse";
    const benefitLayout = !layout?.variation || layout?.variation === "Simple"
      ? "tiled"
      : "piledup";

    return (
      <div
        class={`${
          reverse ? "bg-primary text-primary-content px-4 py-8 xl:px-8" : ""
        } flex gap-5 min-w-[216px]  !max-w-[240px] ${
          benefitLayout == "piledup" ? "flex-col items-center text-center" : ""
        } ${
          showDivider && benefitLayout !== "piledup"
            ? "border-b border-neutral-300"
            : ""
        } ${
          showDivider
            ? "min-w-[216px]  !max-w-[240px] pb-0 xl:pr-0 xl:border-r-0 border-b-0 gap-4"
            : ""
        } ${showDivider && !reverse ? "xl:pb-0" : ""}`}
      >
        <div class="flex items-center justify-center">
          <Icon
            id={benefit.icon}
            class={reverse ? "text-base-100" : "text-primary"}
            width={48}
            height={48}
            fill="currentColor"
          />
        </div>
        <div class="flex-auto flex flex-col gap-[5px] justify-center">
          <div class={`text-base font-bold text-[#27239E] whitespace-nowrap`}>
            {benefit.label}
          </div>
          <p class={`text-xs font-normal text-black`}>{benefit.description}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      {!layout?.variation || layout?.variation === "Simple"
        ? (
          <div class="container w-full px-4 xl:px-0 pt-4 pb-4 flex xl:flex-col gap-8 xl:gap-10">
            <Header
              title={title}
              description={description}
              alignment={layout?.headerAlignment || "center"}
            />
            <div class="container w-full flex justify-between">
              <div class="flex flex-row overflow-x-auto scrollbar-none overflow-y-hidden xl:flex-col gap-6 xl:gap-5 w-full xl:grid grid-flow-col auto-cols-fr xl:ml-4 h-[72px]">
                {listOfBenefits}
              </div>
            </div>
          </div>
        )
        : (
          ""
        )}
      {layout?.variation === "With border" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 xl:gap-10 xl:py-10 xl:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full py-6 px-4 border border-base-300 xl:gap-8 xl:grid-flow-col xl:auto-cols-fr xl:p-10">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
      {layout?.variation === "Color reverse" && (
        <div class="w-full container flex flex-col px-4 py-8 gap-8 xl:gap-10 xl:py-10 xl:px-0">
          <Header
            title={title}
            description={description}
            alignment={layout?.headerAlignment || "center"}
          />
          <div class="w-full flex justify-center">
            <div class="grid grid-cols-2 gap-4 w-full xl:gap-8 xl:grid-flow-col xl:auto-cols-fr">
              {listOfBenefits}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
