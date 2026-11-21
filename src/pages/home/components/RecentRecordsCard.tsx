import HomeCard from "./HomeCard";
import { ReactComponent as ContractEditIcon } from "../../../assets/icons/contract-edit.svg";
import { HomeRecord } from "../../../types/home";

type RecentRecordsCardProps = {
  records: HomeRecord[];
};

function RecentRecordsCard({ records }: RecentRecordsCardProps) {
  return (
    <HomeCard
      title="최근 학습 기록"
      icon={
        <span className="flex h-[30px] w-[30px] items-center justify-center">
          <ContractEditIcon className="h-[25px] w-[25px]" />
        </span>
      }
      background="light"
      showMore
    >
      <ul className="mt-5 flex flex-col gap-2">
        {records.map((record) => (
          <li key={record.id} className="flex items-center gap-[25px] text-small">
            <span className="text-neutral-60">{record.date}</span>
            <span className="min-w-0 truncate text-neutral-10">{record.title}</span>
            <span className="ml-auto shrink-0 text-neutral-60">{record.minutes}분</span>
          </li>
        ))}
      </ul>
    </HomeCard>
  );
}

export default RecentRecordsCard;