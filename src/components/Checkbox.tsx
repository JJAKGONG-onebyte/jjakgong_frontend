import CheckIcon from "./CheckIcon";

type CheckboxProps = {
  checked?: boolean;
  onClick?: () => void;
};


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