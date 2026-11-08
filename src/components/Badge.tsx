import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  color?: "red" | "blue" | "gray";
};

const colorStyles = {
  red: "bg-ter-80 text-white", // 우선순위 높음
  blue: "bg-primary-10 text-white", // 우선순위 보통
  gray: "bg-neutral-100 text-neutral-80 border border-neutral-90", // 우선순위 낮음 TODO: 색 확인
};

// 높이 25px는 피그마 확인됨. TODO: 좌우 패딩, 글자 스타일 확인
function Badge({ children, color = "blue" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center
        h-[25px] px-[10px] rounded-full text-caption font-bold
        ${colorStyles[color]}`}
    >
      {children}
    </span>
  );
}

export default Badge;