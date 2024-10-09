import Icon from "$store/components/ui/Icon.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ManualDots } from "../ui/ManualDots.tsx";

export interface BannerMosaic {
  text?: string;
  title?: string;
  backgroundImage?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  button: {
    label?: string;
    url?: string;
  };
}

export interface Props {
  bannerImage?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  BannerMosaics?: BannerMosaic[];
  BannerMosaicsMobile?: BannerMosaic[];
  layout?: {
    headerAlignment?: "center" | "left";
  };
  images?: BannerMosaic[];
  interval?: number;
}

const DEFAULT_PROPS: Props = {
  "bannerImage": {
    "desktop":
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    "mobile":
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
  },
  "BannerMosaics": [{
    "title": "",
    "button": {
      "label": "",
      "url": "",
    },
    "backgroundImage": {
      "desktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
      "mobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    },
    "text":
      "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
  }, {
    "title": "",
    "button": {
      "label": "",
      "url": "",
    },
    "backgroundImage": {
      "desktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
      "mobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    },
    "text":
      "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
  }, {
    "title": "",
    "button": {
      "label": "",
      "url": "",
    },
    "backgroundImage": {
      "desktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
      "mobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    },
    "text":
      "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
  }],
  "BannerMosaicsMobile": [{
    "title": "",
    "button": {
      "label": "",
      "url": "",
    },
    "backgroundImage": {
      "desktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
      "mobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    },
    "text":
      "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
  }, {
    "title": "",
    "button": {
      "label": "",
      "url": "",
    },
    "backgroundImage": {
      "desktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
      "mobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    },
    "text":
      "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
  }, {
    "title": "",
    "button": {
      "label": "",
      "url": "",
    },
    "backgroundImage": {
      "desktop":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
      "mobile":
        "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
    },
    "text":
      "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
  }],
  "layout": {
    "headerAlignment": "center",
  },
};

const BannerMosaic = (
  { text, title, button, backgroundImage }: BannerMosaic,
) => (
  <div class={`flex flex-col items-center gap-9 text-center relative`}>
    {backgroundImage?.desktop && backgroundImage?.mobile && (
      <Picture class="">
        <Source
          media="(max-width: 767px)"
          src={backgroundImage.mobile}
          width={156}
          height={224}
        />
        <Source
          media="(min-width: 768px)"
          src={backgroundImage.desktop}
          width={300}
          height={430}
        />
        <img
          class="object-cover w-full h-full"
          loading="lazy"
          src={backgroundImage.desktop}
          alt="banner mosaic image"
        />
      </Picture>
    )}
    <div class="absolute flex flex-col items-start bottom-[1rem] xl:bottom-[24px]  w-[100%] px-[12px] xl:px-[24px]">
      <h3 class="text-xl text-[#FFF] xl:text-2xl text-start max-w-[183px] font-bold">
        {text}
      </h3>
      <div class="flex flex-col items-start gap-4 text-start max-w-[150px] xl:max-w-[200px]">
        <span class="text-[#FFF]  text-xs xl:text-sm ">
          {title}
        </span>
        <a
          href={button.url}
          class="flex items-center justify-center text-[#6562E5] rounded-lg bg-[#FFF] w-[88px] h-[32px] xl:w-[139px] xl:h-[40px] hover:bg-[#6562E5] hover:text-white hover:border-[1.25px] hover:border-white"
        >
          {button.label}
        </a>
      </div>
    </div>
  </div>
);

export default function BannerMosaicContent(
  props: Props,
) {
  const id = useId();
  const { BannerMosaics, BannerMosaicsMobile, bannerImage } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="w-full container px-4 pb-4 pt-8 flex flex-col gap-0 xl:gap-0 xl:px-0 lg:mb-4">
      <div class="flex justify-center w-full relative z-[1]">
        {bannerImage?.desktop && bannerImage?.mobile && (
          <Picture class="w-full">
            <Source
              media="(max-width: 767px)"
              src={bannerImage.mobile}
              width={500}
              height={224}
            />
            <Source
              media="(min-width: 768px)"
              src={bannerImage.desktop}
              width={1248}
              height={175}
            />
            <img
              class="object-cover  w-full"
              loading="lazy"
              src={bannerImage.desktop}
              alt="banner mosaic image"
            />
          </Picture>
        )}
      </div>

      <div class="grid xl:hidden grid-cols-2 xl:grid-cols-3 gap-4 mt-[-2rem]">
        {BannerMosaicsMobile?.map((
          { text, title, button, backgroundImage },
        ) => (
          <BannerMosaic
            title={title}
            text={text}
            button={button}
            backgroundImage={backgroundImage}
          />
        ))}
      </div>

      <div
        class="relative w-full xl:flex justify-center hidden mt-[-2rem] flex-wrap"
        id={id}
      >
        <Slider class="carousel carousel-start gap-4 xl:gap-[16px] row-start-2 row-end-5 w-full flex justify-start">
          {BannerMosaics?.map((
            { text, title, button, backgroundImage },
            index,
          ) => (
            <Slider.Item
              index={index}
              class="flex flex-col gap-4 carousel-item w-full xl:max-w-[300px]"
            >
              <BannerMosaic
                title={title}
                text={text}
                button={button}
                backgroundImage={backgroundImage}
              />
            </Slider.Item>
          ))}
        </Slider>
        <>
          <div class="z-10 absolute -left-2 xl:-left-[59px] top-[42%]">
            <Slider.PrevButton class="btn !bg-white btn-circle btn-outline xl:right-1/2  min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] hover:!bg-[#FFF000] !border-solid !border-black !border-opacity-10 hover:!border-hidden hover:text-black">
              <Icon size={24} id="ChevronLeft" strokeWidth={3} />
            </Slider.PrevButton>
          </div>
          <div class="z-10 absolute -right-2 xl:-right-[59px] top-[42%]">
            <Slider.NextButton class="btn !bg-white btn-circle btn-outline  -left-[14%] xl:left-0 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] hover:!bg-[#FFF000] hover:!border-hidden hover:text-black !border-black !border-opacity-10">
              <Icon size={24} id="ChevronRight" strokeWidth={3} />
            </Slider.NextButton>
          </div>
        </>

        <ManualDots
          interval={4}
          items={BannerMosaics ?? []}
        />

        <SliderJS rootId={id} />
      </div>
    </div>
  );
}
