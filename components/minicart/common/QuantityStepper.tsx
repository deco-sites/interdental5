interface Props {
  quantity: number;
  disabled?: boolean;
  onChange?: (quantity: number) => void;
}

const QUANTITY_MAX_VALUE = 100;

function QuantitySelector({ onChange, quantity, disabled }: Props) {
  const options = [];
  for (let i = 1; i <= QUANTITY_MAX_VALUE; i++) {
    options.push(<option key={i} value={i}>{i}</option>);
  }

  return (
    <div class="join w-full max-w-[99px]">
      <select
        class=" select-bordered text-[#545859] border-[#898D8D] border-[1.5px] border-opacity-60 font-medium text-base py-2 px-4 rounded-lg xl:h-[48px] w-[91px] xl:w-[88px] appearance-none bg-[url('/image/selectArrow.svg')] bg-[center_right_1rem] bg-no-repeat"
        value={quantity}
        onChange={(e) =>
          onChange?.(parseInt((e.target as HTMLSelectElement).value))}
        disabled={disabled}
      >
        {options}
      </select>
    </div>
  );
}

export default QuantitySelector;
