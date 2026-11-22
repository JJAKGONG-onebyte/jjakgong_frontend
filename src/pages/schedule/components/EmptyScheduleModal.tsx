import Modal from "../../../components/Modal";
import ModalButton from "./ModalButton";
import { ReactComponent as AddCircleIcon } from "../../../assets/icons/add-circle.svg";

type EmptyScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  onAddClick?: () => void;
};

function EmptyScheduleModal({ open, onClose, onAddClick }: EmptyScheduleModalProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="오늘 일정 없음" className="max-w-[960px] px-8 pb-7 pt-7">
      <h2 className="text-body font-bold text-neutral-10">오늘 일정이 없어요.</h2>
      <p className="mt-5 text-caption font-medium text-neutral-60">일정을 추가해 학습 계획을 세워보세요.</p>

      <div className="mt-[7px] flex justify-end gap-2.5">
        <ModalButton variant="cancel" onClick={onClose}>
          취소
        </ModalButton>
        <ModalButton
          variant="primary"
          className="px-5"
          icon={<AddCircleIcon className="h-[15px] w-[15px]" />}
          onClick={onAddClick}
        >
          일정 추가하기
        </ModalButton>
      </div>
    </Modal>
  );
}

export default EmptyScheduleModal;