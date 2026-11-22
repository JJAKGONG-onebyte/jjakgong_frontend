import { useState } from "react";
import Modal from "../../../components/Modal";
import ModalField from "./ModalField";
import ModalButton from "./ModalButton";
import PriorityPicker from "./PriorityPicker";
import { Priority, Schedule } from "../../../types/schedule";

type ScheduleFormModalProps = {
  open: boolean;
  onClose: () => void;
  schedule?: Schedule;
};

function ScheduleFormModal({ open, onClose, schedule }: ScheduleFormModalProps) {
  const isEdit = schedule !== undefined;
  const heading = isEdit ? "일정 수정" : "일정 추가";

  const [title, setTitle] = useState(schedule?.title ?? "");
  const [date, setDate] = useState(schedule?.date ?? "");
  const [time, setTime] = useState(schedule?.time ?? "");
  const [priority, setPriority] = useState<Priority>(schedule?.priority ?? "medium");
  const [repeat, setRepeat] = useState(schedule?.repeat ?? "");
  const [repeatEnd, setRepeatEnd] = useState(schedule?.repeatEnd ?? "");

  return (
    <Modal open={open} onClose={onClose} ariaLabel={heading} className="max-w-[960px] px-8 pb-[25px] pt-7">
      <h2 className="text-body font-bold text-neutral-10">{heading}</h2>

      <div className="mt-[30px] flex flex-col gap-5">
        <ModalField label="제목" value={title} onChange={setTitle} placeholder="일정 제목" />

        <div className="grid grid-cols-2 gap-5">
          <ModalField label="날짜" value={date} onChange={setDate} placeholder="YYYY-MM-DD" />
          <ModalField label="시간" value={time} onChange={setTime} placeholder="비우면 종일" />
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="text-caption font-medium text-neutral-10">우선순위</span>
          <PriorityPicker value={priority} onChange={setPriority} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <ModalField label="반복" value={repeat} onChange={setRepeat} placeholder="없음/매일/매주/매월" />
          <ModalField label="종료일" value={repeatEnd} onChange={setRepeatEnd} placeholder="YYYY-MM-DD" />
        </div>
      </div>

      <div className="mt-[25px] flex justify-end gap-2.5">
        <ModalButton variant="cancel" onClick={onClose}>
          취소
        </ModalButton>
        {/* TODO: 일정 저장 / 수정 API 연결 */}
        <ModalButton variant="primary">저장</ModalButton>
      </div>
    </Modal>
  );
}

export default ScheduleFormModal;