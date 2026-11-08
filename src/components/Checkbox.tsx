import CheckIcon from "./CheckIcon";

type CheckboxProps = {
  checked?: boolean;
  onClick?: () => void;
};

// TODO: 피그마에서 크기, 반경, 안 됨 상태의 색 확인
function Checkbox({ checked = false, onClick }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      className={`inline-flex items-center justify-center
        w-6 h-6 rounded-md border transition-colors
        ${
          checked
            ? "bg-primary-10 border-primary-10 text-white"
            : "bg-neutral-100 border-neutral-90 text-transparent"
        }`}
    >
      <CheckIcon className="w-4 h-4" />
    </button>
  );
}

export default Checkbox;