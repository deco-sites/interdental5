import { useId } from "$store/sdk/useId.ts";

export interface TabItemType {
  tabItemTitle?: string;
  tabItemLink?: string;
}

export interface Props {
  tabItems?: TabItemType[];
}

function TabItem({ tabItems = [] }: Props) {
  const id = useId();
  const url = window.location.pathname;

  return (
    <div class="h-10 flex py-1 gap-2 xl:gap-0" id={id}>
      {tabItems.map((tabItem) => (
        <a
          href={tabItem.tabItemLink}
          class={`flex items-center py-1 px-4 w-auto rounded-t-2xl lg:mr-2 cursor-pointer hover:underline hover:decoration-[#27239E] ${
            url === tabItem.tabItemLink
              ? `bg-[#F9F9FF] lg:bg-[#6562E5]`
              : `bg-none`
          }`}
          data-tip={tabItem?.tabItemTitle}
        >
          <span
            data-tip={tabItem?.tabItemTitle}
            class={`font-bold text-sm lg:text-base ${
              url === tabItem.tabItemLink
                ? `text-[#27239E] lg:text-white`
                : `text-[#27239E]`
            }`}
          >
            {tabItem?.tabItemTitle}
          </span>
        </a>
      ))}
    </div>
  );
}

export default TabItem;
