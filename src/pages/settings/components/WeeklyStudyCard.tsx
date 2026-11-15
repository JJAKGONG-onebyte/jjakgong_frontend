import SettingsCard from "./SettingsCard";
import { ReactComponent as ClockIcon } from "../../../assets/icons/pace.svg";

type WeeklyStudyCardProps = {
  days: { day: string; minutes: number | null }[];
};

const formatDuration = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}분`;
  return minutes === 0 ? `${hours}시간` : `${hours}시간 ${minutes}분`;
};

function WeeklyStudyCard({ days }: WeeklyStudyCardProps) {
  const total = days.reduce((sum, d) => sum + (d.minutes ?? 0), 0);
  const maxMinutes = Math.max(60, ...days.map((d) => d.minutes ?? 0));

  return (
    <SettingsCard
      title="이번 주 학습 시간"
      icon={<ClockIcon className="w-[30px] h-[30px]" />}
      background="bg-gradient-to-t from-sec-80 to-white"
      className="flex flex-1 flex-col"
    >
      <p className="mt-3 text-base font-bold text-primary-10">총 {formatDuration(total)}</p>

      <div className="flex min-h-[240px] flex-1 items-stretch justify-between gap-2 px-1 pt-6">
        {days.map(({ day, minutes }) => {
          const studied = minutes !== null && minutes > 0;
          return (
            <div key={day} className="flex flex-1 flex-col items-center gap-3">
              {/* 막대 영역 */}
              <div className="flex w-full min-h-0 flex-1 items-end justify-center">
                <div
                  title={minutes === null ? `${day}요일` : `${day}요일 ${formatDuration(minutes)}`}
                  className={`w-full max-w-[22px] rounded-t-full
                    ${studied ? "bg-primary-10 shadow-[0_0_10px_0_#2B52FF80]" : "h-[10px] bg-neutral-80/70"}`}
                  style={studied ? { height: `${(minutes / maxMinutes) * 100}%` } : undefined}
                />
              </div>
              <span className="text-[18px] leading-[26px] font-medium tracking-normal text-center text-neutral-70">{day}</span>
            </div>
          );
        })}
      </div>
    </SettingsCard>
  );
}

export default WeeklyStudyCard;
