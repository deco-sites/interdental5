import Button from "../ui/Button.tsx";
import Icon from "deco-sites/interdental/components/ui/Icon.tsx";

interface Props {
  quantity: number;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (quantity: number) => void;
  index?: number;
  _class?: string;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector(
  { onChange, quantity, disabled, loading, index, _class }: Props,
) {
  const decrement = () => onChange?.(Math.max(1, quantity - 1));

  const increment = () =>
    onChange?.(Math.min(quantity + 1, QUANTITY_MAX_VALUE));

  return (
    <div
      class={`flex join px-3 py-1 items-center w-20 justify-center lg:w-[92px]  bg-[#FFF]
      h-9 border-[1px] border-[#898d8d] border-opacity-60 mr-1 lg:mr-2 rounded-lg ${_class} `}
      key={index}
    >
      <Button
        class="join-item w-4 h-5 min-h-fit border-none bg-transparent mr-2 hover:bg-transparent"
        onClick={decrement}
        disabled={disabled}
        loading={loading}
      >
        <Icon id={"MinusPDP"} size={24} />
      </Button>
      <input
        aria-label="change quantity"
        class={`flex items-center justify-center text-center w-5 h-6 join-item [appearance:textfield] bg-transparent ${
          _class ? "w-full" : ""
        }`}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        max={QUANTITY_MAX_VALUE}
        min={1}
        value={quantity}
        disabled={disabled}
        onBlur={(e) => onChange?.(e.currentTarget.valueAsNumber)}
        maxLength={3}
        size={3}
      />
      <Button
        class="join-item w-4 h-5 min-h-fit border-none bg-transparent ml-2 hover:bg-transparent"
        onClick={increment}
        disabled={disabled}
        loading={loading}
      >
        <Icon id={"PlusPDP"} size={24} />
      </Button>
    </div>
  );
}

export default QuantitySelector;
