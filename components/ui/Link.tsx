import Icon from "deco-sites/interdental/components/ui/Icon.tsx";
import { AvailableIcons } from "deco-sites/interdental/components/ui/Icon.tsx";

export interface LinkItem {
  label?: string;
  icon?: AvailableIcons;
  link?: string;
}

export interface Props {
  links?: Array<LinkItem>;
}

export default function Link({ links }: Props) {
  return (
    <div class="flex flex-row">
      {links?.map((link) => {
        return (
          <a
            href={link.link}
            target="_blank"
            class={`flex items-center text-base-content xl:px-3`}
            data-tip={link.label}
          >
            <div class="w-10 flex justify-center">
              {link.icon && <Icon id={link.icon} size={16} />}
            </div>
            <div class="w-auto pr-0 text-[#6562E5] font-bold text-sm">
              {link.label}
            </div>
          </a>
        );
      })}
    </div>
  );
}
