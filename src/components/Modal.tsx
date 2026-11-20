import { ReactNode, useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  className?: string;
};

// 화면 전체를 어둡게 덮고 가운데에 패널을 띄우는 공용 모달
function Modal({ open, onClose, children, ariaLabel, className = "" }: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const prevOverflow = document.body.style.overflow;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[rgba(13,13,13,0.5)] p-4"
      onMouseDown={(e) => {
        // 패널 바깥(어두운 배경)을 눌렀을 때만 닫기
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        className={`relative my-auto w-full rounded-[15px] bg-gradient-to-t from-gradient-3 to-white shadow-50 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
