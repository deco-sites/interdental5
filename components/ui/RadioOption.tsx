interface Props {
  optionName: string;
}

function RadioOption({ optionName }: Props) {
  return (
    <>
      <div className="form-control">
        <label className="label cursor-pointer gap-3 border-[1.5px] border-[#898D8D] border-opacity-60 justify-start rounded-lg px-4 py-3">
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-[#6562E5] w-5 h-5 border-2 border-[#545859]"
            checked
          />
          <span className="text-base font-medium text-black">{optionName}</span>
        </label>
      </div>
    </>
  );
}

export default RadioOption;
