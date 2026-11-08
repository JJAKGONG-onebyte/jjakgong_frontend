import { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
};

function SidebarItem({ icon, label, active = false, onClick }: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 w-full h-[54px] pl-6 pr-4 rounded-[10px] border-2
        text-small transition-colors
        ${
          active
            ? "bg-gradient-to-r from-primary-10 from-35% to-sec-80 bg-origin-border border-transparent text-white font-bold"
            : "bg-white border-neutral-90 text-neutral-10"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default SidebarItem;