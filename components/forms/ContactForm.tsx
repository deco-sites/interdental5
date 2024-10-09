import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

export interface Form {
  buttonText?: string;
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export interface Props {
  title?: string;
  form?: Form;
}

const DEFAULT_PROPS: Props = {
  title: "Fale conosco",
  form: {
    name: "Nome",
    email: "Email",
    phone: "Telefone",
    subject: "Assunto",
    message: "Mensagem",
    buttonText: "Enviar",
  },
};

export default function ContactForm(props: Props) {
  const { form, title } = { ...DEFAULT_PROPS, ...props };
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;
      const phone = (
        e.currentTarget.elements.namedItem("phone") as RadioNodeList
      )?.value;
      const subject = (
        e.currentTarget.elements.namedItem("subject") as RadioNodeList
      )?.value;
      const message = (
        e.currentTarget.elements.namedItem("message") as RadioNodeList
      )?.value;

      const response = await invoke.vtex.actions.masterdata.createDocument({
        acronym: "CF",
        data: { name, email, phone, subject, message },
      });

      console.log("response", response);
    } catch (e) {
      console.error("Erro ao fazer requisição para salvar no MD:", e);
    } finally {
      loading.value = false;
    }
  };

  return (
    <div class="flex-col lg:w-[796px]">
      <h2 class="text-black text-2xl font-bold leading-loose border-b-[1px] border-[#e4e4e4] pb-6 max-w-[680px]">
        {title}
      </h2>
      <form
        class="flex flex-col justify-start gap-4 max-w-[680px] mt-6"
        onSubmit={handleSubmit}
      >
        <div class="flex-col gap-3">
          <div class="flex flex-col mb-4">
            <label class="pb-1 text-gray-900 text-sm font-bold leading-[20px]">
              {form?.name}
            </label>
            <input
              name="name"
              class="border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-12"
              required={true}
              minLength={1}
              maxLength={240}
              type="text"
              placeholder=""
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="pb-1 text-gray-900 text-sm font-bold leading-tight">
              {form?.email}
            </label>
            <input
              name="email"
              class="border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-12"
              required={true}
              minLength={1}
              maxLength={50}
              type="email"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="pb-1 text-gray-900 text-sm font-bold leading-tight">
              Telefone
            </label>
            <input
              name="phone"
              class="border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-12"
              required={true}
              minLength={11}
              maxLength={15}
              type="tel"
            />
          </div>

          <div class="flex flex-col mb-4">
            <label class="pb-1 text-gray-900 text-sm font-bold leading-tight">
              {form?.subject}
            </label>
            <input
              name="subject"
              class="border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-12"
              required={true}
              minLength={1}
              maxLength={240}
              type="text"
            />
          </div>
          <div class="flex flex-col mb-4">
            <label class="pb-1 text-gray-900 text-sm font-bold leading-tight">
              {form?.message}
            </label>
            <textarea
              name="message"
              class="border-[1.5px] border-[#898D8D99] px-4 py-2 rounded-lg h-48"
              required={true}
              minLength={1}
              maxLength={500}
            />
          </div>
        </div>
        <button
          class="bg-[#27239E] px-6 py-3 w-[254px] rounded-lg text-slate-50 text-base font-bold leading-normal"
          type="submit"
        >
          {form?.buttonText}
        </button>
      </form>
    </div>
  );
}
