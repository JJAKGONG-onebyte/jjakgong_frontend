type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password";
};

// TODO: 피그마에서 높이, 반경, 패딩, 글자 스타일, 기본 상태의 배경·테두리 색 확인
function Input({ value, onChange, placeholder, type = "text" }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full h-[48px] px-4 rounded-[10px]
        border border-neutral-90 bg-neutral-100
        text-caption text-neutral-10 placeholder:text-neutral-80
        outline-none transition-colors
        focus:border-primary-10 focus:bg-white"
    />
  );
}

export default Input;