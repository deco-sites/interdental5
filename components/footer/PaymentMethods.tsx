import Icon from "$store/components/ui/Icon.tsx";

export interface PaymentItem {
  label:
    | "Diners"
    | "Elo"
    | "Mastercard"
    | "Pix"
    | "Visa"
    | "Hipercard"
    | "PayPal"
    | "Amex";
}

export default function PaymentMethods(
  { content }: { content?: { title?: string; items?: PaymentItem[] } },
) {
  return (
    <>
      {content && content.items && content.items.length > 0 && (
        <div class="flex flex-col lg:flex-row gap-4">
          {content.title && (
            <h3 class="text-base font-bold text-[#000] whitespace-nowrap">
              {content.title}
            </h3>
          )}
          <ul class="flex items-center gap-2 h-[24px]">
            {content.items.map((item) => {
              return (
                <li
                  class=""
                  title={item.label}
                >
                  <Icon
                    width={34}
                    height={24}
                    strokeWidth={1}
                    id={item.label}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
