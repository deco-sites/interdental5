import { Section } from "deco/blocks/section.ts";
import AsideMenu from "deco-sites/interdental/components/institutional/AsideMenu.tsx";

export interface Institutional {
  menuSelected: string;
  sections: Section[];
  menu: {
    menuHref: string;
    menuName: string;
  }[];
}

export default function Institutional({
  sections,
  menu,
  menuSelected,
}: Institutional) {
  if (!sections) return null;
  return (
    <div class="container flex flex-col lg:justify-start w-11/12 m-auto lg:mb-3 lg:flex-row lg:bg-transparent lg:mt-10 pt-8">
      <AsideMenu menu={menu} menuSelected={menuSelected} />
      <div class="flex-col max-w-3xl">
        {sections?.map((children) => (
          <children.Component
            {...children.props}
          />
        ))}
      </div>
    </div>
  );
}
