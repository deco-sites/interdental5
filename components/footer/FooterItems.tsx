export type Item = {
  label: string;
  href: string;
};

export type Section = {
  label: string;
  items: Item[];
};

export default function FooterItems(
  { sections, justify = false }: { sections: Section[]; justify: boolean },
) {
  return (
    <>
      {sections.length > 0 && (
        <>
          {/* Tablet and Desktop view */}
          <ul
            class={`hidden lg:flex flex-row gap-[2rem] xl:gap-8 ${
              justify && "lg:justify-between"
            }`}
          >
            {sections.map((section) => (
              <li class="w-[14rem]">
                <div class="flex flex-col gap-2">
                  <span class="font-bold text-[#27239E]">
                    {section.label}
                  </span>
                  <ul class={`flex flex-col gap-2 flex-wrap text-sm`}>
                    {section.items?.map((item) => (
                      <li>
                        <a
                          href={item.href}
                          class="block py-1 link link-hover text-[#545859]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile view */}
          <ul class="flex flex-col lg:hidden gap-4">
            {sections.map((section) => (
              <li>
                <div class="collapse collapse-arrow join-item lg:border-t border-base-200">
                  <input type="checkbox" class="min-h-[0]" />
                  <div class="collapse-title min-h-[0] !p-0 flex gap-2">
                    <span class="font-bold text-[#000]">{section.label}</span>
                  </div>
                  <div class="collapse-content p-0">
                    <ul
                      class={`flex flex-col p-0 pt-2`}
                    >
                      {section.items?.map((item) => (
                        <li>
                          <a
                            href={item.href}
                            class="block py-1 link link-hover text-[#000]"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
