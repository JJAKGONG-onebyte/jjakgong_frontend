type SegmentedToggleProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

// TODO: 피그마에서 높이, 패딩, 글자 스타일, 바깥 테두리 색 확인
function SegmentedToggle({ options, value, onChange }: SegmentedToggleProps) {
  return (
    <div
      role="radiogroup"
      className="inline-flex items-center p-[3px] rounded-full bg-white ring-1 ring-inset ring-neutral-90"
    >
      {options.map((option) => {
        const selected = value === option;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option)}
            className={`h-[28px] px-[14px] rounded-full text-caption font-bold transition-colors
              ${selected ? "bg-primary-10 text-white" : "text-neutral-70"}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedToggle;