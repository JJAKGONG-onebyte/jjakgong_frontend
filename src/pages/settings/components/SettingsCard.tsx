import { ReactNode } from "react";

type SettingsCardProps = {
  title: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  // 카드 배경. 기본은 흰색 → 연한 파랑 그라데이션
  background?: string;
  className?: string;
};

function SettingsCard({
  title,
  icon,
  children,
  background = "bg-gradient-to-b from-white to-gradient-3",
  className = "",
}: SettingsCardProps) {
  return (
    <section
      className={`rounded-[15px] p-6
        shadow-[0_0_10px_0_#2B52FF80]
        ${background} ${className}`}
    >
      <h2 className="flex items-center gap-2 text-body font-bold text-neutral-10">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

export default SettingsCard;
