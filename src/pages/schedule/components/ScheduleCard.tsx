import { ReactNode } from "react";

type ScheduleCardProps = {
  title: string;
  icon: ReactNode;
  background: "light" | "pink";
  headerRight?: ReactNode;
  children?: ReactNode;
};

const backgroundStyles = {
  light: "bg-gradient-to-b from-white to-gradient-3",
  pink: "bg-gradient-to-b from-white to-sec-80",
};

function ScheduleCard({ title, icon, background, headerRight, children }: ScheduleCardProps) {
  return (
    <section
      className={`relative h-full rounded-[15px] shadow-50 px-9 pt-7 ${backgroundStyles[background]}`}
    >
      <div className="flex items-start justify-between">
        <h2 className="flex items-center gap-2.5 text-body font-bold text-neutral-10">
          {icon}
          {title}
        </h2>
        {headerRight}
      </div>

      {children}
    </section>
  );
}

export default ScheduleCard;