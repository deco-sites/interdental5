import Icon from "$store/components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
export interface Testimonial {
  text?: string;
  image?: {
    src?: ImageWidget;
    alt?: string;
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
  description?: string;
  testimonials?: Testimonial[];
  layout?: {
    variation?: "Grid" | "Slider";
    headerAlignment?: "center" | "left";
    headerFontSize?: "Normal" | "Large";
  };

  images?: Testimonial[];
  interval?: number;
}
const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  testimonials: [
    {
      text:
        "Fashion Store is my go-to online destination for all things stylish. Their vast collection of trendy clothes and accessories never disappoints. The quality is exceptional, and the prices are affordable. The website is easy to navigate, and their customer service team is friendly and responsive. I always feel like a fashionista when I shop here!",
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
        alt: "Testimonal",
      },
      user: {
        avatar: "https://avatars.githubusercontent.com/u/117045675?s=200&v=4",
        name: "Robert Johnson",
        position: "Founder",
        company: "RJ Agency",
      },
    },
    {
      text:
        "I can't praise Fashion Store enough! Their commitment to staying ahead of the fashion curve is evident in their diverse and up-to-date inventory. Whether I need a casual outfit or a glamorous dress, they have it all. The shopping experience is seamless, and my orders always arrive promptly. Fashion Store is a true fashion lover's paradise!",
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
        alt: "Testimonal",
      },
      user: {
        avatar: "https://avatars.githubusercontent.com/u/117045675?s=200&v=4",
        name: "Mary Bush",
        position: "Director",
        company: "MB & Co",
      },
    },
    {
      text:
        "Fashion Store has transformed my wardrobe. Their curated collection of clothing and accessories has helped me discover my personal style. The quality of their products is outstanding, and the prices are unbeatable. The website is visually appealing and easy to navigate. Fashion Store is my trusted companion for staying fashionable and feeling confident!",
      image: {
        src:
          "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/239/e0fcbcae-0a21-4269-9605-7ef8708e58ad",
        alt: "Testimonal",
      },
      user: {
        avatar: "https://avatars.githubusercontent.com/u/117045675?s=200&v=4",
        name: "Sandra Bullock",
        position: "Founder",
        company: "Sanlock",
      },
    },
  ],
  layout: {
    variation: "Grid",
    headerAlignment: "center",
    headerFontSize: "Normal",
  },
};

const Testimonal = ({ image, text, user }: Testimonial) => (
  <div class="flex flex-col items-center gap-9 text-center xl:min-h-[101px] max-h-[80px] xl:max-h-[100px]">
    {image?.src && (
      <Image
        class="rounded-lg filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 ease-in-out min-h-[80px] xl:min-h-[100px] max-h-[100px] object-contain xl:object-cover"
        src={image.src}
        alt={image?.alt}
        width={190}
        height={100}
      />
    )}
    <h3 class="text-xl xl:text-2xl">{text}</h3>
    <div class="flex flex-col items-center gap-4">
      {user?.avatar && (
        <Image
          src={user.avatar}
          alt={user?.name}
          width={60}
          height={60}
          class="rounded-full"
        />
      )}
      <div class="flex flex-col">
        {user?.name && <p class="text-lg">{user?.name}</p>}
        {(user?.position || user?.company) && (
          <p class="text-lg">
            {user?.position}, {user?.company}
          </p>
        )}
      </div>
    </div>
  </div>
);
function Dots({ images }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      />
      <ul class="carousel col-span-full z-10 row-start-4 w-auto h-6 justify-self-center justify-start bg-white rounded-full mt-[-2rem] xl:mt-0">
        {images?.map((_, index) => (
          <li class="carousel-item px-2 focus:bg-black [&:not(:nth-child(6n-4))]:hidden">
            <Slider.Dot index={index}>
              <div className="hidden group-disabled:flex">
                <Icon id={"ActiveDot"} size={16} />
              </div>
              <div className="flex group-disabled:hidden">
                <Icon id={"Dot"} size={16} />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
export default function Testimonials(props: Props) {
  const id = useId();
  const { title, description, testimonials, layout } = {
    ...DEFAULT_PROPS,
    ...props,
  };

  return (
    <div class="md:max-w-188 max-w-144  container px-4 pb-4 pt-8 flex items-center flex-col gap-5 xl:px-0 pr-0">
      <Header
        title={title}
        description={description}
        alignment={layout?.headerAlignment || "center"}
        fontSize={layout?.headerFontSize}
      />

      {layout?.variation === "Grid" && (
        <div class="grid grid-cols-6 xl:grid-cols-6 gap-10">
          {testimonials?.map(({ image, text, user }) => (
            <Testimonal image={image} text={text} user={user} />
          ))}
        </div>
      )}
      {layout?.variation !== "Grid" && (
        <div
          class="relative  flex items-center justify-center flex-col"
          id={id}
        >
          <Slider class="carousel gap-2 lg:gap-5 xl:min-h-[101px]">
            {testimonials?.map(({ image, text, user }, index) => (
              <Slider.Item
                index={index}
                class="flex flex-col gap-4 carousel-item md:max-w-[188px] max-w-[144px] max-h-[80px] md:min-h-[100px] border-solid border rounded-lg hover:border-[#6562E5] transition duration-300 ease-in-out bg-white"
              >
                <Testimonal image={image} text={text} user={user} />
              </Slider.Item>
            ))}
          </Slider>

          <>
            <div class="sm:block z-10 col-start-1 row-start-3 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] absolute xl:-left-[60px] -left-[13px] md:top-[24px] top-[26px]">
              <Slider.PrevButton class="btn !bg-white btn-circle btn-outline xl:right-1/2  min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] hover:!bg-[#FFF000] !border-solid !border-black !border-opacity-10 hover:!border-hidden hover:text-black">
                <Icon
                  class="hover:text-black w-[20px] !text-black"
                  size={20}
                  id="ChevronLeft"
                  strokeWidth={3}
                />
              </Slider.PrevButton>
            </div>
            <div class="sm:block z-10 col-start-3 row-start-3 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] absolute xl:-right-[58px] right-[2px] md:top-[24px] top-[26px]">
              <Slider.NextButton class="btn !bg-white btn-circle btn-outline  -left-[14%] xl:left-0 min-h-8 h-[32px] xl:h-[48px]  w-[32px] xl:w-[48px] hover:!bg-[#FFF000] hover:!border-hidden hover:text-black !border-black !border-opacity-10">
                <Icon
                  class="hover:text-black !text-black"
                  size={20}
                  id="ChevronRight"
                  strokeWidth={3}
                />
              </Slider.NextButton>
            </div>
          </>
          <Dots />

          <SliderJS rootId={id} />
        </div>
      )}
    </div>
  );
}
