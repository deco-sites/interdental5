import { useCart } from "apps/vtex/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";
import { AvailableIcons } from "deco-sites/interdental/components/ui/Icon.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  seller: string;
  quantity?: number;
  productID: string;
  _class?: string;
  title?: string;
  icon?: AvailableIcons;
  hasAttachment?: string;
  customName?: string;
}

function AddToCartButton(
  {
    seller,
    quantity,
    productID,
    _class,
    title,
    icon,
    eventParams,
    hasAttachment,
    customName = "",
  }: Props,
) {
  const { addItems, addItemAttachment, cart } = useCart();
  const onAddItem = async () => {
    await addItems({
      orderItems: [{
        id: productID,
        seller: seller,
        quantity: quantity ?? 1,
      }],
    });

    const items = cart.value?.items;

    const index = items?.findIndex((item) => item.id === productID) ?? 0;

    if (hasAttachment === "true" && customName.length) {
      await addItemAttachment({
        index,
        attachment: "Gravação a laser",
        content: { "Nome": customName },
        noSplitItem: true,
      });
    }
  };

  return (
    <Button
      onAddItem={onAddItem}
      eventParams={eventParams}
      _class={_class}
      title={title}
      icon={icon}
    />
  );
}

export default AddToCartButton;
