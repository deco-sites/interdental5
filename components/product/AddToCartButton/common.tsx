import Button from "$store/components/ui/Button.tsx";
import { sendEvent } from "$store/sdk/analytics.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { AddToCartParams } from "apps/commerce/types.ts";
import { useState } from "preact/hooks";
import Icon, {
  AvailableIcons,
} from "deco-sites/interdental/components/ui/Icon.tsx";

export interface Props {
  /** @description: sku name */
  eventParams: AddToCartParams;
  _class?: string;
  title?: string;
  icon?: AvailableIcons;
  onAddItem: () => Promise<void>;
}

const useAddToCart = ({ eventParams, onAddItem }: Props) => {
  const [loading, setLoading] = useState(false);
  const { displayCart } = useUI();

  const onClick = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      await onAddItem();

      sendEvent({
        name: "add_to_cart",
        params: eventParams,
      });

      displayCart.value = true;
    } finally {
      setLoading(false);
    }
  };

  return { onClick, loading, "data-deco": "add-to-cart" };
};

export default function AddToCartButton(props: Props) {
  const btnProps = useAddToCart(props);

  return (
    <Button {...btnProps} class={`btn-primary ${props._class}`}>
      {props.icon ? <Icon id={props.icon} size={20} /> : <></>}
      {props.title ? props.title : "Comprar"}
    </Button>
  );
}
