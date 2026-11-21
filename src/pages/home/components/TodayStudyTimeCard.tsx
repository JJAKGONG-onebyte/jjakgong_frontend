import HomeCard from "./HomeCard";
import { ReactComponent as PaceIcon } from "../../../assets/icons/pace.svg";

// TODO: 오늘 누적 학습 시간 내용 구현
function TodayStudyTimeCard() {
  return (
    <HomeCard
      title="오늘 누적 학습 시간"
      icon={<PaceIcon className="w-[30px] h-[30px]" />}
      background="light"
    />
  );
}

export default TodayStudyTimeCard;