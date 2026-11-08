import { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
};

// TODO: 피그마에서 높이, 패딩, 글자 스타일, 안 됨 상태의 색 확인
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