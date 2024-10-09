import { Marked } from "@ts-stack/markdown";
import { LoaderReturnType } from "deco/types.ts";

export interface SeoTextProps {
  title: LoaderReturnType<string>;
  description: LoaderReturnType<string>;
  items: Item[];
  fullDescriptions: FullDescription[];
  fullDescriptions2: FullDescription2[];
  maxWidth?: number;
}

export type Item = {
  label?: string;
};

export type FullDescription = {
  label?: string;
};

export type FullDescription2 = {
  label?: string;
};

export default function SeoTextHome(
  { title, description, fullDescriptions, fullDescriptions2, items, maxWidth }:
    SeoTextProps,
) {
  return (
    <div
      class={`flex container ${
        maxWidth ? `max-w-[${maxWidth}px]` : "max-w-[1114px]"
      }  xl:pt-4 `}
    >
      <details class="collapse join-item ">
        <summary class="collapse-title text-lg font-medium p-4 xl:py-0 pointer-events-none">
          <div class="flex flex-col gap-4">
            <span class="font-bold text-2xl pb-0 xl:pb-0 xl:whitespace-nowrap text-[#000000] whitespace-break-spaces">
              {title}
            </span>
            <p
              class="text-sm text-[#545859]"
              dangerouslySetInnerHTML={{ __html: Marked.parse(description) }}
            />
            <div class="flex border-2 border-[#27239E] rounded-lg justify-center items-center h-12 max-w-[144px] text-[#27239E] text-base font-bold gap-2 pointer-events-auto bg-white hover:bg-indigo-200 hover:bg-opacity-60">
              <img
                src="/image/plussvg.svg"
                alt={"icon-plus"}
                width={20}
                height={20}
                class="flex"
              />
              <span class="flex">
                Ver mais
              </span>
            </div>
          </div>
        </summary>
        <div class="collapse-content">
          <div class="flex  flex-col">
            <ul class="list-disc pl-[15px] mt-5">
              {items?.map((content) => (
                <li class="text-sm underline">
                  {content.label}
                </li>
              ))}
            </ul>
            <div class="mt-[16px]">
              {fullDescriptions?.map((description) => (
                <p class="text-sm text-[#545859]">
                  {description.label}
                </p>
              ))}
            </div>
            <div class="mt-[16px]">
              {fullDescriptions2?.map((description2) => (
                <p class="text-sm text-[#545859]">
                  {description2.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
