import Icon from "$store/components/ui/Icon.tsx";

export default function BackToTop({ content }: { content?: string }) {
  return (
    <>
      {content && (
        <div class=" flex items-center justify-end">
          <a
            href="#top"
            class="btn border rounded-[56px] w-[56px] h-[56px] bg-[#6562E5] p-0"
          >
            {content} <Icon id="IconUpMobile" width={32} height={32} />
          </a>
        </div>
      )}
    </>
  );
}
