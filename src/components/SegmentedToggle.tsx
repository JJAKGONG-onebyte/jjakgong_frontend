type SegmentedToggleProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  size?: "sm" | "lg";
};

const sizeStyles = {
  sm: "h-[28px] px-[14px] text-caption",
  lg: "h-[38px] px-5 text-small", // 학습 설정 - 학습/휴식 시간
};

function SegmentedToggle({ options, value, onChange, size = "sm" }: SegmentedToggleProps) {
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
            className={`${sizeStyles[size]} rounded-full text-center transition-colors
              ${selected || size === "sm" ? "font-bold" : "font-normal"}
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
