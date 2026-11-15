import { ReactNode } from "react";

type FormFieldProps = {
  label: string;
  children: ReactNode;
};

function FormField({ label, children }: FormFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-small font-bold text-neutral-60">{label}</span>
      {children}
    </label>
  );
}

export default FormField;