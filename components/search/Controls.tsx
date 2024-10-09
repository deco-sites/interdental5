import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "./Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";
import DepartamentName from "deco-sites/interdental/components/ui/DepartamentName.tsx";
import ClearFiltersButton from "deco-sites/interdental/components/ui/ClearFiltersButton.tsx";

export type Props =
  & Pick<
    ProductListingPage,
    "filters" | "sortOptions"
  >
  & {
    displayFilter?: boolean;
  };

function SearchControls({
  filters,
  displayFilter,
  sortOptions,
}: Props) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => (open.value = false)}
      aside={
        <>
          <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden min-w-[312px] xl:min-w-full">
            <div class="flex justify-start xl:justify-between items-center pl-4 h-7 mt-6">
              <Button
                class="btn btn-ghost"
                onClick={() => (open.value = false)}
              >
                <Icon id="CloseFilters" size={28} strokeWidth={2} />
              </Button>
              <h1 class="px-4 pl-3">
                <span class="font-bold text-xl text-[#000000]">Filtros</span>
              </h1>
            </div>
            <div class="overflow-auto border-none">
              <Filters filters={filters} />
            </div>
          </div>
          <ClearFiltersButton />
        </>
      }
    >
      <div class="flex flex-col items-center justify-between mb-4 px-4 md:px-4 xl:px-0 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px] xl:border-b xl:border-base-200 xl:pb-6 mt-[48px] xl:mt-0 gap-4 xl:h-full">
        <div class="flex">
          <DepartamentName />
        </div>

        <div class="flex xl:flex-row items-center justify-between xl:border-b xl:border-base-200 sm:gap-4 sm:border-none flex-row-reverse w-full gap-[10px] xl:justify-end">
          <Button
            class={displayFilter
              ? "btn-ghost bg-[#27239E] min-h-[32px] text-xs text-[#F9F9FF] font-bold"
              : "btn-ghost sm:hidden bg-[#27239E] min-h-[32px] text-xs text-[#F9F9FF] font-bold h-[32px] w-full flex-1 rounded-lg border-none"}
            onClick={() => {
              open.value = true;
            }}
          >
            <Icon id="IconFilter" width={16} height={16} />
            Filtrar
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
