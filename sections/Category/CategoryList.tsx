import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import ImageHovered from "deco-sites/interdental/islands/ImageHovered.tsx";

export interface Category {
  tag?: string;
  label: string;
  description?: string;
  href?: string;
  image?: ImageWidget;
  mobileImage?: ImageWidget;
  imageHover?: ImageWidget;
  mobileImageHover?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText({
  tag,
  label,
  description,
  alignment,
}: {
  tag?: string;
  label?: string;
  description?: string;
  alignment?: "center" | "left";
}) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && <h3 class="text-base">{label}</h3>}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        tag: "10% off",
        label: "Feminino",
        description: "Moda feminina direto de Milão",
        href: "/feminino",
        image:
          "https://ik.imagekit.io/decocx/tr:w-680,h-680/https:/ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/fdcb3c8f-d629-485e-bf70-8060bd8a9f65",
        buttonText: "Ver produtos",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="container  text-center pt-4 md:pt-8 xl:pt-4 mb-4 lg:mb-0 lg:mt-10 lg:py-5 bg-[#F9F9FF]"
    >
      <Header
        title={header.title}
        description={header.description || ""}
        alignment={layout.headerAlignment || "center"}
      />

      <Slider class="carousel carousel-start lg:gap-0 row-start-2 row-end-5 flex justify-start lg:justify-around ml-4 xl:ml-0">
        {list.map(
          (
            {
              tag,
              label,
              description,
              href,
              image,
              mobileImage,
              imageHover,
              mobileImageHover,
              buttonText,
            },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item px-0 mr-2 lg:mr-0"
            >
              <a
                href={href}
                class="flex flex-col gap-2 lg:gap-4 w-[152px] lg:w-[188px] lg:h-auto font-medium text-black text-opacity-70 hover:font-bold hover:text-[#27239E] hover:text-opacity-100 hover:transition hover:duration-300 hover:ease-in-out 
                 xl:hover:scale-105"
              >
                {layout.categoryCard?.textPosition === "top" && (
                  <CardText
                    tag={tag}
                    label={label}
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}

                {image && (
                  <>
                    <div className="hidden lg:flex">
                      <ImageHovered image={image} imageHovered={imageHover} />
                    </div>
                    <div className="flex lg:hidden">
                      <ImageHovered
                        image={mobileImage}
                        imageHovered={mobileImageHover}
                        width={152}
                        height={88}
                      />
                    </div>
                  </>
                )}
                {layout.categoryCard?.textPosition === "bottom" && (
                  <CardText
                    tag={tag}
                    label={label}
                    description={description}
                    alignment={layout?.categoryCard?.textAlignment}
                  />
                )}
              </a>
              {buttonText && (
                <a href={href} class="btn">
                  {buttonText}
                </a>
              )}
            </Slider.Item>
          ),
        )}
      </Slider>

      <SliderJS rootId={id} />
    </div>
  );
}

export default CategoryList;
