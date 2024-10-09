import { useId } from "$store/sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface TopBarItem {
  topBarImage?: ImageWidget;
  topBarImageMobile?: ImageWidget;
  topBarDescription?: string;
}

export interface Props {
  topBar?: TopBarItem;
}

function TopBar({ topBar }: Props) {
  const id = useId();

  return (
    <div class="h-auto" id={id}>
      <img
        class="hidden lg:flex object-cover lg:object-fill xl:object-cover w-full h-10"
        src={topBar?.topBarImage}
        alt={topBar?.topBarDescription}
      />
      <img
        class="flex lg:hidden object-cover w-full h-11 md:object-contain xl:object-cover md:bg-[#6764d3]"
        src={topBar?.topBarImageMobile}
        alt={topBar?.topBarDescription}
      >
      </img>
    </div>
  );
}

export default TopBar;
