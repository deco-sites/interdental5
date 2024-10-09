import Icon from "$store/components/ui/Icon.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useAutocomplete } from "$store/hooks/useAutocomplete.ts";
import { useUI } from "$store/sdk/useUI.ts";
import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/engine/core/resolver.ts";
import { useEffect, useRef, useState } from "preact/compat";
import type { Platform } from "$store/apps/site.ts";
import Button from "deco-sites/interdental/components/ui/Button.tsx";
import { formatPrice } from "deco-sites/interdental/sdk/format.ts";
import { useTopSearches } from "deco-sites/interdental/hooks/useTopSearches.ts";

// Editable props
export interface Props {
  placeholder?: string;
  action?: string;
  name?: string;
  loader: Resolved<Suggestion | null>;
  platform?: Platform;
}

function Searchbar({
  placeholder = "What are you looking for?",
  action = "/s",
  name = "q",
}: Props) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showTopSearches, setShowTopSearches] = useState(false);

  const id = useId();
  const { displaySearchPopup } = useUI();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const { setSearch, suggestions, loading } = useAutocomplete();
  const { products = [], searches = [] } = suggestions.value ?? {};
  const [searchTerm, setSearchTerm] = useState("");
  const { topSearches } = useTopSearches();

  const handleInput = (e: { currentTarget: { value: string } }) => {
    const value = e.currentTarget.value;
    if (value) {
      setShowSuggestions(true);
      setShowTopSearches(false);
      sendEvent({
        name: "search",
        params: { search_term: value },
      });
    } else {
      setShowSuggestions(false);
      setShowTopSearches(true);
    }
    setSearchTerm(value);
    setSearch(value);
  };

  const hasProducts = Boolean(products.length);
  const hasTerms = Boolean(searches.length);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modal.current &&
        !modal.current.contains(event.target as HTMLElement) &&
        searchInputRef.current !== event.target as HTMLInputElement
      ) {
        setShowSuggestions(false);
        setShowTopSearches(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modal]);

  return (
    <div class="w-auto md:min-w-[266px] lg:min-w-[416px] xl:min-w-[608px] mx-6 pt-6 xl:pt-0 py-0 md:mx-0 xl:p-0 xl:h-[48px] focus:outline-none">
      <form
        id={id}
        action={action}
        class={`flex flex-grow relative h-[40px] px-0 ${
          !displaySearchPopup.value ? "justify-end" : "border-none"
        }`}
      >
        <input
          id="searchbar"
          ref={searchInputRef}
          class={`input join-item flex-grow border-r-0 rounded-lg border border-solid font-medium border-[#6562E5]/50 rounded-tr-none rounded-br-none min-h-[40px] max-h-10 xl:min-h-[48px] xl:max-h-[48px] focus:outline-none`}
          aria-label="Barra de pesquisa"
          aria-expanded={!hasProducts && !hasTerms ? "false" : "true"}
          name={name}
          onClick={() => setShowTopSearches(true)}
          onInput={handleInput}
          placeholder={placeholder}
          role="combobox"
          aria-controls="search-suggestion"
          autocomplete="off"
        />

        <Button
          type="submit"
          class="join-item btn-square bg-white hover:bg-transparent border border-solid border-l-0 rounded-lg border-[#6562E5]/50 hover:border-[#6562E5]/50 rounded-tl-none rounded-bl-none min-h-[40px] max-h-10 xl:min-h-[48px] xl:max-h-[48px]"
          aria-label="Search"
          for={id}
          tabIndex={-1}
        >
          {loading.value
            ? <span class="loading loading-spinner loading-xs" />
            : <Icon id="Search" size={24} />}
        </Button>
      </form>

      {showTopSearches && (
        <div
          ref={modal}
          class="flex absolute mt-2 xl:mt-4 mr-0 max-w-[608px] max-[640px]:left-0 w-full"
        >
          <div class="flex flex-col h-full xl:h-[400px] lg:w-52 xl:w-[28rem] min-[1360px]:w-[33rem] min-[1430px]:w-[38rem] min-[1530px]:w-[43rem] min-[1910px]:w-[66.6rem] gap-4 z-10  bg-white border border-solid border-[#9CA0AE66] rounded-lg w-full mx-6 md:mx-0 md:min-w-[266px] md:w-auto lg:min-w-[416px">
            <div class="flex flex-col">
              <span
                class="text-sm font-bold text-[#101820] p-4 pt-6 lg:pt-4  border-base-200"
                role="heading"
                aria-level={3}
              >
                Termos mais buscados
              </span>
              <div class="flex flex-col gap-0.5 p-0 pb-4">
                {topSearches.value.map((topSearch, index) => (
                  <div class="flex gap-2 h-[32px] mt-0 mb-0 mx-4 px-2 items-center p-0 text-[rgba(0, 0, 0, 0.80)] hover:text-[#6562E5] hover:rounded-lg hover:bg-[#cdd5ed33]">
                    <span class="rounded-lg bg-[#F9F9FF] text-xs !text-[#27239E] font-bold w-[20px] h-[20px] flex justify-center items-center">
                      {index + 1}
                    </span>
                    <a
                      class="text-sm font-medium capitalize"
                      href={`/s?q=${topSearch.term}`}
                    >
                      {topSearch.term}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showSuggestions && (
        <div
          ref={modal}
          class="flex absolute mt-2 xl:mt-4 mr-0 max-w-[608px] max-[640px]:left-0 w-full"
        >
          <div class="flex lg:grid flex-col-reverse h-full xl:h-[378px] lg:w-52 xl:w-[28rem] min-[1360px]:w-[33rem] min-[1430px]:w-[38rem] min-[1530px]:w-[43rem] min-[1910px]:w-[66.6rem] xl:gap-4 grid-cols-1 sm:grid-rows-1 sm:grid-cols-[192px_1fr] z-10 bg-white border border-solid border-[#9CA0AE66] rounded-lg w-full mx-6 md:mx-0 md:min-w-[266px] md:w-auto lg:min-w-[416px]">
            <div class="flex flex-col gap-0 max-h-[176px] xl:max-h-none xl:border-r xl:border-solid xl:border-[#9CA0AE66]">
              <span
                class="text-sm font-bold text-[#101820] p-4 pt-6 lg:pt-4  border-base-200"
                role="heading"
                aria-level={3}
              >
                Termos sugeridos
              </span>
              <ul
                id="search-suggestion"
                class="flex flex-col gap-0.5  overflow-hidden xl:gap-4 px-6 pt-0 p-6 max-h-[116px] xl:max-h-none xl:max-[768px]:overflow-y-scroll mr-4 xl:mr-0 mb-3 xl:mb-0 text-sm"
              >
                {searches.map(({ term }) => (
                  <li>
                    <a
                      href={`/s?q=${term}`}
                      class="flex gap-4 items-center text-sm font-medium text-[rgba(0, 0, 0, 0.80)] h-[32px]"
                    >
                      <span dangerouslySetInnerHTML={{ __html: term }} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div class="flex flex-col pt-0 border-b boder-[#9ca0ae66]">
              <span
                class="text-sm font-bold text-[#101820] p-4 lg:pl-0"
                role="heading"
                aria-level={3}
              >
                Produtos para {searchTerm}
              </span>
              <div class="flex flex-col pt-0 overflow-x-hidden overflow-y-scroll mr-4 mb-5 max-h-[286px] xl:max-h-full ">
                {products.map((product, index) => (
                  <a
                    class="xl:h-[76px] h-[96px] flex items-center px-4 my-[6px] lg:px-0"
                    href={product.url}
                    key={index}
                  >
                    <div class="h-[82px] flex items-center">
                      <img
                        class="w-16 h-16 mr-4"
                        src={product.image?.[0].url}
                        alt={product.name}
                      />
                    </div>
                    <div class="flex flex-col max-[1440px]:max-w-[268px]">
                      <span class="text-sm font-normal capitalize text-black">
                        {product.isVariantOf?.name}
                      </span>
                      <span class="text-sm font-bold text-[#27239E]">
                        {formatPrice(
                          product.offers?.offers?.[0].price,
                          product.offers?.priceCurrency,
                        )}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
