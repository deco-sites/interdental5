import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { useSignal } from "@preact/signals";
import WishlistButton from "deco-sites/interdental/components/wishlist/WishlistButton.tsx";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";
import ProductFlag, {
  ProductFlags,
} from "deco-sites/interdental/components/product/ProductFlag.tsx";
import { useOffer } from "deco-sites/interdental/sdk/useOffer.ts";
import Button from "deco-sites/interdental/components/ui/Button.tsx";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;

  layout: {
    width: number;
    height: number;
  };

  /** @description Edite as cores de flags de promoção em ordem de exibição */
  productFlags?: ProductFlags[];
}

/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const activeImage = useSignal(0);

  if (props.page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    page: { product: { image: images = [] } },
    productFlags,
  } = props;

  const { productID, isVariantOf, offers } = props.page.product;
  const { teasers } = useOffer(offers);
  const productGroupID = isVariantOf?.productGroupID ?? "";

  const changeImage = (index: number) => {
    return activeImage.value = index;
  };

  const carouselVertical = window.document?.querySelector(".carousel-vertical");

  const handleScroll = (scrollY: number, up: boolean) => {
    if (up) {
      carouselVertical?.scrollTo(0, scrollY -= 132);
    } else {
      carouselVertical?.scrollTo(0, scrollY += 132);
    }
  };

  return (
    <>
      <div id={id} class="grid grid-flow-row lg:grid-flow-col mt-0">
        <div class="hidden lg:flex lg:flex-col items-center">
          <div
            class="btn !bg-white btn-circle btn-outline xl:right-1/2  min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] hover:!bg-[#FFF000] !border-solid !border-black !border-opacity-10 hover:!border-hidden hover:text-black lg:mr-8"
            onClick={() => handleScroll(carouselVertical?.scrollTop ?? 0, true)}
          >
            <Icon size={20} id="ChevronUp" strokeWidth={3} />
          </div>
          <div class="carousel-vertical h-96 scroll-smooth my-2 overflow-y-hidden">
            {images.map((
              img,
              index,
            ) => ((
              <div
                className={`carousel-item rounded-2xl border-2 border-solid  justify-center w-28 h-28 m-2 ml-0 mr-[33px] mt-0 last:mb-0 last:pb-0 ${
                  activeImage.value === index
                    ? `border-[#6562E5]`
                    : `border-transparent`
                }`}
                key={index}
              >
                <Image
                  onClick={() => {
                    changeImage(index);
                  }}
                  class={"object-cover rounded-2xl"}
                  src={img.url!}
                  alt={img.alternateName}
                  width={112}
                  height={100}
                  preload={true}
                  loading="eager"
                />
              </div>
            )))}
          </div>
          <div
            class="btn !bg-white btn-circle btn-outline xl:right-1/2  min-h-8 h-[32px] xl:h-[48px] w-[32px] xl:w-[48px] hover:!bg-[#FFF000] !border-solid !border-black !border-opacity-10 hover:!border-hidden hover:text-black lg:mr-8"
            onClick={() =>
              handleScroll(carouselVertical?.scrollTop ?? 0, false)}
          >
            <Icon size={20} id="ChevronDownPDP" strokeWidth={1} />
          </div>
        </div>
        <div class="flex flex-col justify-center lg:relative lg:order-1">
          <div class="flex flex-wrap items-center absolute z-[1] top-44 left-4 lg:top-0 lg:left-0 px-[10px] pt-3 lg:p-3">
            {teasers?.map((teaser, index: number) => (
              <>
                <ProductFlag
                  key={index}
                  flagBgColor={productFlags?.[index]?.flagBgColor}
                  flagTextColor={productFlags?.[index]?.flagTextColor}
                  promoName={teaser.name}
                />
              </>
            ))}
          </div>
          <Slider class="carousel carousel-center gap-4 lg:gap-6 w-auto min-w-max  max-h-[466px] lg:mr-[73px] justify-center">
            {images.map((img, index) => (
              index === activeImage.value && (
                <Slider.Item
                  index={activeImage.value}
                  class="carousel-item max-w-[466px]"
                >
                  <Image
                    class={"!w-[92vw] lg:!w-[466px] !h-auto lg:!h-[466px] rounded-lg lg:scale-100 lg:hover:scale-150 ease-in duration-200"}
                    src={img.url!}
                    alt={img.alternateName}
                    width={466}
                    height={466}
                    preload={true} // Always preload the first image
                    loading="eager"
                  />
                </Slider.Item>
              )
            ))}
          </Slider>
          <div class="carousel flex gap-2 items-center xl:hidden justify-center mt-[8px] mx-4 mb-0">
            {images.map((
              _img,
              index,
            ) => ((
              <div
                class={`carousel-item h-4 w-4 flex items-center justify-center`}
                key={index}
              >
                <Button
                  class={`rounded-full border-none w-2 h-2 min-h-0 ${
                    activeImage.value === index
                      ? `bg-[#6562E5]`
                      : `bg-[#AEAEB2]`
                  }`}
                  onClick={() => {
                    changeImage(index);
                  }}
                  aria-label={`Imagem do produto ${index}`}
                >
                </Button>
              </div>
            )))}
          </div>
          <div class="hidden lg:w-auto lg:flex lg:justify-center lg:mr-[73px]">
            <WishlistButton
              variant="full"
              productID={productID}
              productGroupID={productGroupID}
            />
          </div>
        </div>
        <SliderJS rootId={id} />
      </div>
    </>
  );
}
