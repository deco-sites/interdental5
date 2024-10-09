import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/FeaturedProductCard.tsx";
import Filters from "./Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import NotFound from "deco-sites/interdental/sections/Product/NotFound.tsx";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
}

export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  notFoundInfo?: NotFoundProps;
}

export interface NotFoundProps {
  /** @title NotFound-Content */
  /** @description adicione o conteudo da página not found*/
  bigTitle?: string;
  bigTitleText?: string;
  titleOptions?: string;
  optionsPoints?: string[];
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 0,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;

  const id = useId();

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      <div class="container px-0 sm:pb-[60px] xl:mt-10">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row xl:gap-11">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden sm:block w-min min-w-[274px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center mt-4 mb-12 xl:mb-3 xl:max-w-[962px] xl:ml-auto  xl:mt-8">
          <div class="join items-center">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="btn !bg-white btn-circle btn-outline join-item min-h-8 h-[44px] w-[68px] hover:!bg-indigo-200 hover:!bg-opacity-60 !border-solid !border-[#27239E]   hover:text-[#27239E] !rounded-lg"
            >
              <Icon id="ChevronLeftPagination" size={24} strokeWidth={2} />
            </a>
            <span class="btn btn-ghost join-item text-base font-bold text-[#27239E] hover:!bg-transparent">
              Página {zeroIndexedOffsetPage + 1}
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="btn !bg-white btn-circle btn-outline  join-item min-h-8 h-[44px]  w-[68px]  hover:!bg-indigo-200 hover:!bg-opacity-60 !border-solid !border-[#27239E]  hover:text-[#27239E] !rounded-lg"
            >
              <Icon id="ChevronRightPagination" size={24} strokeWidth={2} />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...useOffer(product.offers),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, notFoundInfo, ...props }: Props) {
  if (!page || page.products.length === 0) {
    return <NotFound {...notFoundInfo} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
