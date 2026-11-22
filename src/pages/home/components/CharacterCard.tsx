import HomeCard from "./HomeCard";
import Button from "../../../components/Button";
import { ReactComponent as PersonEditIcon } from "../../../assets/icons/person-edit.svg";
import { ReactComponent as MenuBookIcon } from "../../../assets/icons/menu-book.svg";
import characterImage from "../../../assets/home/home-character.png";

type CharacterCardProps = {
  subject: string;
};

function CharacterCard({ subject }: CharacterCardProps) {
  return (
    <HomeCard
      title="짝공과 함께해요!"
      icon={
        <span className="flex h-[30px] w-[30px] items-center justify-center">
          <PersonEditIcon className="h-[22px] w-6" />
        </span>
      }
      background="pink"
    >
      <img
        src={characterImage}
        alt=""
        className="pointer-events-none absolute right-0 top-0 h-full w-auto rounded-r-[15px]"
      />

      {/* 말풍선 */}
      <div className="absolute left-[34px] top-[159px] z-10 flex h-[138px] w-[199px] items-center justify-center rounded-[10px] bg-neutral-100 shadow-50">
        <p className="text-center font-handwriting text-[22px] leading-[27px] text-neutral-60">
          오늘은
          <br />
          <span className="text-primary-10">{subject} 자료</span>로
          <br />
          공부해볼까?
        </p>
        <span className="absolute -bottom-2 right-10 h-4 w-4 rotate-45 bg-neutral-100" />
      </div>

      <div className="absolute inset-x-9 bottom-7 z-10">
        {/* TODO: StartLearningModal 연결 (#19) */}
        <Button
          fullWidth
          className="shadow-50"
          icon={<MenuBookIcon className="h-3 w-[17px]" />}
        >
          집중 학습 하러가기
        </Button>
      </div>
    </HomeCard>
  );
}

export default CharacterCard;