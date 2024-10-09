import { SendEventOnView } from "$store/components/Analytics.tsx";
import AddToCartButtonVTEX from "$store/islands/AddToCartButton/vtex.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import ShippingSimulation from "$store/islands/ShippingSimulation.tsx";
import WishlistButton from "$store/islands/WishlistButton.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { ProductDetailsPage, Teasers } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "$store/islands/ProductVariantSelector.tsx";
import Banner from "deco-sites/interdental/sections/Images/Banner.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import QuantitySelector from "deco-sites/interdental/components/ui/QuantitySelector.tsx";
import { useState } from "preact/hooks";
import ProductAttachment from "deco-sites/interdental/sections/Product/ProductAttachments.tsx";
import ProductRating from "deco-sites/interdental/components/product/ProductRating.tsx";

export interface Props {
  bannerImage?: {
    desktop?: ImageWidget;
    mobile?: ImageWidget;
  };
  page: ProductDetailsPage | null;
  layout: {
    /**
     * @title Product Name
     * @description How product title will be displayed. Concat to concatenate product and sku names.
     * @default product
     */
    name?: "concat" | "productGroup" | "product";
  };
}

interface PromoInfo {
  promo: Teasers | null;
  percentualDiscount: number | string | null;
}

function ProductInfo({ page, bannerImage }: Props) {
  const platform = "vtex";
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    breadcrumbList,
    product,
  } = page;

  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
  } = product;

  const {
    price = 0,
    listPrice,
    seller = "1",
    installments,
    availability,
    teasers,
  } = useOffer(offers);

  const hasVariant = isVariantOf?.hasVariant;
  const productGroupID = isVariantOf?.productGroupID;
  const specifications = product.isVariantOf?.additionalProperty;
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const [quantities, setQuantities] = useState<{ [productId: string]: number }>(
    {
      [productID]: 1,
    },
  );

  const eventItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
    quantity: 1,
  });

  const handleQuantityChange = (newQuantity: number) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productID]: newQuantity,
    }));
  };

  const hasAttachment = globalThis?.localStorage?.getItem("hasAttachment") ??
    "false";
  const customName = globalThis?.localStorage?.getItem("customName") ?? "";

  const filteredExclusiveSell = specifications?.filter((spec) => {
    return spec.name === "Venda exclusiva CRO-CRM" && spec.value === "Sim";
  });

  function filterPromoAndExtractDiscount(
    teasers: Teasers[] | undefined,
    keyword: string,
  ): PromoInfo | null {
    const cleanKeyword = keyword.trim().toLowerCase().replace(/\s+/g, " ");
    const promo = teasers?.find((promoName) => {
      const cleanName = promoName.name.trim().toLowerCase().replace(
        /\s+/g,
        " ",
      );
      return cleanName.includes(cleanKeyword);
    });
    if (promo) {
      const percentualDiscount = 5;
      return { promo, percentualDiscount };
    }

    return null;
  }

  const productSpecifications = specifications?.find(({ name }) =>
    name === "Informações Importantes"
  );

  const filteredPromoBoleto = filterPromoAndExtractDiscount(teasers, "boleto");

  const calcDiscount = (promo: PromoInfo) => {
    const percentualDiscount = promo.percentualDiscount
      ? parseFloat(promo.percentualDiscount as string)
      : 0;

    const result = price - (price * (percentualDiscount / 100));

    return result;
  };

  const flagDiscount = (
    listPriceCalc: number | undefined,
    priceCalc: number,
  ) => {
    if (listPriceCalc) {
      const result = ((listPriceCalc - priceCalc) / listPriceCalc) * 100;

      return result.toFixed();
    }
  };

  const discountPercentage = 5;
  const discountedPrice = offers?.lowPrice! -
    (offers?.lowPrice! * (discountPercentage / 100));
  const formattedPrice = discountedPrice.toFixed(2).toString().replace(
    ".",
    ",",
  );

  return (
    <div
      class="flex flex-col mt-0 container mx-4 lg:mx-0 w-auto lg:w-full"
      id={id}
    >
      {/* Banner */}
      <Banner
        bannerImage={bannerImage}
        _classImage="min-h-[56px] lg:min-h-[60px] max-h-[60px] max-w-[512px]"
        _class="!mt-0 !mb-4 lg:!mb-[22px]"
      />
      {/* Code and name */}
      <div class="pb-2 border-b-2 border-[#F4F4F4]">
        <h1 class="text-center lg:text-start font-bold text-base lg:text-xl text-black">
          {isVariantOf?.name ?? name}
        </h1>
        <div>
          <div class="flex mt-2 flex-wrap justify-center lg:justify-start">
            <ProductRating page={page} />
            {gtin && (
              <span class="text-xs font-medium text-black lg:text-[#545859]">
                Cód. {gtin}
              </span>
            )}
            <a
              class="ml-auto lg:ml-8 text-xs font-medium text-[#27239E]"
              href="#description"
            >
              Ver descrição
            </a>
          </div>
        </div>
      </div>

      <div
        class="text-base font-normal text-black text-opacity-80 mt-2"
        dangerouslySetInnerHTML={{ __html: productSpecifications?.value ?? "" }}
      />

      {/* Prices */}
      {availability === "https://schema.org/InStock"
        ? (
          <div class="mt-4 lg:mt-5 pb-2  border-[#F4F4border-b-2F4] mb-0">
            <div class="flex flex-col gap-1 items-start">
              {(listPrice ?? 0) > price && (
                <span class="line-through text-sm font-medium text-black text-opacity-80">
                  {formatPrice(listPrice, offers?.priceCurrency)}
                </span>
              )}
              <div class="flex flex-row items-center">
                <span class="text-xl lg:text-2xl font-bold text-[#27239E]">
                  {formatPrice(price, offers?.priceCurrency)}
                </span>
                {(listPrice ?? 0) > price && (
                  <span class="px-1 py-[2px] bg-[#B6EFB1] rounded font-bold text-xs text-[#103630] flex flex-row h-5 ml-4 items-center">
                    <Icon id="DiscountBadge" size={12} class={"mr-1"} />
                    {flagDiscount(listPrice, price)}%
                  </span>
                )}
              </div>
            </div>
            {installments !== null
              ? (
                <p
                  class="text-sm font-medium text-black text-opacity-80 mr-28 lg:mr-0"
                  dangerouslySetInnerHTML={{
                    __html: `${installments} ${
                      filteredPromoBoleto !== null
                        ? `ou <strong>${
                          formatPrice(
                            calcDiscount(filteredPromoBoleto),
                            offers?.priceCurrency,
                          )
                        }</strong> à vista no Boleto`
                        : ""
                    }`,
                  }}
                >
                  {installments}
                </p>
              )
              : <></>}
          </div>
        )
        : <></>}
      <>
        <div class="flex flex-row items-center mb-1 mt-2">
          <span class="text-base font-bold text-[#27239E] mr-1">
            R$ {formattedPrice}
          </span>
          <div class="flex text-xs text-[#F0FFFD] bg-[#259759] rounded h-5 px-2 py-[2px] font-bold">
            <Icon id="PixPDP" size={16} class={"mr-1"} />
            5% À VISTA BOLETO OU PIX
          </div>
        </div>
      </>
      <ProductAttachment skuId={productID} />
      {filteredExclusiveSell?.[0]?.value !== "Sim"
        ? (
          <div class="flex max-h-11 mb-[-0.7rem] items-center lg:justify-end lg:hidden">
            <WishlistButton
              variant="full"
              productID={productID}
              productGroupID={productGroupID}
            />
          </div>
        )
        : <></>}

      {/* Flag CRO/CRM */}
      {filteredExclusiveSell?.[0]?.value === "Sim"
        ? (
          <div class="flex py-[2px] px-2 bg-[#B7112F] rounded h-auto lg:h-5 w-fit mt-3">
            <span class="text-xs font-bold text-[#F9F9FF]">
              Atenção | Venda exclusiva para profissionais habilitados mediante
              verificação de documentação
            </span>
          </div>
        )
        : <></>}

      {/* Sku Selector */}
      {hasVariant?.length != 1
        ? (
          <div class="mt-4 sm:mt-6">
            <ProductSelector product={product} />
          </div>
        )
        : <></>}

      {/* Add to Cart and Favorites button */}
      {hasVariant?.length == 1
        ? (
          <>
            {availability === "https://schema.org/InStock"
              ? (
                <div class="mt-4 lg:mt-6 flex flex-col lg:flex-row">
                  {platform === "vtex" && (
                    <>
                      <QuantitySelector
                        quantity={quantities[productID]}
                        onChange={(newQuantity) =>
                          handleQuantityChange(newQuantity)}
                        _class="!h-12 !w-full mb-4 lg:mb-0 lg:!w-[174px] mr-4"
                      />
                      <AddToCartButtonVTEX
                        _class={`bg-[#27239E] font-bold text-base border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] w-auto lg:w-[374px] h-12 min-h-fit rounded-lg  ${
                          quantities[productID] === 0
                            ? "pointer-events-none bg-black bg-opacity-10 border-black border-opacity-10 text-black text-opacity-50"
                            : ""
                        }`}
                        title="Adicionar ao carrinho"
                        eventParams={{ items: [eventItem] }}
                        productID={productID}
                        seller={seller}
                        quantity={quantities[productID]}
                        icon="CartPDP"
                        hasAttachment={hasAttachment}
                        customName={customName}
                      />
                    </>
                  )}
                </div>
              )
              : (
                <div class="mt-6 mb-0 lg:mb-16 flex flex-col lg:flex-row">
                  <OutOfStock productID={productID} />
                </div>
              )}
          </>
        )
        : <></>}

      {/* CRO/CRM Text */}
      {filteredExclusiveSell?.[0]?.value === "Sim"
        ? (
          <div>
            <p class="text-sm lg:text-xs font-medium text-[#B7112F] pt-4 lg:pt-2 tracking-[-0.1px]">
              Segundo determinação da ANVISA a venda de medicamentos só será
              permitida para profissionais com registro no conselho de classe e
              com apresentação da licença sanitária. <br /> <br />

              Pedidos efetuados por profissionais sem CRO serão cancelados,
              mesmo após confirmação de pagamento. <br />{" "}
              **Devido a necessidade de refrigeração, a venda deste produto está
              limitado ao estado de São Paulo.
            </p>
            <div class="flex justify-center max-h-9 lg:hidden">
              <WishlistButton
                variant="full"
                productID={productID}
                productGroupID={productGroupID}
              />
            </div>
          </div>
        )
        : <></>}

      {/* Shipping Simulation */}
      {availability === "https://schema.org/InStock"
        ? (
          <div class="mt-4 lg:mt-6 mb-4 lg:mb-16">
            {platform === "vtex" && (
              <ShippingSimulation
                items={[{
                  id: Number(product.sku),
                  quantity: 1,
                  seller: seller,
                }]}
              />
            )}
          </div>
        )
        : <></>}

      {/* Analytics Event */}
      <SendEventOnView
        id={id}
        event={{
          name: "view_item",
          params: {
            item_list_id: "product",
            item_list_name: "Product",
            items: [eventItem],
          },
        }}
      />
    </div>
  );
}

export default ProductInfo;
