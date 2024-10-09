import Slider from "deco-sites/interdental/components/ui/Slider.tsx";
import Icon, {
  AvailableIcons,
} from "deco-sites/interdental/components/ui/Icon.tsx";
import { useSignal } from "@preact/signals";

export interface Props {
  icon?: AvailableIcons;
  iconHovered?: AvailableIcons;
  sizeDesktop?: number;
  sizeMobile?: number;
}

export default function PrevButtonShelf({
  icon,
  iconHovered,
  sizeDesktop,
  sizeMobile,
}: Props) {
  const idIcon = useSignal(icon);

  const handleMouseEnter = () => {
    if (iconHovered) {
      idIcon.value = iconHovered;
    }
  };

  const handleMouseLeave = () => {
    idIcon.value = icon;
  };

  return (
    <>
      <div
        class="hidden lg:flex items-center justify-center z-10 col-start-1 row-start-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <Slider.PrevButton class="btn btn-circle bg-transparent border-none">
          {icon && (
            <Icon
              size={sizeDesktop}
              id={idIcon.value || "BannerLeft"}
              strokeWidth={1}
            />
          )}
        </Slider.PrevButton>
      </div>
      <div
        class="relative -left-[21px] -bottom-[114px] lg:hidden items-center justify-center z-10 col-start-1 row-start-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseEnter}
        onTouchEnd={handleMouseLeave}
      >
        <Slider.PrevButton class="absolute btn btn-circle bg-transparent border-none">
          {icon && (
            <Icon
              size={sizeMobile}
              id={idIcon.value || "BannerLeft"}
              strokeWidth={1}
            />
          )}
        </Slider.PrevButton>
      </div>
    </>
  );
}
