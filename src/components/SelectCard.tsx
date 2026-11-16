import { ReactNode } from "react";

type SelectCardProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  variant?: "outline" | "filled";
};


const variantStyles = {
  outline: {
    on: "bg-primary-90 border-primary-10",
    off: "bg-neutral-100 border-neutral-90",
  },
  filled: {
    on: "bg-primary-10 border-primary-10 text-neutral-100 shadow-50",
    off: "bg-neutral-100 border-neutral-70 text-neutral-10",
  },
};

function SelectCard({ children, selected = false, onClick, variant = "outline" }: SelectCardProps) {
  const styles = variantStyles[variant];

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex flex-col items-center gap-2
        w-full p-4 rounded-[10px] border-2 transition-colors
        ${selected ? styles.on : styles.off}`}
    >
      {children}
    </button>
  );
}

export default SelectCard;