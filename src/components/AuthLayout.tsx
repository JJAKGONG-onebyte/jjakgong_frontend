import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  size?: "md" | "lg";
};

const sizeStyles = {
  md: "max-w-[580px] p-8",
  lg: "max-w-[660px] p-9",
};

function AuthLayout({ children, size = "md" }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary-90 px-4 py-10">
      <div
        className={`w-full rounded-2xl bg-white
          ring-2 ring-gradient-1/30 shadow-[0_8px_32px_rgba(43,82,255,0.12)]
          ${sizeStyles[size]}`}
      >
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;