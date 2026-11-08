import { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
};


function Chip({ children, selected = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center justify-center
        h-[30px] px-[14px] rounded-full text-caption font-bold
        transition-colors
        ${
          selected
            ? "bg-primary-10 text-white border border-primary-10"
            : "bg-neutral-100 text-neutral-70 border border-neutral-90"
        }`}
    >
      {children}
    </button>
  );
}

export default Chip;