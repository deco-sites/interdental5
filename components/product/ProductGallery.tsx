import FeaturedProductCard, {
  Layout as CardLayout,
} from "$store/components/product/FeaturedProductCard.tsx";
import { Product } from "apps/commerce/types.ts";

export interface Columns {
  mobile?: 1 | 2;
  desktop?: 2 | 3 | 4;
}

export interface Props {
  products: Product[] | null;
  offset: number;
  layout?: {
    card?: CardLayout;
    columns?: Columns;
  };
}

const MOBILE_COLUMNS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
};

const DESKTOP_COLUMNS = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

function ProductGallery({ products, layout, offset }: Props) {
  const platform = "vtex";
  const mobile = MOBILE_COLUMNS[layout?.columns?.mobile ?? 2];
  const desktop = DESKTOP_COLUMNS[layout?.columns?.desktop ?? 3];

  return (
    <div
      class={`grid ${mobile} gap-2 items-center ${desktop} xl:gap-6 xl:mt-4 px-4 xl:px-0 gap-y-4 xl:gap-y-8`}
    >
      {products?.map((product, index) => (
        <FeaturedProductCard
          product={product}
          preload={index === 0}
          index={offset + index}
          layout={layout?.card}
          platform={platform}
        />
      ))}
    </div>
  );
}

export default ProductGallery;
