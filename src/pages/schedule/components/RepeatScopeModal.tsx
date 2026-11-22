import { useState } from "react";
import Modal from "../../../components/Modal";
import CheckIcon from "../../../components/CheckIcon";
import ModalButton from "./ModalButton";

type RepeatScope = "this" | "all";

type RepeatScopeModalProps = {
  open: boolean;
  onClose: () => void;
};

const scopeOptions: { value: RepeatScope; label: string }[] = [
  { value: "this", label: "이 일정만" },
  { value: "all", label: "전체 반복 일정" },
];

function RepeatScopeModal({ open, onClose }: RepeatScopeModalProps) {
  const [scope, setScope] = useState<RepeatScope>("this");

  return (
    <Modal open={open} onClose={onClose} ariaLabel="반복 일정 삭제" className="max-w-[960px] px-8 pb-7 pt-7">
      <h2 className="text-body font-bold text-neutral-10">반복 일정 삭제</h2>

      <div role="radiogroup" className="mt-[30px] flex flex-col gap-5">
        {scopeOptions.map((option) => {
          const selected = scope === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => setScope(option.value)}
              className={`flex h-[50px] w-full items-center gap-[15px] rounded-[10px] px-5 text-caption ${
                selected
                  ? "bg-primary-10 font-bold text-neutral-100 shadow-50"
                  : "border border-neutral-80 bg-primary-90 font-medium text-neutral-10"
              }`}
            >
              <span
                className={`flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full bg-neutral-100 ${
                  selected ? "text-primary-10" : "border border-neutral-60 text-neutral-80"
                }`}
              >
                <CheckIcon className="h-3.5 w-3.5" />
              </span>
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="mt-[25px] flex justify-end gap-2.5">
        <ModalButton variant="cancel" onClick={onClose}>
          취소
        </ModalButton>
        {/* TODO: 선택한 범위(scope)로 일정 삭제 API 연결 */}
        <ModalButton variant="danger">삭제</ModalButton>
      </div>
    </Modal>
  );
}

export default RepeatScopeModal;