import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  size?: "md" | "lg";
};

const sizeStyles = {
  md: "max-w-[578px] px-8 pt-7 pb-7",
  lg: "max-w-[653px] px-8 pt-7 pb-7",
};

function AuthLayout({ children, size = "md" }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-90 px-4 py-10">
      <div className={`w-full rounded-[15px] bg-neutral-100 shadow-50 ${sizeStyles[size]}`}>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;