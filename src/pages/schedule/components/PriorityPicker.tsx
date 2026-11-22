import { Priority } from "../../../types/schedule";

type PriorityPickerProps = {
  value: Priority;
  onChange: (value: Priority) => void;
};

const priorityOptions: { value: Priority; label: string }[] = [
  { value: "high", label: "높음" },
  { value: "medium", label: "보통" },
  { value: "low", label: "낮음" },
];

const selectedStyles = {
  high: "bg-ter-80 shadow-[0_0_10px_rgba(245,56,59,0.5)]",
  medium: "bg-primary-10 shadow-50",
  low: "bg-neutral-60",
};

function PriorityPicker({ value, onChange }: PriorityPickerProps) {
  return (
    <div role="radiogroup" className="flex gap-[15px]">
      {priorityOptions.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`h-[33px] rounded-full px-[15px] text-small ${
              selected
                ? `${selectedStyles[option.value]} font-bold text-neutral-100`
                : "bg-primary-90 text-neutral-60 ring-1 ring-inset ring-neutral-60"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default PriorityPicker;