import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Testimonial {
  text?: string;
  image?: {
    src?: ImageWidget;
  };
  user?: {
    avatar?: ImageWidget;
    name?: string;
    position?: string;
    company?: string;
  };
}

export interface Props {
  title?: string;
  testimonials?: Testimonial[];
  layout?: {
    variation?: "Grid" | "Slider";
    headerAlignment?: "center" | "left";
  };
}

const Testimonal = ({ image, text, user }: Testimonial) => (
  <div class="flex bg-[#FFF] rounded-2xl flex-col p-[24px] h-full items-center gap-6 text-center max-w-[328px] xl:max-w-[400px]  xl:p-[24px]">
    {image?.src && (
      <Image
        loading="lazy"
        src={image.src}
        alt="testimonials marks"
        width={36}
        height={24}
      />
    )}
    <h3 class="text-base xl:text-base mr-3 h-full font-medium text-black">
      {text}
    </h3>
    <div class="flex flex-col items-center gap-2">
      {user?.avatar && (
        <Image
          loading="lazy"
          src={user.avatar}
          alt={user?.name}
          width={104}
          height={104}
          class="rounded-full"
        />
      )}
      <div class="flex flex-col">
        {user?.name &&
          (
            <p class="text-xl font-bold text-[#000]">
              {user?.name}
            </p>
          )}
        {(user?.position || user?.company) &&
          (
            <p class="text-lg">
              {user?.position}, {user?.company}
            </p>
          )}
      </div>
    </div>
  </div>
);

export default function Testimonials(
  { title, testimonials, layout }: Props,
) {
  const id = useId();

  return (
    <div class="w-full bg-[#6562E5]">
      <div class="container  px-4 pt-4 pb-10 flex flex-col gap-4 xl:gap-5 xl:pt-[32px] xl:pb-[48px] xl:px-0 mt-[64px]">
        <div>
          <span class="text-[#FFF] font-bold text-[20px] xl:text-[28px] w-[100%] flex justify-center leading-7 xl:leading-9">
            {title}
          </span>
        </div>

        {layout?.variation === "Grid" && (
          <div class="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {testimonials?.map(({ image, text, user }) => (
              <Testimonal image={image} text={text} user={user} />
            ))}
          </div>
        )}

        {layout?.variation !== "Grid" && (
          <div
            class="relative w-full px-0"
            id={id}
          >
            <Slider class="carousel carousel-start gap-4 xl:gap-6 row-start-2 row-end-5 w-full">
              {testimonials?.map(({ image, text, user }, index) => (
                <Slider.Item
                  index={index}
                  class="flex flex-col gap-4 carousel-item xl:w-[400px]"
                >
                  <Testimonal image={image} text={text} user={user} />
                </Slider.Item>
              ))}
            </Slider>
            <>
              <div class="z-10 absolute -left-2 xl:-left-[59px] top-[46%]">
                <Slider.PrevButton class="btn bg-white btn-circle btn-outline hover:!bg-[#FFF000] !border-solid !border-black !border-opacity-10 hover:!border-hidden hover:text-black min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px]">
                  <Icon size={16} id="ChevronLeft" strokeWidth={3} />
                </Slider.PrevButton>
              </div>
              <div class="z-10 absolute -right-2 xl:-right-[59px] top-[46%]">
                <Slider.NextButton class="btn bg-white btn-circle btn-outline hover:!bg-[#FFF000] !border-solid !border-black !border-opacity-10 hover:!border-hidden hover:text-black min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] ">
                  <Icon size={16} id="ChevronRight" strokeWidth={3} />
                </Slider.NextButton>
              </div>
            </>
            <SliderJS rootId={id} />
          </div>
        )}
      </div>
    </div>
  );
}
