type CheckIconProps = {
  className?: string;
};

function CheckIcon({ className = "" }: CheckIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="5 12.5 10 17.5 19 7" />
    </svg>
  );
}

export default CheckIcon;