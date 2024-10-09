import { useMemo, useState } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";
import React from "https://esm.sh/v128/preact@10.15.1/compat/src/index.js";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (sortValue: string) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  urlSearchParams.set(SORT_QUERY_PARAM, sortValue);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

const portugueseMappings = {
  "relevance:desc": "Ordenar",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const sort = useSort();
  const defaultOption = sortOptions[0].value;

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSortSelection = (sortValue: string) => {
    applySort(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1 md:max-w-xs">
      <div className="relative text-left flex flex-1">
        <button
          id="dropdownDefaultButton"
          onClick={handleDropdownToggle}
          className="w-full flex-1 h-8 px-0 m-0 xl:text-[#00000080] text-xs xl:text-base cursor-pointer outline-none bg-[#f9f9ff] border border-solid border-[#27239E] xl:border-black xl:border-opacity-10 rounded-lg xl:m-0 xl:h-12 xl:min-w-[320px] text-[#27239E] xl:px-4 pl-0 flex items-center justify-center xl:justify-between gap-2 p-0 flex-row-reverse xl:flex-row font-bold xl:font-medium"
        >
          {portugueseMappings[
            sort as keyof typeof portugueseMappings
          ] ||
            portugueseMappings[
              defaultOption as keyof typeof portugueseMappings
            ] || "Ordenar"}

          <svg
            className={`w-2.5 h-2.5 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div
            id="dropdown"
            className="z-20 bg-[#f9f9ff] divide-y divide-gray-100 rounded-lg shadow absolute top-8 xl:top-12 w-full "
          >
            <ul className="py-2 text-sm xl:text-[#00000080] border-solid border border-base-200 rounded-lg text-[#27239E]">
              {sortOptions.map(({ value, label }) => (
                <li key={value}>
                  <a
                    href="#"
                    onClick={() => handleSortSelection(value)}
                    className="block px-4 py-2 xl:py-0 hover:bg-gray-100"
                  >
                    {portugueseMappings[
                      label as keyof typeof portugueseMappings
                    ] || label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sort;
