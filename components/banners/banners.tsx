import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface BannersHomeProps {
  banner1: BannerProps;
  banner2: BannerProps;
  banner3: BannerProps;
}

export interface BannerProps {
  url: string;
  bannerDesktop: ImageWidget;
  bannerMobile: ImageWidget;
}

export default function BannersHome(
  { banner1, banner2, banner3 }: BannersHomeProps,
) {
  return (
    <div class="container w-full xl:flex flex-col xl:flex-row justify-between xl:gap-x-8 pt-0 xl:py-4">
      <div class="w-full">
        <a
          class="flex mb-[16px] xl:my-0 xl:mt-0 w-full"
          href={banner1.url}
        >
          <Picture class="w-full xl:h-[550px]">
            <Source
              src={banner1.bannerMobile}
              width={328}
              height={294}
              media="(max-width: 767px)"
            />
            <Source
              src={banner1.bannerDesktop}
              width={612}
              height={550}
              media="(min-width: 767px)"
            />
            <img
              class="object-cover xl:h-[550px] w-full px-[16px] xl:px-0 rounded-lg"
              loading="lazy"
              src={banner1.bannerDesktop}
              alt="image banner"
            />
          </Picture>
        </a>
      </div>
      <div class="flex flex-col-reverse xl:flex-col justify-between gap-y-4 xl:gap-y-0 w-full px-4 xl:px-0 pb-4 xl:pb-0 last:pb-0">
        <a
          class="w-full"
          href={banner2.url}
        >
          <Picture class="w-full">
            <Source
              src={banner2.bannerMobile}
              width={328}
              height={172}
              media="(max-width: 767px)"
            />
            <Source
              src={banner2.bannerDesktop}
              width={612}
              height={259}
              media="(min-width: 767px)"
            />
            <img
              class="object-cover xl:h-[259px] w-full rounded-lg"
              loading="lazy"
              src={banner2.bannerDesktop}
              alt="image banner"
            />
          </Picture>
        </a>

        <a
          class="w-full"
          href={banner3.url}
        >
          <Picture class="w-full">
            <Source
              src={banner3.bannerMobile}
              width={328}
              height={172}
              media="(max-width: 767px)"
            />
            <Source
              src={banner3.bannerDesktop}
              width={612}
              height={259}
              media="(min-width: 767px)"
            />
            <img
              class="object-cover xl:h-[259px] w-full rounded-lg"
              loading="lazy"
              src={banner3.bannerDesktop}
              alt="image banner"
            />
          </Picture>
        </a>
      </div>
    </div>
  );
}
