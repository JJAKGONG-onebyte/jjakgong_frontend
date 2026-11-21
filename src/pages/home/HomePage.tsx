import MainLayout from "../../components/MainLayout";
import HomeBanner from "./components/HomeBanner";
import TodayMaterialsCard from "./components/TodayMaterialsCard";
import CharacterCard from "./components/CharacterCard";
import TodayStudyTimeCard from "./components/TodayStudyTimeCard";
import StreakCard from "./components/StreakCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import { homeMockData as mock } from "./data/homeMockData";

function HomePage() {
  return (
    // TODO: 라우터 도입 후 메뉴 이동 연결
    <MainLayout activeMenu="홈" onMenuClick={() => {}} userName={mock.userName}>
      <div className="pt-[9px]">
        <div className="h-[203px]">
          <HomeBanner />
        </div>

        <div className="mt-9 grid grid-cols-3 gap-[30px]">
          <div className="h-[720px]">
            <TodayMaterialsCard materials={mock.materials} />
          </div>

          <div className="h-[720px]">
            <CharacterCard subject={mock.todaySubject} />
          </div>

          <div className="flex flex-col gap-[30px]">
            <div className="h-[220px]">
              <TodayStudyTimeCard minutes={mock.todayStudyMinutes} goalMinutes={mock.goalMinutes} />
            </div>
            <div className="h-[220px]">
              <StreakCard days={mock.streakDays} />
            </div>
            <div className="h-[220px]">
              <RecentRecordsCard records={mock.recentRecords} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;