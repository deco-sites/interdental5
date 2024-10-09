import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";

export interface Props {
  items: SiteNavigationElement[];
}

export type MenuProps = {
  item: SiteNavigationElement;
  categoryLevel?: number;
};

function MenuItem({ item, categoryLevel = 2 }: MenuProps) {
  const isLink = !item.children?.length;
  const isFirstLevel = categoryLevel === 2;

  const formatedUrl = item.url?.replace(
    "https://interdental.vtexcommercestable.com.br",
    "",
  );

  if (isLink) {
    return (
      <a
        href={formatedUrl}
        class={`text-sm text-[#27239E] flex pl-[3px]
        ${isFirstLevel ? "font-bold" : "font-medium"}
        `}
      >
        {item.name}
      </a>
    );
  }

  return (
    <details class="collapse collapse-arrow rounded-none">
      <summary class="collapse-title font-bold text-sm text-[#27239E] p-0 min-h-[auto] h-6 pl-[3px]">
        {item.name}
      </summary>

      <div class="collapse-content p-0 !pb-6">
        <ul class="flex flex-col gap-3 mt-3 relative left-[3px]">
          {item.children?.map((node) => (
            <li>
              <MenuItem item={node} categoryLevel={categoryLevel + 1} />
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

function Menu({ items }: Props) {
  console.log(items);
  return (
    <div class="flex flex-col h-full">
      <ul
        className={"Menu"}
        class="px-4 flex-grow flex flex-col bg-[#F9F9FF] !border-none"
      >
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <div class="flex flex-col py-0 bg-[#F9F9FF]">
        <ul class="flex flex-col  bg-[#F9F9FF] mx-6 gap-5  !border-t-[1px] !border-[#B7B5E875] pt-5 pb-12">
          <li>
            <a
              class="flex items-center gap-4 px-3 py-0 h-9"
              href="/institucional/fale-conosco"
              target="_blank"
            >
              <Icon id="ContactUs" size={20} strokeWidth={2} />
              <span class="text-sm font-bold text-[#27239E]">Fale conosco</span>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              class="flex items-center gap-3 px-3 py-0 h-9"
              href="https://api.whatsapp.com/send/?phone=5516997327682&text&type=phone_number&app_absent=0"
            >
              <Icon id="Help" size={20} strokeWidth={2} />
              <span class="text-sm font-bold text-[#27239E]">
                Contato
              </span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center gap-3 px-3 py-0 h-9"
              href="/about-us"
            >
              <Icon id="AboutUs" size={20} strokeWidth={2} />
              <span class="text-sm font-bold text-[#27239E]">
                Quem somos nós
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Menu;
