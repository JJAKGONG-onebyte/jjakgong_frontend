import { ReactNode } from "react";

type SelectCardProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  variant?: "outline" | "filled";
};

// TODO: 피그마에서 반경, 패딩, 테두리 두께, 안 됨 상태의 배경 색 확인
const variantStyles = {
  outline: {
    on: "bg-primary-90 border-primary-10",
    off: "bg-neutral-100 border-neutral-90",
  },
  filled: {
    on: "bg-primary-10 border-primary-10 text-white",
    off: "bg-white border-neutral-90 text-neutral-10",
  },
};

function SelectCard({ children, selected = false, onClick, variant = "outline" }: SelectCardProps) {
  const styles = variantStyles[variant];

  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-2
        w-full p-4 rounded-[12px] border transition-colors
        ${selected ? styles.on : styles.off}`}
    >
      {children}
    </button>
  );
}

export default SelectCard;