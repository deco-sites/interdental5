import { Signal, useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";
import EmailIcon from "deco-sites/interdental/static/image/EmailIcon.tsx";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);
  const errorName = useSignal(false);
  const errorEmail = useSignal(false);
  const success = useSignal(false);

  const errorMessage = (param: string, error: Signal<boolean>) => {
    if (!param.length) {
      error.value = true;
    } else {
      error.value = false;
    }
  };

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email =
        (e.currentTarget.elements.namedItem("email") as RadioNodeList)?.value;

      errorMessage(name, errorName);
      errorMessage(email, errorEmail);

      if (name.length && email.length) {
        await invoke.vtex.actions.notifyme({ skuId: productID, name, email });

        success.value = true;
        setTimeout(() => {
          success.value = false;
        }, 4000);
      }
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="form-control justify-start w-full lg:w-[458px]"
      onSubmit={handleSubmit}
    >
      <div class="mb-5 lg:mb-6 flex flex-col">
        <span class="text-xl font-bold text-black">
          Este produto está indisponivel no momento
        </span>
        <span class="text-sm font-medium text-[#545859] lg:mr-16">
          Deixe seu contato que avisaremos você quando este produto retornar aos
          nossos estoques
        </span>
      </div>
      <label class="text-sm font-medium text-black mb-1">
        O seu nome
      </label>
      <input
        placeholder="Nome"
        class={`input input-bordered rounded-lg border-[1.5px] border-color-[#898D8D] border-opacity-60 max-w-[458px] ${
          errorName.value ? "mb-0" : "mb-5 lg:mb-6"
        }`}
        name="name"
      />
      {errorName.value
        ? (
          <span class="text-[#ff4c4c] text-xs mt-1 mb-5 lg:mb-6">
            Campo Obrigatório
          </span>
        )
        : <></>}
      <label class="text-sm font-medium text-black mb-1">
        O seu e-mail
      </label>
      <input
        label="o seu e-mail"
        placeholder="Email"
        class={`input input-bordered rounded-lg border-[1.5px] border-color-[#898D8D] border-opacity-60  max-w-[458px] ${
          errorEmail.value ? "mb-0" : "mb-5 lg:mb-6"
        }`}
        name="email"
      />
      {errorEmail.value
        ? (
          <span class="text-[#ff4c4c] text-xs mt-1 mb-5 lg:mb-6">
            Campo Obrigatório
          </span>
        )
        : <></>}

      <button
        class="btn bg-[#27239E] border-[#27239E] hover:bg-[#6562E5] hover:border-[#6562E5] w-auto h-12 min-h-fit rounded-lg text-white"
        disabled={loading}
      >
        <EmailIcon /> Avise-me quando chegar
      </button>
      {success.value
        ? (
          <span class="text-[#127312] text-sm text-center mt-2">
            Enviado com sucesso!
          </span>
        )
        : <></>}
    </form>
  );
}

export default Notify;
