import ScheduleCard from "./ScheduleCard";
import { ReactComponent as CalendarMonthIcon } from "../../../assets/icons/calendar-month.svg";
import { Schedule } from "../../../types/schedule";

type CalendarCardProps = {
  year: number;
  month: number; // 1 ~ 12
  today: string; // "2026-10-08"
  schedules: Schedule[];
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

const gridColumns = "grid grid-cols-[repeat(6,163px)_1fr]";

function getWeeks(year: number, month: number) {
  const firstWeekday = new Date(year, month - 1, 1).getDay(); // 1일의 요일 (0 = 일요일)
  const lastDate = new Date(year, month, 0).getDate(); // 이번 달 마지막 날짜

  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null), // 1일 앞 빈칸
    ...Array.from({ length: lastDate }, (_, i) => i + 1), // 1 ~ 마지막 날
  ];
  while (cells.length % 7 !== 0) cells.push(null); // 마지막 주 뒤 빈칸

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }
  return weeks;
}

function toDateString(year: number, month: number, day: number) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function getChipStyle(schedule: Schedule) {
  if (schedule.done) return "bg-neutral-90 text-neutral-80";
  if (schedule.priority === "high") return "bg-ter-80 text-white";
  if (schedule.priority === "medium") return "bg-primary-10 text-white";
  return "border border-neutral-70 bg-neutral-100 text-neutral-60";
}

function CalendarCard({ year, month, today, schedules }: CalendarCardProps) {
  const weeks = getWeeks(year, month);

  return (
    <ScheduleCard
      title="일정 목록 / 캘린더"
      icon={
        <span className="flex h-[30px] w-[30px] items-center justify-center">
          <CalendarMonthIcon className="h-[25px] w-[22.5px]" />
        </span>
      }
      background="light"
      headerRight={<p className="-mr-[7px] text-base font-bold text-primary-10">{month}월</p>}
    >
      <div className="-mx-1.5">
        <div
          className={`${gridColumns} mt-[5px] h-[26px] rounded-t-[15px] bg-gradient-to-b from-white to-gradient-3 pt-[5px]`}
        >
          {weekdays.map((weekday, index) => (
            <span
              key={weekday}
              className={`pl-1.5 text-caption font-medium ${
                index === 0 || index === 6 ? "text-neutral-60" : "text-neutral-10"
              }`}
            >
              {weekday}
            </span>
          ))}
        </div>

        <div className="mt-0.5 border-t-2 border-neutral-80">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className={`${gridColumns} h-[109px] border-b border-neutral-90 last:border-b-0`}
            >
              {week.map((day, dayIndex) => {
                if (day === null) return <div key={dayIndex} />; // 빈칸

                const dateString = toDateString(year, month, day);
                const isToday = dateString === today;
                const isWeekend = dayIndex === 0 || dayIndex === 6;
                const daySchedules = schedules.filter((schedule) => schedule.date === dateString);

                return (
                  <div key={dayIndex} className="min-w-0 px-1.5 pt-px">
                    {isToday ? (
                      <span className="-ml-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary-10 text-body font-bold text-neutral-100 shadow-50">
                        {day}
                      </span>
                    ) : (
                      <span className={`text-body ${isWeekend ? "text-neutral-60" : "text-neutral-10"}`}>
                        {day}
                      </span>
                    )}

                    <ul className="mt-0.5 flex flex-col gap-[5px]">
                      {daySchedules.map((schedule) => (
                        <li
                          key={schedule.id}
                          className={`h-[18px] truncate rounded-full px-2 text-center text-caption font-bold leading-[18px] ${getChipStyle(schedule)}`}
                        >
                          {schedule.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </ScheduleCard>
  );
}

export default CalendarCard;