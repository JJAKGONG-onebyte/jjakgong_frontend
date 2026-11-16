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
      className="w-full h-[60px] px-5 rounded-[10px]
        border-2 border-neutral-70 bg-neutral-100
        text-small text-neutral-10 placeholder:text-neutral-60
        outline-none transition-colors
        focus:border-primary-10 focus:shadow-50"
    />
  );
}

export default Input;