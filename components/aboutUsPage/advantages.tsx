import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface AboutUsBannerProps {
  logo: ImageWidget;
  logoMobile: ImageWidget;
  imageDesktop: ImageWidget;
  imageMobile: ImageWidget;
  description?: string;
  description2?: string;
  items: Item[];
}

export type Item = {
  label: string;
};

export default function AboutUsHomeBanner(
  {
    logo,
    logoMobile,
    imageDesktop,
    imageMobile,
    description,
    description2,
    items,
  }: AboutUsBannerProps,
) {
  const bgLayout =
    "lg:bg-[url('/image/aboutUsVantagens.svg')]  bg-no-repeat text-secondary-content";

  return (
    <div
      class={`flex justify-center w-full lg:h-[654px] lg:mb-[23px] ${bgLayout} bg-contain`}
    >
      <div class="flex flex-col lg:flex-row gap-x-[72px] w-[100%]">
        <div class="lg:mt-[48px] pt-[16px] lg:pt-0">
          <Picture class="lg:w-[718px] lg:h-[542px]">
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
              media="(min-width: 768px)"
            />
            <img
              class="object-cover w-full lg:w-[718px] lg:rounded-r-lg"
              src={imageDesktop}
            />
          </Picture>
        </div>
        <div class="bg-[#F9F9FF] flex justify-center lg:mt-[84px] lg:bg-none  lg:bg-transparent bg-cover bg-no-repeat">
          <div class="flex flex-col gap-10 pb-[40px] px-[24px] lg:p-0 mt-[40px] lg:mt-0">
            <Picture class="lg:max-w-[179px] lg:max-h-[54px] lg:flex w-[156px] lg:w-[100%] lg:h-[100%] h-[47px]">
              <Source
                media="(max-width: 767px)"
                src={logoMobile}
                width={237}
                height={72}
              />
              <Source
                media="(min-width: 767px)"
                src={logo}
                width={179}
                height={54}
              />
              <img
                class="object-cover "
                src={logo}
              />
            </Picture>
            <div class="max-w-[557px] flex flex-col gap-[20px]">
              <span class="font-bold text-[#000]">
                {description}
              </span>
              <span class="text-[#000] font-medium max-w-[500px]">
                {description2}
              </span>
              <div>
                <ul class="flex max-h-[288px] lg:max-h-[168px] flex-col flex-wrap gap-x-6 mt-[16px] lg:mt-20px">
                  {items?.map((content) => (
                    <li class="text-[#000] w-full text-base max-w-[144px] lg:max-w-[266px] font-medium">
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
