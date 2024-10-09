import Avatar from "$store/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import Accordion from "deco-sites/interdental/components/ui/Accordion.tsx";
import MultiRangeSlider from "deco-sites/interdental/components/ui/PriceSlider.tsx";
import { useState } from "preact/hooks";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label }: FilterToggleValue,
) {
  return (
    <a href={url} rel="nofollow" class="flex items-center gap-2">
      <div
        aria-checked={selected}
        class="checkbox h-4 w-4 border-solid border-[1.5px] border-black rounded-[5px] hover:border-[#6562E5] hover:shadow"
      />
      <span class="text-sm font-medium text-[#101820]">{label}</span>
    </a>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  if (key === "price") {
    //parsing range values for price filter
    const valuesArray = Object.entries(values);

    const url = valuesArray[0][1].url;

    const urlPrice = url.split("&").slice(0, -1).filter((r) =>
      r.includes("filter.price")
    )[0]?.split("=")[1]?.split("%3A");
    const urlBrowser = url.split("&").slice(0, -1).filter((r) =>
      !r.includes("filter.price")
    ).join("&");
    const rangeArray: number[] = [];

    valuesArray.map((value) => {
      const aux = value[1].value.split(":");
      const auxArr = aux.map((r) => parseInt(r));
      rangeArray.push(...auxArr);
    });
    rangeArray.sort((a, b) => a - b);
    const minRange = rangeArray[0];
    const maxRange = rangeArray[rangeArray.length - 1];

    const [currentMaxMin, setCurrentMaxMin] = useState({
      max: urlPrice ? parseInt(urlPrice[1]) : maxRange,
      min: urlPrice ? parseInt(urlPrice[0]) : minRange,
    });

    let timeOutId = 0;
    let firstTime = 0;

    return (
      <div class={`h-16 mt-4 mb-10 xl:mb-0`}>
        <MultiRangeSlider
          darkBackground={true}
          min={minRange}
          max={maxRange}
          currentMin={currentMaxMin.min}
          currentMax={currentMaxMin.max}
          onChange={(query: { min: number; max: number }) => {
            if (
              currentMaxMin.max != query.max ||
              currentMaxMin.min != query.min
            ) {
              if (firstTime > 0) {
                clearTimeout(timeOutId);
                timeOutId = setTimeout(() => {
                  setCurrentMaxMin({ max: query.max, min: query.min });
                  window.location.href = urlBrowser + "&filter.price=" +
                    query.min + "%3A" + query.max;
                }, 500);
              }
              firstTime++;
            }
          }}
        />
      </div>
    );
  }

  return (
    <ul class={`flex flex-wrap gap-3 ${flexDirection}`}>
      {values.map((item) => {
        const { url, selected, value } = item;

        if (key === "cor" || key === "tamanho") {
          return (
            <a href={url} rel="nofollow">
              <Avatar
                content={value}
                variant={selected ? "active" : "default"}
              />
            </a>
          );
        }

        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const sortedFilters = filters
    .filter(isToggle)
    .sort((a, b) => {
      if (a.label.toLowerCase() === "preço") return 1;
      if (b.label.toLowerCase() === "preço") return -1;

      return a.label.localeCompare(b.label);
    });

  return (
    <ul className="flex flex-col gap-4 xl:gap-6 p-4 xl:p-0 xl:mt-6">
      {sortedFilters.map((filter) => (
        <div key={filter.label}>
          <Accordion title={filter.label}>
            <li className="flex flex-col gap-4 max-h-[148px] overflow-y-auto">
              <FilterValues {...filter} />
            </li>
          </Accordion>
          <div className="border-solid border-b border-base-200"></div>
        </div>
      ))}
    </ul>
  );
}

export default Filters;
