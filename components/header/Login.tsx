import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

export default function Login() {
  return (
    <a
      class="btn btn-circle btn-sm btn-ghost flex flex-col w-auto hover:bg-transparent"
      href="/login-user"
      aria-label="Log in"
    >
      <Icon id="User" size={23} />
      <div class="flex-col text-left ml-4 mr-2">
        <span class="text-sm font-extrabold text-[#27239E] normal-case">
          Olá, visitante
        </span>

        <br />

        <span class="text-sm font-normal text-black normal-case">
          Acesse sua conta
        </span>
      </div>
      <Icon id="ChevronDown" size={16} />
    </a>
  );
}
