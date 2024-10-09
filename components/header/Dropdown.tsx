import Icon from "$store/components/ui/Icon.tsx";
import { Category } from "apps/commerce/types.ts";
import { useRef } from "preact/hooks";

interface Props {
  categories: Category | Category[];
}

interface CategoryType {
  url?: string;
  name?: string;
  children?: Category[];
}

export type MenuProps = {
  item: CategoryType;
  categoryLevel?: number;
};

function DropdownItem({ item, categoryLevel = 1 }: MenuProps) {
  const isLink = !item.children?.length;
  const isFirstLevel = categoryLevel === 1;
  const formatedUrl = item.url?.replace(
    "https://interdental.vtexcommercestable.com.br",
    "",
  );

  if (isLink) {
    return (
      <a
        href={formatedUrl}
        className={`text-sm text-[#545859] flex px-0
        ${isFirstLevel ? "font-bold" : "font-medium"}
        `}
      >
        {item.name}
      </a>
    );
  } else {
    return (
      <details className="collapse collapse-arrow rounded-none">
        <summary className="collapse-title font-bold text-sm p-0 min-h-[auto] left-[3px] xl:left-0">
          {item.name}
        </summary>
        <div className="collapse-content p-0">
          <ul className="flex flex-col gap-3 mt-3 relative left-[3px]">
            {item.children?.map((node: Category) => (
              <li className="p-0">
                <span className="font-normal">
                  <DropdownItem item={node} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </details>
    );
  }
}

export default function DropdownMenu({ categories }: Props) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    if (detailsRef.current) {
      detailsRef.current.open = false;
    }
  };

  return (
    <details
      ref={detailsRef}
      class="dropdown self-start absolute top-0 border-none "
    >
      <summary class="btn bg-white hover:bg-white border-none">
        <Icon id={"Hamburguer"} size={20} />
        <h3 class="font-bold text-base text-[#27239E] ml-4 normal-case">
          Todas as categorias
        </h3>
      </summary>
      <div class="relative">
        <div
          class="fixed hidden xl:flex hover:flex group-hover:flex inset-0 bg-black bg-opacity-50 z-10 top-[224px]"
          onClick={closeMenu}
        >
        </div>
        <div className="flex container relative z-20 top-0">
          <ul class="flex-grow flex flex-col min-w-[328px] max-w-[328px] p-6 xl:divide-base-200 overflow-y-scroll h-[32rem] bg-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-none scrollbar-thumb-[#6562E5] scrollbar-track-slate-300 gap-5 border-t border-base-200">
            {(categories as Category[]).map((category: Category) => (
              <li>
                <DropdownItem item={category} />
              </li>
            ))}
          </ul>
          <img
            src="/image/dropdown-menu.png"
            alt={"dropdown-menu"}
            width={476}
            height={512}
          >
          </img>
        </div>
      </div>
    </details>
  );
}
