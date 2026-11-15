import { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "lg";
};

const sizeStyles = {
  sm: "h-[30px] px-[14px] text-caption",
  lg: "h-[40px] px-[18px] text-small", // 학습 설정 - 시간 빠른 선택
};

function Chip({ children, selected = false, onClick, size = "sm" }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex items-center justify-center
        rounded-full transition-colors
        ${sizeStyles[size]}
        ${selected || size === "sm" ? "font-bold" : "font-normal"}
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
