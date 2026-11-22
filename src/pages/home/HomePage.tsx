import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import HomeBanner from "./components/HomeBanner";
import TodayMaterialsCard from "./components/TodayMaterialsCard";
import CharacterCard from "./components/CharacterCard";
import TodayStudyTimeCard from "./components/TodayStudyTimeCard";
import StreakCard from "./components/StreakCard";
import RecentRecordsCard from "./components/RecentRecordsCard";
import { homeMockData as mock } from "./data/homeMockData";
import { navigateToMenu } from "../../utils/navigation";
import StartLearningModal, { getLearningPath } from "../learning/components/StartLearningModal";

function HomePage() {
  const [showStartModal, setShowStartModal] = useState(false);

  return (
    // 라우터 도입 전 임시 이동 (utils/navigation.ts)
    <MainLayout activeMenu="홈" onMenuClick={navigateToMenu} userName={mock.userName}>
      <div className="pt-[9px]">
        <div className="h-[203px]">
          <HomeBanner />
        </div>

        <div className="mt-9 grid grid-cols-3 gap-[30px]">
          <div className="h-[720px]">
            <TodayMaterialsCard materials={mock.materials} />
          </div>

          <div className="h-[720px]">
            <CharacterCard subject={mock.todaySubject} onStartLearning={() => setShowStartModal(true)} />
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

      {/* 학습 시작 팝업 (#19) */}
      <StartLearningModal
        open={showStartModal}
        onClose={() => setShowStartModal(false)}
        // TODO: 선택한 자료/시간/웹캠 설정을 학습 세션 생성 API로 보내기
        onStart={(options) => {
          window.location.href = getLearningPath(options);
        }}
      />
    </MainLayout>
  );
}

export default HomePage;