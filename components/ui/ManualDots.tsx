import Slider from "deco-sites/interdental/components/ui/Slider.tsx";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

interface Props {
  interval: number;
  items: unknown[];
}

export function ManualDots({ interval, items }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
              @property --dot-progress {
                syntax: '<percentage>';
                inherits: false;
                initial-value: 0%;
              }
              `,
        }}
      />
      <ul class="carousel col-span-full z-10 row-start-4 w-auto h-6 justify-self-center justify-start bg-none relative top-4">
        {items?.map((_, index) => (
          <li
            class={`carousel-item px-2 focus:bg-black [&:not(:nth-child(${interval}n-${
              interval - 1
            }))]:hidden`}
            key={index}
          >
            <Slider.Dot index={index}>
              <div className="hidden group-disabled:flex">
                <Icon id={"ActiveDot"} size={16} />
              </div>
              <div className="flex group-disabled:hidden">
                <Icon id={"Dot"} size={16} />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}
