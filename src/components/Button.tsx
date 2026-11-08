import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger";
  size?: "sm" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
  className?: string;
};

const variantStyles = {
  primary: "bg-primary-10 text-white", // 가입하기, 로그인, 저장, 업로드
  outline: "bg-white border border-neutral-80 text-neutral-70",
  danger: "bg-ter-80 text-white", // 모달 "삭제"
};


const sizeStyles = {
  sm: "h-[33px] px-[15px] text-caption",
  lg: "h-[60px] px-6 text-small",
};

function Button({
  children,
  variant = "primary",
  size = "lg",
  icon,
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2.5
        rounded-full font-bold transition-colors
        disabled:bg-neutral-60 disabled:text-white disabled:border-transparent
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export default Button;