import { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";

export interface Layout {
  basics?: {
    ctaText?: string;
  };
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  layout?: Layout;
  hasAttachment?: string;
}

const relative = (url: string) => {
  const link = new URL(url);
  return `${link.pathname}${link.search}`;
};

function AddToCartShelfButton({
  product,
  layout,
  hasAttachment,
}: Props) {
  const {
    url,
    productID,
    isVariantOf,
  } = product;

  const hasVariant = isVariantOf?.hasVariant ?? [];
  const l = layout;

  const eventItem = mapProductToAnalyticsItem({
    product,
    quantity: 1,
  });

  const cta = (
    <a
      href={url && relative(url)}
      aria-label="view product"
      class="btn btn-block bg-[#27239E] hover:bg-[#6562E5] hover:border-none rounded-lg text-[#F9F9FF] font-bold text-base capitalize lg:!min-h-[48px] !max-h-10"
    >
      {l?.basics?.ctaText || "Adicionar"}
    </a>
  );

  const hasVariantAndAttachment = hasAttachment === "true" ||
    hasVariant.length > 1;

  return (
    <div class="w-full">
      {hasVariantAndAttachment ? cta : (
        <AddToCartButtonVTEX
          _class={`bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] w-auto w-full h-12 h-[48px] rounded-lg`}
          seller="1"
          hasAttachment={hasAttachment}
          productID={productID}
          eventParams={{ items: [eventItem] }}
          title="Adicionar"
        />
      )}
    </div>
  );
}

export default AddToCartShelfButton;
