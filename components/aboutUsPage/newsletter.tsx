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
      <div class="flex flex-col rounded-lg relative lg:max-w-[520px] lg:h-[56px] gap-3">
        <input
          class="input input-bordered rounded-lg lg:w-[100%] h-[48px] lg:h-[56px]"
          type="text"
          placeholder={form.placeholder}
        />
        <button
          class={`absolute top-[2px] px-0 py-0 lg:flex lg:items-center lg:justify-center rounded-lg w-[44px] h-[44px] lg:w-[52px] lg:h-[52px] bg-[#6562E5] border-[#6562E5] right-[2px] ${
            isReverse ? "btn-accent" : ""
          }`}
          type="submit"
        >
          {form.buttonText}
          <Icon
            class="w-[100%] h-[100%]"
            width={18}
            height={32}
            id={"IconNewsletter"}
          />
        </button>
      </div>
      <div class="flex flex-row items-center gap-2">
        <input
          class="input input-bordered rounded border-white !bg-none w-[16px] h-[16px]"
          type="checkbox"
        />
        {form.helpText && (
          <div
            class="text-sm lg:whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: form.helpText }}
          />
        )}
      </div>
    </form>
  );

  const bgLayout = isReverse
    ? "lg:bg-[url('/image/aboutUsNewsDesktop.svg')] bg-[url('/image/aboutUsNewsMobile.svg')] bg-cover bg-no-repeat text-secondary-content"
    : "bg-transparent";

  return (
    <div
      class={`lg:h-[382px] h-[471px] lg:max-w-[1248px] my-0 lg:mb-[32px] mx-[16px] rounded-lg lg:mx-[auto] flex items-start lg:items-center ${
        bordered
          ? isReverse ? "bg-secondary-content" : "bg-secondary"
          : bgLayout
      } ${bordered ? "p-4 lg:p-16" : "p-0"}`}
    >
      {(!layout?.content?.alignment ||
        layout?.content?.alignment === "Center") && (
        <div
          class={`container flex flex-col rounded p-4 gap-6 lg:p-8 lg:gap-12 lg:max-w-[608px] lg:mx-[32px]`}
        >
          {headerLayout}
          <div class="flex justify-center">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Left" && (
        <div
          class={`container flex flex-col rounded p-4 gap-6 lg:p-8 lg:gap-12 lg:max-w-[608px] lg:mx-[32px]`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
      {layout?.content?.alignment === "Side to side" && (
        <div
          class={`container flex flex-col rounded max-w-[608px] m-0 justify-between p-6 gap-6 lg:p-8 lg:gap-4`}
        >
          {headerLayout}
          <div class="flex justify-start">
            {formLayout}
          </div>
        </div>
      )}
    </div>
  );
}
