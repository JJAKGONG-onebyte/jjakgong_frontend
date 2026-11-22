import ScheduleCard from "./ScheduleCard";
import Badge from "../../../components/Badge";
import Checkbox from "../../../components/Checkbox";
import { ReactComponent as TodayIcon } from "../../../assets/icons/today.svg";
import { Schedule } from "../../../types/schedule";

type TodayScheduleCardProps = {
  schedules: Schedule[];
};

const priorityBadges = {
  high: { label: "높음", color: "red" },
  medium: { label: "보통", color: "blue" },
  low: { label: "낮음", color: "gray" },
} as const;

function TodayScheduleCard({ schedules }: TodayScheduleCardProps) {
  return (
    <ScheduleCard
      title="오늘 일정"
      icon={
        <span className="flex h-[30px] w-[30px] items-center justify-center">
          <TodayIcon className="h-[25px] w-[22.5px]" />
        </span>
      }
      background="light"
    >
      <ul className="mt-[18px] flex flex-col gap-4">
        {schedules.map((schedule) => {
          const badge = priorityBadges[schedule.priority];

          return (
            <li key={schedule.id} className="flex h-[25px] items-center text-caption font-medium">
              <Checkbox checked={schedule.done} />

              <span
                className={`ml-[15px] truncate ${
                  schedule.done ? "text-neutral-70 line-through decoration-neutral-80" : "text-neutral-10"
                }`}
              >
                {schedule.title}
              </span>

              <span className="ml-auto shrink-0">
                <Badge color={badge.color}>{badge.label}</Badge>
              </span>
              <span
                className={`ml-[15px] shrink-0 text-right ${
                  schedule.done ? "text-neutral-70" : "text-neutral-60"
                }`}
              >
                {schedule.time ?? "종일"}
              </span>
            </li>
          );
        })}
      </ul>
    </ScheduleCard>
  );
}

export default TodayScheduleCard;