import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface BannerVariantProps {
  url: string;
  bannerDesktop: ImageWidget;
  bannerMobile: ImageWidget;
}

export default function BannerVariantHome(
  { url, bannerDesktop, bannerMobile }: BannerVariantProps,
) {
  return (
    <div class="container flex justify-center py-4 px-4 xl:px-0 ">
      <a
        class="w-full"
        href={url}
      >
        <Picture class="w-full">
          <Source
            src={bannerMobile}
            width={328}
            height={172}
            media="(max-width: 767px)"
          />
          <Source
            src={bannerDesktop}
            width={1248}
            height={230}
            media="(min-width: 767px)"
          />
          <img
            class="object-cover w-full xl:h-[230px] xl:rounded-lg mt-4"
            loading="lazy"
            src={bannerDesktop}
            alt="banner image"
          />
        </Picture>
      </a>
    </div>
  );
}
