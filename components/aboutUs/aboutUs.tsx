import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface AboutUsBannerProps {
  logo: ImageWidget;
  imageDesktop: ImageWidget;
  imageMobile: ImageWidget;
  description?: string;
  description2?: string;
  text?: string;
  items: Item[];
}

export type Item = {
  label: string;
};

export default function AboutUsHomeBanner(
  { logo, imageDesktop, imageMobile, description, description2, items }:
    AboutUsBannerProps,
) {
  const bgLayout =
    " xl:bg-[url('/image/vantagensDesktop.png')] bg-contain bg-[#27239E] bg-no-repeat text-secondary-content mb-8";

  return (
    <div class={`flex justify-center w-full xl:h-[654px] ${bgLayout}`}>
      <div class="flex flex-col xl:flex-row gap-x-[72px] w-[100%]">
        <div class="xl:mt-[48px]">
          <Picture class="xl:w-[718px] xl:h-[542px] h-[288px]">
            <Source
              src={imageMobile}
              width={360}
              height={288}
              media="(max-width: 767px)"
            />
            <Source
              src={imageDesktop}
              width={718}
              height={542}
              media="(min-width: 767px)"
            />
            <img
              class="object-cover w-full xl:w-[718px] xl:rounded-r-lg"
              loading="lazy"
              src={imageDesktop}
              alt="About us image"
            />
          </Picture>
        </div>
        <div class=" flex justify-center xl:mt-[75px] bg-[url('/image/bg-bottom.svg')] bg-bottom xl:bg-none bg-cover bg-no-repeat pb-6 xl:pb-0 md:bg-contain xl:bg-cover xl:bg-transparent bg-[#27239E]">
          <div class=" flex flex-col gap-6 pb-[40px] px-[24px] xl:p-0 mt-[111px] xl:mt-0">
            <Picture class="xl:max-w-[237px] xl:max-h-[72px] hidden xl:flex">
              <Source
                media="(max-width: 767px)"
                src={logo}
                width={237}
                height={72}
              />
              <img
                class="object-cover "
                loading="lazy"
                src={logo}
                alt="about us logo"
              />
            </Picture>
            <div class="max-w-[557px]">
              <div class="flex flex-col gap-[20px]">
                <span class="font-bold text-[#FFF] text-base xl:text-xl">
                  {description}
                </span>
                <span class="text-[#FFF] text-base font-medium">
                  {description2}
                </span>
              </div>
              <div class="flex xl:mt-[40px]">
              </div>
              <div>
                <ul class="flex max-h-[288px] xl:max-h-[168px] flex-col flex-wrap gap-x-6 mt-10 xl:mt-0">
                  {items?.map((content) => (
                    <li class="text-[#FFF] text-base max-w-[144px] xl:max-w-[266px]">
                      {content.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
