import HomeCard from "./HomeCard";
import Button from "../../../components/Button";
import { ReactComponent as DocumentIcon } from "../../../assets/icons/document.svg";
import { ReactComponent as AddCircleIcon } from "../../../assets/icons/add-circle.svg";
import { ReactComponent as ChevronDownIcon } from "../../../assets/icons/chevron-down.svg";
import { HomeMaterial } from "../../../types/home";

type TodayMaterialsCardProps = {
  materials: HomeMaterial[];
};

const badgeStyles = {
  pdf: "bg-ter-80",
  txt: "bg-primary-10",
};

function TodayMaterialsCard({ materials }: TodayMaterialsCardProps) {
  return (
    <HomeCard
      title="오늘의 학습 자료"
      icon={
        <span className="flex h-[30px] w-[30px] items-center justify-center">
          <DocumentIcon className="h-[25px] w-[22.5px]" />
        </span>
      }
      background="blue"
      showMore
    >
      <ul className="mt-5 flex flex-col gap-4">
        {materials.map((material) => (
          <li key={material.id}>
            {/* TODO: 클릭하면 자료 상세로 이동 */}
            <button
              type="button"
              className="flex h-20 w-full items-center gap-[15px] rounded-[10px] border-2 border-neutral-90 bg-neutral-100 px-[13px] text-left"
            >
              <span
                className={`flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[10px] font-handwriting text-[22px] leading-[30px] text-white ${badgeStyles[material.type]}`}
              >
                {material.type.toUpperCase()}
              </span>

              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="truncate text-small text-black">{material.name}</span>
                <span className="text-caption font-medium text-neutral-60">
                  {material.size} {material.date}
                </span>
              </span>

              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <ChevronDownIcon className="h-1.5 w-2.5 -rotate-90" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="absolute inset-x-9 bottom-7">
        {/* TODO: 학습 자료 업로드 페이지로 이동 */}
        <Button
          variant="white"
          fullWidth
          icon={<AddCircleIcon className="h-[15px] w-[15px] text-primary-10" />}
        >
          학습 자료 업로드 하기
        </Button>
      </div>
    </HomeCard>
  );
}

export default TodayMaterialsCard;