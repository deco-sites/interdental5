export interface HeaderProps {
  title?: string;
  description?: string;
}

export default function AboutUsHeader(
  { title, description }: HeaderProps,
) {
  return (
    <div class="bg-[#F9F9FF]">
      <div class="flex flex-col mx-[auto] max-w-[1145px] mt-[40px] lg:mt-[72px] px-[16px] xl:px-0">
        <h1 class="font-black text-[#27239E] text-[28px] pb-[24px] lg:pb-[32px] lg:text-5xl border-b-[1px] border-[#E6E7EB]">
          {title}
        </h1>
        <p class="text-base text-[#545859] pt-[24px] lg:pt-[32px] pb-[63px] lg:pb-[160px]">
          {description}
        </p>
      </div>
    </div>
  );
}
