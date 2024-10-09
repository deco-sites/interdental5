import {
  SendEventOnClick,
  SendEventOnView,
} from "$store/components/Analytics.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture } from "apps/website/components/Picture.tsx";
import PrevButton from "deco-sites/interdental/islands/PrevButton.tsx";
import NextButton from "deco-sites/interdental/islands/NextButton.tsx";

/**
 * @titleBy alt
 */
export interface Banner {
  /** @description desktop otimized image */
  desktop: ImageWidget;
  /** @description mobile otimized image */
  mobile: ImageWidget;
  /** @description Image's alt text */
  alt: string;
  action?: {
    /** @description when user clicks on the image, go to this link */
    href: string;
    /** @description Image text title */
    title?: string;
    /** @description Image text subtitle */
    subTitle?: string;
    /** @description Button label */
    label?: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

const DEFAULT_PROPS = {
  images: [
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
        title: "Demo Store",
        subTitle: "Visit our site and start building now:",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/24278f9e-412d-4a8a-b2d3-57353bb1b368",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/afa2c07c-74f4-496d-8647-5cc58f48117b",
    },
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
        title: "Demo Store",
        subTitle: "Visit our site and start building now:",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/eeaa624c-a3e1-45e8-a6fe-034233cfbcd0",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7949d031-9a79-4639-b85e-62fd90af85a9",
    },
    {
      alt: "/feminino",
      action: {
        href: "https://www.deco.cx/",
        label: "deco.cx",
        title: "Demo Store",
        subTitle: "Visit our site and start building now:",
      },
      mobile:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ae89571c-4a7c-44bf-9aeb-a341fd049d19",
      desktop:
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/7ec121e4-5cfe-4b7b-b942-d1ed4493803d",
    },
  ],
  preload: true,
};

function BannerItem({
  image,
  lcp,
  id,
}: {
  image: Banner;
  lcp?: boolean;
  id: string;
}) {
  const { alt, mobile, desktop, action } = image;

  return (
    <a
      id={id}
      href={action?.href ?? "#"}
      aria-label={action?.label}
      class="relative h-auto overflow-y-hidden w-full rounded-lg"
    >
      <Picture preload={lcp}>
        <img
          class="hidden xl:flex object-cover w-full h-full max-[1440px]:max-h-[314px]"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
        />
        <img
          class="flex xl:hidden object-cover w-full h-full"
          src={mobile}
          alt={alt}
        />
      </Picture>
    </a>
  );
}

export function Dots({ images }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel col-span-full z-10 row-start-4 w-auto h-6 justify-self-center justify-start bg-white rounded-full mt-[-2.5rem] xl:mt-7">
        {images?.map((_, index) => (
          <li class="carousel-item px-2 focus:bg-black">
            <Slider.Dot index={index}>
              <div className="hidden group-disabled:flex">
                <Icon id={"ActiveDot"} size={16} />
              </div>
              <div className="flex group-disabled:hidden">
                <Icon id={"Dot"} size={16} />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

export function Buttons() {
  return (
    <>
      <PrevButton
        icon={"BannerLeft"}
        iconHovered={"BannerLeftHover"}
        sizeDesktop={48}
        sizeMobile={32}
      />
      <NextButton
        icon={"BannerRight"}
        iconHovered={"BannerRightHover"}
        sizeDesktop={48}
        sizeMobile={32}
      />
    </>
  );
}

function BannerCarousel(props: Props) {
  const id = useId();
  const { images, preload, interval } = { ...DEFAULT_PROPS, ...props };

  return (
    <>
      <div
        id={id}
        class="max-h-[264px] xl:max-h-full grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] xl:grid-cols-[114px_1fr_114px] grid-rows-[1fr_48px_1fr_0px] xl:grid-rows-[2fr_48px_1fr_64px] mx-4  relative max-w-[1440px] 2xl:mx-[auto]"
      >
        <Slider class="container carousel carousel-center w-full col-span-full row-span-full gap-6max-[1440px]:max-h-[314px]">
          {images?.map((image, index) => {
            const params = { promotion_name: image.alt };

            return (
              <Slider.Item index={index} class="carousel-item w-full">
                <BannerItem
                  image={image}
                  lcp={index === 0 && preload}
                  id={`${id}::${index}`}
                />
                <SendEventOnClick
                  id={`${id}::${index}`}
                  event={{ name: "select_promotion", params }}
                />
                <SendEventOnView
                  id={`${id}::${index}`}
                  event={{ name: "view_promotion", params }}
                />
              </Slider.Item>
            );
          })}
        </Slider>

        {/* <Buttons /> */}

        <div class="lg:flex items-center justify-end 2xl:justify-center z-10 col-start-1 row-start-2 max-[1025px]:absolute relative left-[-10px] lg:left-20">
          <Slider.PrevButton class="btn !bg-white btn-circle  min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] hover:!bg-[#FFF000] xl:!border-solid xl:!border-[#0000001a] !border-opacity-10 hover:!border-hidden hover:text-black">
            <Icon size={16} id="ChevronLeft" strokeWidth={3} />
          </Slider.PrevButton>
        </div>
        <div class="lg:flex items-center justify-start 2xl:justify-center z-10 col-start-3 row-start-2 max-[1025px]:absolute relative right-[-10px] lg:right-20">
          <Slider.NextButton class="btn !bg-white btn-circle min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] hover:!bg-[#FFF000] hover:!border-hidden hover:text-black xl:!border-[#0000001a] !border-opacity-10">
            <Icon size={16} id="ChevronRight" strokeWidth={3} />
          </Slider.NextButton>
        </div>

        <Dots images={images} interval={interval} />

        <SliderJS rootId={id} interval={interval && interval * 1e3} infinite />
      </div>
    </>
  );
}

export default BannerCarousel;
