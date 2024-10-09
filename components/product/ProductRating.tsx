import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useSignal } from "@preact/signals";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductRating({ page }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    product,
  } = page;
  const rating = product.aggregateRating;

  const selectedRating = useSignal(rating?.ratingValue ?? 0);
  return (
    <div className="rating rating-sm rating-half w-full lg:w-auto justify-center mb-1 lg:mb-0">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
        <>
          <input
            key={value}
            type="radio"
            name="rating-10"
            className={`bg-[#F3A448] mask mask-star-2 odd:mask-half-1 even:mask-half-2`}
            checked={value <= (selectedRating.value * 2)}
            disabled
          />
        </>
      ))}
      <span class="text-xs font-semibold text-[#40464D] ml-1 lg:mr-8">
        ({rating?.reviewCount})
      </span>
    </div>
  );
}

export default ProductRating;
