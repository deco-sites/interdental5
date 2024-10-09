import { useState } from "preact/hooks";
import Icon from "$store/components/ui/Icon.tsx";

interface Props {
  title: string;
  children: preact.ComponentChildren;
}

function Accordion({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="join join-vertical w-full gap-6">
      <div
        className={`accordion-header cursor-pointer bg-none flex items-center justify-between ${
          isOpen ? "open" : ""
        }`}
        onClick={toggleAccordion}
      >
        <div className="accordion-title font-bold text-base text-[#000] xl:pl-0">
          {title}
        </div>
        <div className="arrow">
          <Icon
            id={isOpen ? "ChevronUpPdc" : "ChevronDownPdc"}
            size={16}
            strokeWidth={2}
          />
        </div>
      </div>
      {isOpen && (
        <div className="accordion-content p-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default Accordion;
