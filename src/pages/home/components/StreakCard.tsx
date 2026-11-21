import HomeCard from "./HomeCard";
import { ReactComponent as FireIcon } from "../../../assets/icons/local-fire-department.svg";

// TODO: 연속 학습일 내용 구현
function StreakCard() {
  return (
    <HomeCard
      title="연속 학습일"
      icon={<FireIcon className="w-[30px] h-[30px]" />}
      titleClassName="text-ter-80"
      background="light"
    />
  );
}

export default StreakCard;