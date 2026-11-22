import { ReactNode } from "react";

type ModalButtonProps = {
  children: ReactNode;
  variant?: "cancel" | "primary" | "danger";
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
};

const variantStyles = {
  cancel: "bg-primary-90 font-normal text-neutral-60 ring-1 ring-inset ring-neutral-60",
  primary: "bg-primary-10 font-bold text-neutral-100",
  danger: "bg-ter-80 font-bold text-neutral-100",
};

function ModalButton({ children, variant = "primary", icon, onClick, className = "" }: ModalButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex h-[33px] items-center justify-center gap-2.5 rounded-full px-[15px] text-small ${variantStyles[variant]} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export default ModalButton;