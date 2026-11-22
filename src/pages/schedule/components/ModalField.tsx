type ModalFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

function ModalField({ label, value, onChange, placeholder }: ModalFieldProps) {
  return (
    <label className="flex flex-col gap-2.5">
      <span className="text-caption font-medium text-neutral-10">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-[50px] rounded-[10px] border border-neutral-80 bg-primary-90 px-5
          text-caption font-medium text-neutral-10 placeholder:text-neutral-60
          outline-none transition-colors focus:border-primary-10"
      />
    </label>
  );
}

export default ModalField;