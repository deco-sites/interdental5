import Header from "$store/components/ui/SectionHeader.tsx";
import Icon from "$store/components/ui/Icon.tsx";

export interface Form {
  placeholder?: string;
  buttonText?: string;
  /** @format html */
  helpText?: string;
}

export interface Props {
  title?: string;
  /** @format textarea */
  description?: string;
  form?: Form;
  layout?: {
    headerFontSize?: "Large" | "Normal";
    content?: {
      border?: boolean;
      alignment?: "Center" | "Left" | "Side to side";
      bgColor?: "Normal" | "Reverse";
    };
  };
  icon: {
    label: "NewsletterIcon";
  };
}

const DEFAULT_PROPS: Props = {
  title: "",
  description: "",
  form: {
    placeholder: "Digite seu email",
    buttonText: "Inscrever",
    helpText:
      'Ao se inscrever, você concorda com nossa <a class="link" href="/politica-de-privacidade">Política de privacidade</a>.',
  },
  layout: {
    headerFontSize: "Large",
    content: {
      border: false,
      alignment: "Center",
    },
  },
  icon: {
    label: "NewsletterIcon",
  },
};

export default function Newsletter(props: Props) {
  const { title, description, form, layout } = { ...DEFAULT_PROPS, ...props };
  const isReverse = layout?.content?.bgColor === "Reverse";
  const bordered = Boolean(layout?.content?.border);

  const headerLayout = (
    <Header
      title={title}
      description={description}
      alignment={layout?.content?.alignment === "Left" ? "left" : "center"}
      colorReverse={isReverse}
      fontSize={layout?.headerFontSize}
    />
  );

  const formLayout = form && (
    <form action="/" class="flex flex-col gap-4">
      <div class="flex flex-col rounded-lg relative xl:max-w-[520px] xl:h-[56px] gap-3">
        <input
          class=" rounded-lg xl:w-[100%] h-[48px] xl:h-[56px] text-[#545859] xl:text-xl text-base focus:outline-none pl-[16px] placeholder:text-[#545859]"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`absolute top-[2px] px-[13px] py-[5px] xl:flex xl:items-center xl:justify-center hover:bg-[#27239E] rounded-lg w-[44px] h-[44px] xl:w-[52px] xl:h-[52px] bg-[#6562E5] border-[#6562E5] right-[2px] ${
            isReverse ? "" : ""
          }`}
          type="submit"
        >
          {form.buttonText}
          <Icon width={18} height={32} id={"NewsletterIcon"} />
        </button>
      </div>
      <div class="flex flex-row items-center gap-2">
        <input
          class="input h-[16px] w-[16px] hover:none;  focus:outline-none p-0 appearance-none shrink-0 border-1 border-white rounded bg-[#27239E]
          checked:bg-[url('/image/check.svg')] checked:border-none checked:bg-[#3656B8] bg-no-repeat bg-center hover:border-[#3656B8] hover:shadow-[0px_0px_0px_6px_rgba(54,86,184,0.40)]"
          type="checkbox"
        />
        {form.helpText && (
          <div
            class="text-xs xl:text-sm font-medium leading-4 xl:leading-5 xl:whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: form.helpText }}
          />
        )}
      </div>
    </form>
  );

  const bgLayout = isReverse
    ? "xl:bg-[url('/image/newsletter-background.svg')] bg-[url('/image/newsletterMobile.svg')] bg-bottom bg-cover bg-no-repeat text-secondary-content md:bg-center xl:bg-top"
    : "bg-transparent";

  return (
    <div class="mx-4 xl:mx-0 xl:pt-[80px] border-b border-[#00000066] xl:border-none">
      <div
        class={`xl:h-[382px] h-[450px] container rounded-lg xl:mx-[auto] xl:mb-0 xl:mt-0 flex items-start  md:justify-center xl:justify-start xl:items-center ${
          bordered
            ? isReverse ? "bg-secondary-content" : "bg-secondary"
            : bgLayout
        } ${bordered ? "p-4 xl:p-16" : "p-0 xl:my-12"}`}
      >
        {(!layout?.content?.alignment ||
          layout?.content?.alignment === "Center") && (
          <div
            class={`container flex flex-col rounded p-4 gap-6 xl:p-8 xl:gap-12`}
          >
            {headerLayout}
            <div class="flex justify-center">
              {formLayout}
            </div>
          </div>
        )}
        {layout?.content?.alignment === "Left" && (
          <div
            class={`container flex flex-col rounded p-4 gap-6 xl:p-8 xl:gap-12`}
          >
            {headerLayout}
            <div class="flex justify-start">
              {formLayout}
            </div>
          </div>
        )}
        {layout?.content?.alignment === "Side to side" && (
          <div
            class={`container flex flex-col rounded max-w-[608px] m-0 justify-between p-6 gap-2 xl:py-8 xl:px-16 xl:gap-4`}
          >
            {headerLayout}
            <div class="flex justify-start">
              {formLayout}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
