import Icon from "$store/components/ui/Icon.tsx";

export interface SecurityItem {
  label: "LetsEncrypt" | "PCI";
}

export interface SecurityContent {
  title?: string;
  items?: SecurityItem[];
}

export interface SecurityInfoProps {
  content: SecurityContent;
}

export default function SecurityInfo({
  content: {
    title = "Segurança",
    items = [],
  },
}: SecurityInfoProps) {
  return (
    <>
      <div class="lg:flex gap-4 justify-center items-center xl:mr-[124px]">
        <h3 className="text-base text-[#000] font-bold mb-4 lg:mb-0">
          {title}
        </h3>

        <ul class="flex flex-row gap-4 lg:justify-center items-center">
          <li>
            <span class="block max-w-[146px] h-[36px] lg:max-w-none lg:h-[46px]">
              <img
                class="w-auto h-full"
                loading="lazy"
                src="/image/pci-menor.png"
                alt="Certificado PCI"
              />
            </span>
          </li>

          {items.map(({ label }) => (
            <li>
              {/* Desktop icon */}
              <span class="hidden lg:block lg:w-auto xl:max-w-[190px]">
                <Icon height={46} width="auto" id={label} />
              </span>

              {/* Mobile icon */}
              <span class="block max-w-[146px] lg:hidden">
                <Icon height={36} width="auto" id={label} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
