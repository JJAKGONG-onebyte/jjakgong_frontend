import Modal from "../../../components/Modal";
import ModalButton from "./ModalButton";

type DeleteScheduleModalProps = {
  open: boolean;
  onClose: () => void;
};

function DeleteScheduleModal({ open, onClose }: DeleteScheduleModalProps) {
  return (
    <Modal open={open} onClose={onClose} ariaLabel="일정 삭제" className="max-w-[960px] px-8 pb-7 pt-7">
      <h2 className="text-body font-bold text-neutral-10">일정을 삭제할까요?</h2>
      <p className="mt-5 text-caption font-medium text-neutral-60">삭제한 일정은 복구할 수 없어요.</p>

      <div className="mt-[7px] flex justify-end gap-2.5">
        <ModalButton variant="cancel" onClick={onClose}>
          취소
        </ModalButton>
        {/* TODO: 일정 삭제 API 연결 */}
        <ModalButton variant="danger">삭제</ModalButton>
      </div>
    </Modal>
  );
}

export default DeleteScheduleModal;