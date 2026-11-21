import HomeCard from "./HomeCard";
import { ReactComponent as AssignmentIcon } from "../../../assets/icons/assignment.svg";

// TODO: 오늘의 학습 자료 내용 구현
function TodayMaterialsCard() {
  return (
    <HomeCard
      title="오늘의 학습 자료"
      icon={<AssignmentIcon className="w-[30px] h-[30px]" />}
      background="blue"
      showMore
    />
  );
}

export default TodayMaterialsCard;