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

const backgroundStyles = {
  blue: "bg-gradient-to-b from-white to-gradient-1",
  pink: "bg-gradient-to-b from-white to-sec-80",
  light: "bg-gradient-to-b from-white to-gradient-3",
};

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
      <div className="relative z-10 flex items-center justify-between">
        <h2 className={`flex items-center gap-2.5 text-body font-bold ${titleClassName}`}>
          {icon}
          {title}
        </h2>

        {showMore && (
          <button type="button" className="flex items-center text-caption font-medium text-neutral-60">
            더보기
            <span className="flex h-5 w-5 items-center justify-center">
              <ChevronDownIcon className="h-1.5 w-2.5 -rotate-90" />
            </span>
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

export default HomeCard;