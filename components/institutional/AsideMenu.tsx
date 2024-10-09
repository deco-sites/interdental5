export interface AsideMenuProps {
  menu: {
    menuHref: string;
    menuName: string;
  }[];
  menuSelected: string;
}

export default function AsideMenu({ menu, menuSelected }: AsideMenuProps) {
  return (
    <div class="flex-col gap-4 mx-4 mb-10 lg:m-5 lg:mt-0 lg:mr-[68px] min-w-[300px] lg:flex ">
      <aside class="flex-col gap-4 items-center">
        <h3 class="text-black text-xl font-bold p-4">Atendimento</h3>
        <ul class="flex flex-col gap-2">
          {menu.map((element) => (
            <li class="flex justify-start items-center w-full h-[44px]">
              <a
                class={`text-black w-full h-full flex items-center justify-start pb-4 pt-4 pr-3 pl-4 text-[14px] leading-[20px] cursor-pointer ${
                  menuSelected === element.menuHref
                    ? "bg-[#27239E] font-bold text-white pl-6 rounded-lg"
                    : " bg-transparentfont-medium"
                }
                  
                `}
                href={element.menuHref}
              >
                {element.menuName}
              </a>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
