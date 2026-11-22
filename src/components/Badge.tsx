import { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  color?: "red" | "blue" | "gray";
};

const colorStyles = {
  red: "bg-ter-80 text-white", // 우선순위 높음
  blue: "bg-primary-10 text-white", // 우선순위 보통
  gray: "bg-primary-90 text-neutral-80 border border-neutral-80", // 우선순위 낮음
};


function Badge({ children, color = "blue" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center
        h-[25px] px-[10px] rounded-full text-caption font-medium
        ${colorStyles[color]}`}
    >
      {children}
    </span>
  );
}

export default Badge;