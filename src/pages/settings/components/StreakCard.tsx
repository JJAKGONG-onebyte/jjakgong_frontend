import SettingsCard from "./SettingsCard";
import { ReactComponent as FireIcon } from "../../../assets/icons/local-fire-department.svg";

type StreakCardProps = {
  days: number;
};

function StreakCard({ days }: StreakCardProps) {
  return (
    <SettingsCard
      title={<span className="text-ter-80">연속 학습일</span>}
      icon={<FireIcon className="w-[30px] h-[30px] text-ter-80" />}
    >
      <div className="mt-3 flex items-center gap-5">
        <p className="shrink-0 text-large font-bold text-neutral-10">{days}일</p>
        <p className="text-small font-normal text-neutral-70">
          하루 10분 이상 학습하면
          <br />
          학습일로 인정돼요!
        </p>
      </div>
    </SettingsCard>
  );
}

export default StreakCard;
