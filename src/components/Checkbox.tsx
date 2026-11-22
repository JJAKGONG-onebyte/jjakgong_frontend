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
      className={`inline-flex shrink-0 items-center justify-center
        w-[21px] h-[21px] rounded-[5px] border transition-colors
        ${
          checked
            ? "bg-primary-10 border-primary-10 text-neutral-100 shadow-50"
            : "bg-neutral-100 border-neutral-60 text-transparent"
        }`}
    >
      <CheckIcon className="w-3.5 h-3.5" />
    </button>
  );
}

export default Checkbox;