type SwitchProps = {
  checked?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
};

const sizeStyles = {
  md: {
    track: "w-[52px] h-[28px]",
    knob: "w-[22px] h-[22px]",
    move: "translate-x-[24px]", // 52 - 22 - 6
  },
  sm: {
    track: "w-[40px] h-[22px]",
    knob: "w-[16px] h-[16px]",
    move: "translate-x-[18px]", // 40 - 16 - 6
  },
};

function Switch({ checked = false, onClick, size = "md" }: SwitchProps) {
  const styles = sizeStyles[size];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onClick}
      className={`inline-flex items-center p-[3px] rounded-full transition-colors
        ${styles.track}
        ${checked ? "bg-primary-10" : "bg-neutral-100 ring-1 ring-inset ring-neutral-90"}`}
    >
      <span
        className={`rounded-full transition-transform duration-200
          ${styles.knob}
          ${checked ? `bg-white ${styles.move}` : "bg-neutral-80 translate-x-0"}`}
      />
    </button>
  );
}

export default Switch;