import type { ItemAvailability, ProductLeaf } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/interdental/sdk/useOffer.ts";

export interface Possibility {
  productId: string;
  imageSku: string;
  name: string;
  price: number;
  url: string;
  availability: ItemAvailability | undefined;
}

const omit = new Set(["category", "cluster", "RefId"]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
): Possibility[] => {
  const possibilities: Possibility[] = [];

  for (const variant of variants) {
    const { url, additionalProperty = [], image, offers, productID } = variant;
    const specs = additionalProperty.filter(({ name }) => !omit.has(name!));

    const {
      availability,
    } = useOffer(offers);

    specs.map((spec) => {
      const possibility: Possibility = {
        productId: productID,
        imageSku: image?.[0].url ?? "",
        url: url ?? "",
        name: spec.value ?? "",
        price: offers?.lowPrice ?? 0,
        availability,
      };

      possibilities.push(possibility);
    });
  }

  return possibilities;
};
