import { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

// TODO: 피그마에서 높이, 반경, 패딩, 글자 스타일, 기본 상태 테두리 색, 그라데이션 위치 확인
function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-2 w-full h-[44px] px-4 rounded-[10px] border
        text-caption transition-colors
        ${
          active
            ? "bg-gradient-to-r from-primary-10 from-50% to-sec-80 bg-origin-border border-transparent text-white font-bold"
            : "bg-white border-neutral-90 text-neutral-10"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default SidebarItem;