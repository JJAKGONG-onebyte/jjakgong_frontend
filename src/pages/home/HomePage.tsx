import MainLayout from "../../components/MainLayout";
import HomeBanner from "./components/HomeBanner";
import TodayMaterialsCard from "./components/TodayMaterialsCard";
import CharacterCard from "./components/CharacterCard";
import TodayStudyTimeCard from "./components/TodayStudyTimeCard";
import StreakCard from "./components/StreakCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import { homeMockData as mock } from "./data/homeMockData";

// 피그마 03 홈 레이아웃 (1920 × 1080 기준)
function HomePage() {
  return (
    // TODO: 라우터 도입 후 메뉴 이동 연결
    <MainLayout activeMenu="홈" onMenuClick={() => {}} userName={mock.userName}>
      {/* 상단바(84px) 아래로 9px 더 → 피그마 배너 top 93px */}
      <div className="pt-[9px]">
        {/* 배너 */}
        <div className="h-[203px]">
          <HomeBanner />
        </div>

        {/* 카드 3단 */}
        <div className="mt-9 grid grid-cols-3 gap-[30px]">
          <div className="h-[720px]">
            <TodayMaterialsCard />
          </div>

          <div className="h-[720px]">
            <CharacterCard />
          </div>

          {/* 오른쪽: 작은 카드 3개 세로로 */}
          <div className="flex flex-col gap-[30px]">
            <div className="h-[220px]">
              <TodayStudyTimeCard />
            </div>
            <div className="h-[220px]">
              <StreakCard />
            </div>
            <div className="h-[220px]">
              <RecentRecordsCard />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default HomePage;