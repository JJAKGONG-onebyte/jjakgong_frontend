import HomeCard from "./HomeCard";
import { ReactComponent as PaceIcon } from "../../../assets/icons/pace.svg";

type TodayStudyTimeCardProps = {
  minutes: number;
  goalMinutes: number;
};

function TodayStudyTimeCard({ minutes, goalMinutes }: TodayStudyTimeCardProps) {
  const percent = Math.min(100, (minutes / goalMinutes) * 100);

  return (
    <HomeCard
      title="오늘 누적 학습 시간"
      icon={<PaceIcon className="w-[30px] h-[30px]" />}
      background="light"
    >
      <p className="mt-5 flex items-baseline gap-2">
        <span className="text-base font-bold text-neutral-10">{minutes}분</span>
        <span className="text-small text-neutral-60">/ {goalMinutes}분</span>
      </p>

      {/* 진행 막대 */}
      <div className="mt-2.5 h-4 w-full rounded-full bg-neutral-90">
        <div
          className="h-full min-w-[16px] rounded-full bg-primary-10"
          style={{ width: `${percent}%` }}
        />
      </div>
    </HomeCard>
  );
}

export default TodayStudyTimeCard;