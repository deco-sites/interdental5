import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  logo?: {
    image: ImageWidget;
    description?: string;
  };
}

export default function Logo({ logo }: Props) {
  return (
    <>
      {logo?.image && (
        <div class="flex flex-row items-center bg-[#F9F9FF] justify-center mt-5 xl:pt-[32px] xl:pb-4 pb-6">
          <div class="w-full max-w-[225px] lg:w-28 xl:w-full lg:max-h-16">
            <img
              class="block object-cover w-full"
              loading="lazy"
              src={logo?.image}
              alt={logo?.description}
              width={200}
              height={200}
            />
          </div>
        </div>
      )}
    </>
  );
}
