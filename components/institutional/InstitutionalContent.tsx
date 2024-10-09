export interface Props {
  contentTitle: string;
  /** @format textarea */
  textArea: TextArea;
}

export interface TextArea {
  /** @format html */
  contentText: string;
}

const DEFAULT_PROPS: Props = {
  contentTitle: "",
  textArea: {
    contentText:
      "Estamos há mais de 42 anos no mercado odontológico e médico. Hoje somos uma das maiores dentais do Brasil e LATAM",
  },
};

export default function InstitutionalContent(props: Props) {
  const { textArea, contentTitle } = { ...DEFAULT_PROPS, ...props };
  return (
    <div class="flex-col lg:m-0 max-w-3xl">
      <h3 class="text-xl font-bold text-black border-b-[1px] border-[#E4E4E4] pb-6 lg:text-2xl">
        {contentTitle}
      </h3>
      {textArea && (
        <div
          class="my-6 text-base font-medium lg:font-normal text-[#545859]"
          dangerouslySetInnerHTML={{ __html: textArea.contentText }}
        >
        </div>
      )}
    </div>
  );
}
