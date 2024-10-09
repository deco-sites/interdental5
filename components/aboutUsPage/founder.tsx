import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface FounderDescriptionProps {
  title?: string;
  paragraphs?: Paragraph[];
  founderName?: string;
  imageDesktop: ImageWidget;
  imageMobile: ImageWidget;
}

export type Paragraph = {
  label: string;
};

export default function AboutUsHeader(
  { title, paragraphs, imageDesktop, imageMobile, founderName }:
    FounderDescriptionProps,
) {
  return (
    <div class="bg-[#F9F9FF]">
      <div class="flex flex-col lg:flex-row lg:justify-center lg:pb-[88px] lg:gap-[88px] max-w-[1145px] mx-[auto] px-[16px] lg:px-0">
        <div class="px-[16px] xl:p-0">
          <h1 class="text-[#27239E] font-black text-[28px] pb-[16px] lg:text-5xl lg:pb-[32px] border-b-[1px] border-[#E6E7EB]">
            {title}
          </h1>
          <div class="lg:mt-[32px] mt-[16px]">
            {paragraphs?.map((paragraph) => (
              <p class="text-[#545859] text-base lg:max-w-[623px] mb-[20px]">
                {paragraph.label}
              </p>
            ))}
            <span class="text-[#545859] text-xl font-bold">
              {founderName}
            </span>
          </div>
        </div>
        <div class="mt-[48px] lg:mt-0">
          <Picture class="mx-[auto] xl:w-[476px] flex">
            <Source
              src={imageMobile}
              width={328}
              height={294}
              media="(max-width: 767px)"
            />
            <Source
              src={imageDesktop}
              width={476}
              height={745}
              media="(min-width: 768px)"
            />
            <img
              class="object-cover h-full w-full xl:w-[476px] xl:h-[745px] rounded-lg"
              src={imageDesktop}
            />
          </Picture>
        </div>
      </div>
    </div>
  );
}
