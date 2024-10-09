import Icon from "$store/components/ui/Icon.tsx";

export interface PoweredByItem {
  label: string;
  icon: "Vtex" | "B8one";
}

export interface PoweredByContent {
  items?: PoweredByItem[];
}

export interface PoweredByProps {
  content: PoweredByContent;
}

export default function PoweredBy({ content: { items = [] } }: PoweredByProps) {
  if (!items.length) return <></>;

  return (
    <div className="flex gap-6">
      {items.map(({ label, icon }) => (
        <div className="flex gap-2">
          <span className="text-[#000] whitespace-nowrap text-xs leading-5">
            {label}
          </span>

          <Icon width={32} height={20} id={icon} />
        </div>
      ))}
    </div>
  );
}
