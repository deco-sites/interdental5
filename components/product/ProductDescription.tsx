import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductDescription({ page }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    product,
  } = page;
  const description = product.description;
  return (
    <div
      class="container mx-4 lg:mx-auto w-auto mt-8 lg:mt-0 mb-8 lg:mb-16"
      id="description"
    >
      <h2 class="text-xl lg:text-[28px] text-black font-bold mb-8">
        Descrição
      </h2>
      <div>
        <span class="text-base font-medium text-[#545859]">
          {description && (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </span>
      </div>
    </div>
  );
}

export default ProductDescription;
