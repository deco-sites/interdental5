import { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface BannerFullProps {
  bannerDesktop: ImageWidget;
  bannerMobile: ImageWidget;
}

export default function AboutUsBannerFull(
  { bannerDesktop, bannerMobile }: BannerFullProps,
) {
  return (
    <div>
      <Picture class="mx-[auto] lg:flex mt-[62px] lg:mt-[86px] ">
        <Source
          src={bannerMobile}
          width={328}
          height={294}
          media="(max-width: 767px)"
        />
        <Source
          src={bannerDesktop}
          width={612}
          height={550}
          media="(min-width: 767px)"
        />
        <img
          class="object-cover w-full "
          src={bannerDesktop}
        />
      </Picture>
    </div>
  );
}
