import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SectionProps } from "deco/types.ts";
import { Marked } from "@ts-stack/markdown";

/**
 * @titleBy matcher
 */
export interface SeoTextCategory {
  /** @description RegExp to enable this banner on the current URL. Use /feminino/* to display this banner on feminino category  */
  matcher: string;
  title?: string;
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt: string;
  };
  fullDescription: FullDescription[];
  fullDescription2: FullDescription2[];
  description?: string;
  secondDescription?: string;
}

export type FullDescription = {
  label?: string;
};

export type FullDescription2 = {
  label?: string;
};

const DEFAULT_PROPS = {
  texts: [
    {
      image: {
        mobile:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/91102b71-4832-486a-b683-5f7b06f649af",
        desktop:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/ec597b6a-dcf1-48ca-a99d-95b3c6304f96",
        alt: "a",
      },
      title: "TEST",
      matcher: "/*",
      description: "",
      secondDescription: "",
      fullDescription: [],
      fullDescription2: [],
    },
  ],
};

function SeoText(props: SectionProps<ReturnType<typeof loader>>) {
  const { seoTexts } = props;

  if (!seoTexts) {
    return null;
  }

  const {
    image,
    title,
    fullDescription,
    fullDescription2,
    description,
    secondDescription,
  } = seoTexts;

  return (
    <div class="flex flex-col-reverse xl:flex-row container xl:gap-[72px] xl:mb-0 mb-10">
      <div class="flex w-full">
        <details class="collapse join-item w-full xl:pt-0">
          <summary class="!flex collapse-title text-lg font-medium pb-0 pt-6 xl:pt-0 xl:py-0 xl:pl-0 pointer-events-none min-h-[492px] xl:min-h-[376px] px-4 xl:px-0 xl:gap-[72px]">
            <div class="hidden xl:flex flex-row w-full px-4 xl:px-0 xl:w-auto">
              <Picture class="hidden xl:flex">
                <Source
                  src={image.desktop}
                  width={622}
                  height={376}
                  media="(min-width: 1024px)"
                />
                <img
                  class="object-cover rounded-lg w-full h-full xl:min-w-[622px] xl:h-[376px]"
                  src={image.desktop}
                />
              </Picture>
            </div>
            <div class="flex flex-col justify-between gap-6 xl:justify-center">
              <span class="font-bold xl:font-black text-[1.25rem] xl:text-[2.75rem] pb-0 xl:pb-0 whitespace-nowrap text-[#27239E] mb-4 xl:flex xl:items-center xl:h-14">
                {title}
              </span>
              <p
                class="text-sm text-[#545859] xl:max-w-[500px]"
                dangerouslySetInnerHTML={{
                  __html: Marked.parse(description ?? ""),
                }}
              />
              <p class="text-sm text-[#545859] xl:max-w-[500px]">
                {secondDescription}
              </p>

              <img
                class="xl:hidden object-cover rounded-lg w-full h-full xl:min-w-[622px] xl:h-[376px]"
                src={image.mobile}
              />

              <div class="flex border-2 border-[#27239E] rounded-lg justify-center items-center h-12 max-w-[144px] text-[#27239E] text-base font-bold gap-2 pointer-events-auto hover:bg-indigo-200 hover:bg-opacity-60 bg-white min-h-[48px] mt-4 xl:mt-0">
                <img
                  src="/image/plussvg.svg"
                  alt={"icon-plus"}
                  width={20}
                  height={20}
                  class="flex"
                />
                <span class="flex">
                  Ver mais
                </span>
              </div>
            </div>
          </summary>
          <div class="collapse-content xl:p-0">
            <div class="flex  flex-col">
              <div class="mt-[16px]">
                {fullDescription?.map((description) => (
                  <p class="text-sm text-[#545859] font-medium">
                    {description.label}
                  </p>
                ))}
              </div>
              <div class="mt-[16px]">
                {fullDescription2?.map((description2) => (
                  <p class="text-sm text-[#545859] font-medium">
                    {description2.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export interface Props {
  texts?: SeoTextCategory[];
}

export const loader = (props: Props, req: Request) => {
  const { texts } = { ...DEFAULT_PROPS, ...props };

  const seoTexts = texts.find(({ matcher }) =>
    new URLPattern({ pathname: matcher }).test(req.url)
  );

  return { seoTexts };
};

export default SeoText;
