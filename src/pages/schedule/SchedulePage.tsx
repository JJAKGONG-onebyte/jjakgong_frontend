import MainLayout from "../../components/MainLayout";
import TodayScheduleCard from "./components/TodayScheduleCard";
import CalendarCard from "./components/CalendarCard";
import ScheduleAddCard from "./components/ScheduleAddCard";
import ScheduleFormModal from "./components/ScheduleFormModal";
import RepeatScopeModal from "./components/RepeatScopeModal";
import DeleteScheduleModal from "./components/DeleteScheduleModal";
import EmptyScheduleModal from "./components/EmptyScheduleModal";
import { scheduleMockData as mock } from "./data/scheduleMockData";

function SchedulePage() {
  const todaySchedules = mock.schedules.filter((schedule) => schedule.date === mock.today);

  // TODO: 인터랙션 단계에서 버튼 클릭으로 열기. 지금은 주소로 확인 (예: /schedules?modal=edit)
  const previewModal = new URLSearchParams(window.location.search).get("modal");
  const closePreview = () => {
    window.location.href = "/schedules";
  };

  return (
    // TODO: 라우터 도입 후 메뉴 이동 연결
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

      {/* 모달 미리 보기 */}
      <ScheduleFormModal open={previewModal === "add"} onClose={closePreview} />
      <ScheduleFormModal open={previewModal === "edit"} onClose={closePreview} schedule={mock.schedules[0]} />
      <RepeatScopeModal open={previewModal === "repeat"} onClose={closePreview} />
      <DeleteScheduleModal open={previewModal === "delete"} onClose={closePreview} />
      <EmptyScheduleModal open={previewModal === "empty"} onClose={closePreview} />
    </MainLayout>
  );
}

export default SchedulePage;