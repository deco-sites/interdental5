import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  page: ProductDetailsPage | null;
}

function ProductSpecifications({ page }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    product,
  } = page;

  const specifications = product.isVariantOf?.additionalProperty;

  const hiddenNames = ["Cor", "sellerId", "Venda exclusiva CRO-CRM"];

  const filteredSpecifications = specifications
    ?.filter((spec) => !hiddenNames.includes(spec.name ?? ""))
    .filter(Boolean);

  return (
    <div class="container mx-4 lg:mx-auto w-auto mb-16">
      <h2 class="text-xl lg:text-[28px] text-black font-bold mb-8">
        Especificações
      </h2>
      <div>
        {filteredSpecifications?.map((spec, index) => (
          <div key={index} class="mb-4 odd:bg-white px-5 py-[14px]">
            <div class="flex">
              <strong class="min-w-[110px] lg:min-w-[280px] mr-[10px]">
                {spec.name}
              </strong>
              <div
                class="text-base font-normal text-black text-opacity-80"
                dangerouslySetInnerHTML={{ __html: spec.value ?? "" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSpecifications;
