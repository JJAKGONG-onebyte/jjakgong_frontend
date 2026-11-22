import { useState } from "react";
import ScheduleCard from "./ScheduleCard";
import FormField from "../../../components/FormField";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { ReactComponent as CalendarAddOnIcon } from "../../../assets/icons/calendar-add-on.svg";
import { Priority } from "../../../types/schedule";

const priorityOptions: { value: Priority; label: string }[] = [
  { value: "high", label: "높음" },
  { value: "medium", label: "보통" },
  { value: "low", label: "낮음" },
];

function ScheduleAddCard() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [repeat, setRepeat] = useState("");
  const [end, setEnd] = useState("");

  return (
    <ScheduleCard
      title="일정 추가"
      icon={
        <span className="flex h-[30px] w-[30px] items-center justify-center">
          <CalendarAddOnIcon className="h-[25px] w-[23.75px]" />
        </span>
      }
      background="pink"
    >
      <div className="mt-5 flex flex-col gap-5">
        <FormField label="제목 (필수)">
          <Input value={title} onChange={setTitle} placeholder="일정 제목" />
        </FormField>

        <div className="grid grid-cols-2 gap-2.5">
          <FormField label="날짜">
            <Input value={date} onChange={setDate} placeholder="YYYY-MM-DD" />
          </FormField>
          <FormField label="시간">
            <Input value={time} onChange={setTime} placeholder="비우면 종일" />
          </FormField>
        </div>

        <FormField label="마감일 (선택)">
          <Input value={dueDate} onChange={setDueDate} placeholder="YYYY-MM-DD" />
        </FormField>

        <div className="flex flex-col gap-2.5">
          <span className="text-small font-bold text-neutral-60">우선순위</span>
          <div className="flex gap-[15px]">
            {priorityOptions.map((option) => {
              const selected = priority === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setPriority(option.value)}
                  className={`h-[33px] rounded-full px-[15px] text-small ${
                    selected
                      ? "bg-primary-10 font-bold text-neutral-100 shadow-50"
                      : "bg-primary-90 text-neutral-60 ring-1 ring-inset ring-neutral-60"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <FormField label="반복">
          <Input value={repeat} onChange={setRepeat} placeholder="없음/매일/매주/매월" />
        </FormField>

        <FormField label="종료">
          <Input value={end} onChange={setEnd} placeholder="종료일 또는 횟수" />
        </FormField>
      </div>

      <div className="absolute inset-x-9 bottom-7">
        <Button fullWidth>일정 저장하기</Button>
      </div>
    </ScheduleCard>
  );
}

export default ScheduleAddCard;