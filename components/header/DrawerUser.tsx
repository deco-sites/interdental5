import Icon from "$store/components/ui/Icon.tsx";
import { useUser } from "apps/vtex/hooks/useUser.ts";

function DrawerUser() {
  const { user } = useUser();
  const userName = user.value?.givenName;
  const account = "interdental";
  const returnUrl = "https://www.lojainterdental.com.br/";

  function handleLogoutClick(e: MouseEvent) {
    e.preventDefault();
    window.location.href =
      `/api/vtexid/pub/logout?scope=${account}&returnUrl=${returnUrl}`;
  }

  return (
    <>
      <div class="h-auto">
        <ul class="flex flex-col py-2 px-6 bg-[#F9F9FF] h-full">
          {userName && (
            <li class="flex items-center gap-4 px-4 py-3">
              <Icon id="UserMobile" size={20} strokeWidth={2} />
              <span class="text-xl font-bold text-[#27239E]">
                Olá, {userName}
              </span>
            </li>
          )}
          <li>
            <a
              class="flex items-center gap-4 px-4 py-3"
              href="https://www.lojainterdental.com.br/login-user"
            >
              <span class="text-sm font-bold text-[#27239E]">Minha conta</span>
            </a>
          </li>
          <li>
            <a class="flex items-center gap-4 px-4 py-3" href="/wishlist">
              <span class="text-sm font-bold text-[#27239E]">Meus pedidos</span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center gap-4 px-4 py-3"
              href="/wishlist"
            >
              <span class="text-sm font-bold text-[#27239E]">
                Meus favoritos
              </span>
            </a>
          </li>
          <li>
            {userName && (
              <button
                class="flex items-center gap-4 px-4 py-3"
                onClick={handleLogoutClick}
              >
                <span class="text-sm font-bold text-[#27239E]">
                  Sair
                </span>
              </button>
            )}
          </li>
        </ul>
      </div>

      <div class="flex flex-col py-0 bg-[#F9F9FF] h-screen">
        <ul class="flex flex-col  bg-[#F9F9FF] mx-6 gap-5  border-t-[1px] border-[#B7B5E875] pt-6 pb-12">
          <li>
            <a
              class="flex items-center gap-4 px-3 py-0 h-9"
              href="/institucional/fale-conosco"
              target="_blank"
            >
              <Icon id="ContactUs" size={20} strokeWidth={2} />
              <span class="text-sm font-bold text-[#27239E]">Fale conosco</span>
            </a>
          </li>
          <li>
            <a
              target="_blank"
              class="flex items-center gap-3 px-3 py-0 h-9"
              href="https://api.whatsapp.com/send/?phone=5516997327682&text&type=phone_number&app_absent=0"
            >
              <Icon id="Help" size={20} strokeWidth={2} />
              <span class="text-sm font-bold text-[#27239E]">
                Contato
              </span>
            </a>
          </li>
          <li>
            <a
              class="flex items-center gap-3 px-3 py-0 h-9"
              href="/about-us"
            >
              <Icon id="AboutUs" size={20} strokeWidth={2} />
              <span class="text-sm font-bold text-[#27239E]">
                Quem somos nós
              </span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DrawerUser;
