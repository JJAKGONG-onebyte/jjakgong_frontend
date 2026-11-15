type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password";
};


function Input({ value, onChange, placeholder, type = "text" }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-[56px] px-4 rounded-[10px]
        border-2 border-neutral-90 bg-neutral-100
        text-caption text-neutral-10 placeholder:text-neutral-80
        outline-none transition-colors
        focus:border-primary-10 focus:bg-white
        focus:shadow-[0_0_8px_rgba(43,82,255,0.35)]"
    />
  );
}

export default Input;