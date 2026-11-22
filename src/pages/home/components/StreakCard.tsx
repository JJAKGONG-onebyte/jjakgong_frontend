import HomeCard from "./HomeCard";
import { ReactComponent as FireIcon } from "../../../assets/icons/local-fire-department.svg";
import editorChoiceUrl from "../../../assets/icons/editor-choice.svg";

type StreakCardProps = {
  days: number;
};

function StreakCard({ days }: StreakCardProps) {
  return (
    <HomeCard
      title="연속 학습일"
      icon={<FireIcon className="w-[30px] h-[30px] text-ter-80" />}
      titleClassName="text-ter-80"
      background="light"
    >
      <div className="mt-5 flex items-start justify-between">
        <p className="flex items-baseline gap-2">
          <span className="text-base font-bold text-neutral-10">{days}일</span>
          <span className="text-small text-primary-10">꾸준히 잘 하고 있어요!</span>
        </p>

        <img src={editorChoiceUrl} alt="" className="w-10 h-10" />
      </div>
    </HomeCard>
  );
}

export default StreakCard;