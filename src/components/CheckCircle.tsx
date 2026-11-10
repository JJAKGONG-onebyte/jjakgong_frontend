import { ReactNode } from "react";
import CheckIcon from "./CheckIcon";

type CheckCircleProps = {
  checked?: boolean;
  onClick?: () => void;
  label?: ReactNode;
};


function CheckCircle({ checked = false, onClick, label }: CheckCircleProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className="inline-flex items-center gap-2"
    >
      <span
        className={`inline-flex items-center justify-center
          w-6 h-6 rounded-full border transition-colors
          ${
            checked
              ? "bg-primary-10 border-primary-10 text-white"
              : "bg-white border-neutral-90 text-neutral-80"
          }`}
      >
        <CheckIcon className="w-4 h-4" />
      </span>
      {label && <span className="text-caption font-bold">{label}</span>}
    </button>
  );
}

export default CheckCircle;