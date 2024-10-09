import type { NotFoundProps } from "deco-sites/interdental/components/search/SearchResult.tsx";
import Icon from "$store/components/ui/Icon.tsx";

/**
 * Rendered when a not found is returned by any of the loaders run on this page
 */
function NotFound({
  bigTitle = "Oops!",
  bigTitleText = "Nenhum produto para ver aqui 😞",
  titleOptions = "O que eu posso fazer?",
  optionsPoints = [
    "Verifique os termos digitados",
    "Tente usar apenas uma palavra",
    "Use termos genericos na pesquisa",
    "Tente usar sinônimos do termo desejado",
  ],
}: NotFoundProps) {
  return (
    <div class="flex justify-center bg-[#F9F9FF] pt-[73px] pb-[42px] lg:mt-9 lg:pt-6 lg:pb-20">
      <div class="flex flex-col lg:flex-row w-max items-center md:w-[690px] ">
        <div class="flex items-center mb-[42px]  lg:mr-[168px] lg:mb-0 flex-col">
          <h2 class="text-[64px] max-w-[215px] text-black lg:text-[80px] font-black leading-[72px] mb-4">
            {bigTitle}
          </h2>
          <h3 class="text-black text-sm font-medium leading-tight">
            {bigTitleText}
          </h3>
        </div>
        <div class="flex flex-col w-[307px] h-[236px] p-8 bg-white">
          <h3 class="text-black text-base font-bold leading-normal mb-4">
            {titleOptions}
          </h3>
          <ul>
            {optionsPoints?.map((item) => (
              <li class="flex items-center text-black text-xs font-medium pb-5 last:pb-0">
                <Icon class="mr-[16px]" id="NotFoundBulletPoint" size={18} />
                {" "}
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
