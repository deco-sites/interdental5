import { useSignal } from "@preact/signals";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  image?: ImageWidget;
  imageHovered?: ImageWidget;
  width?: number;
  height?: number;
}

export default function ImageHovered({
  image,
  imageHovered,
  width = 188,
  height = 88,
}: Props) {
  const src = useSignal(image);

  const handleMouseEnter = () => {
    if (imageHovered) {
      src.value = imageHovered;
    }
  };

  const handleMouseLeave = () => {
    src.value = image;
  };
  return (
    <>
      <figure
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <Image
          class="card rounded-none w-[152px] max-h-[88px] lg:w-full object-cover"
          src={src.value || ""}
          width={width}
          height={height}
          loading="lazy"
        />
      </figure>
    </>
  );
}
