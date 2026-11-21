import { ReactNode } from "react";
import { ReactComponent as ChevronDownIcon } from "../../../assets/icons/chevron-down.svg";

type HomeCardProps = {
  title: string;
  icon?: ReactNode;
  titleClassName?: string;
  background: "blue" | "pink" | "light";
  showMore?: boolean;
  children?: ReactNode;
};

// 피그마 그라데이션 G/1, G/2, G/3 (위 흰색 → 아래 색)
const backgroundStyles = {
  blue: "bg-gradient-to-b from-white to-gradient-1",
  pink: "bg-gradient-to-b from-white to-sec-80",
  light: "bg-gradient-to-b from-white to-gradient-3",
};

// 홈 화면 카드 공통 틀: 둥근 상자 + 제목줄(아이콘, 제목, 더보기)
function HomeCard({
  title,
  icon,
  titleClassName = "text-neutral-10",
  background,
  showMore = false,
  children,
}: HomeCardProps) {
  return (
    <section
      className={`relative h-full rounded-[15px] shadow-50 px-9 pt-7 ${backgroundStyles[background]}`}
    >
      {/* 제목줄 */}
      <div className="flex items-center justify-between">
        <h2 className={`flex items-center gap-2.5 text-body font-bold ${titleClassName}`}>
          {icon}
          {title}
        </h2>

        {showMore && (
          // TODO: 라우터 도입 후 해당 페이지로 이동
          <button type="button" className="flex items-center text-caption font-medium text-neutral-60">
            더보기
            <ChevronDownIcon className="w-5 h-[13px] -rotate-90" />
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

export default HomeCard;