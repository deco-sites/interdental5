import type { BreadcrumbList } from "apps/commerce/types.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  if (
    itemListElement.some(({ item }) =>
      item === "/estudantes" || item === "/equipamentos"
    )
  ) {
    return null;
  }

  return (
    <div class="breadcrumbs px-4 lg:px-0">
      <ul>
        {items
          .filter(({ name, item }) => name && item)
          .map(({ name, item }) => (
            <li class="text-[#545859] text-[12px] font-medium leading-4 tracking-[-0.1px] last:font-bold last:text-black before:text-[#9CA0AE] before:!opacity-100">
              <a
                class="!inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]"
                href={item}
              >
                {name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
