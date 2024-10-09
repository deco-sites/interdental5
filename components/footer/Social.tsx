import Icon from "$store/components/ui/Icon.tsx";

export interface SocialItem {
  label:
    | "Discord"
    | "Facebook"
    | "Instagram"
    | "Linkedin"
    | "Tiktok"
    | "Twitter";
  link: string;
}

export default function Social(
  { content, vertical = false }: {
    content?: { title?: string; items?: SocialItem[] };
    vertical?: boolean;
  },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col lg:flex-row gap-4 justify-between lg:items-center">
          {content.title && (
            <h3 class="text-base whitespace-nowrap font-bold text-[#000]">
              {content.title}
            </h3>
          )}
          <ul
            class={`flex gap-4 ${
              vertical ? "lg:flex-row lg:items-start" : "flex-row items-center"
            }`}
          >
            {content.items.map((item) => {
              return (
                <li>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${item.label} Logo`}
                    class="flex gap-2 items-center"
                  >
                    <span class="flex flex-row p-1 ">
                      <Icon size={32} id={item.label} />
                    </span>
                    {vertical && (
                      <div class="text-sm hidden lg:block">{item.label}</div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
