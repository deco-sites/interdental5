import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  bannerImage?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  _class?: string;
  _classImage?: string;
}

function Banner({ bannerImage, _class, _classImage }: Props) {
  return (
    <div class={`flex justify-center container my-0 xl:my-4 ${_class}`}>
      <Picture class="container flex lg:block justify-center">
        {bannerImage?.mobile
          ? (
            <Source
              media="(max-width: 767px)"
              src={bannerImage.mobile}
              width={500}
            />
          )
          : <></>}

        {bannerImage?.desktop
          ? (
            <>
              <Source
                media="(min-width: 768px)"
                src={bannerImage.desktop}
                width={1248}
              />
              <img
                class={`object-cover w-full max-h-[122px] rounded-lg ${_classImage}`}
                src={bannerImage.desktop}
              />
            </>
          )
          : <></>}
      </Picture>
    </div>
  );
}

export default Banner;
