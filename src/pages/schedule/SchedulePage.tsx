import MainLayout from "../../components/MainLayout";
import TodayScheduleCard from "./components/TodayScheduleCard";
import CalendarCard from "./components/CalendarCard";
import ScheduleAddCard from "./components/ScheduleAddCard";
import { scheduleMockData as mock } from "./data/scheduleMockData";

function SchedulePage() {
  const todaySchedules = mock.schedules.filter((schedule) => schedule.date === mock.today);

  return (
    <MainLayout activeMenu="일정 관리" onMenuClick={() => {}} userName={mock.userName}>
      <div className="pt-[9px]">
        <h1 className="text-base font-bold text-neutral-10">일정 관리</h1>

        <div className="mt-[19px] flex gap-[30px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[30px]">
            <div className="h-[213px]">
              <TodayScheduleCard schedules={todaySchedules} />
            </div>
            <div className="h-[653px]">
              <CalendarCard
                year={mock.calendarYear}
                month={mock.calendarMonth}
                today={mock.today}
                schedules={mock.schedules}
              />
            </div>
          </div>

          <div className="h-[896px] w-[410px] shrink-0">
            <ScheduleAddCard />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default SchedulePage;