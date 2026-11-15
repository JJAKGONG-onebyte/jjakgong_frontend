import { useState } from "react";
import MainLayout from "../../components/MainLayout";
import PomodoroCard, { TimerValues } from "./components/PomodoroCard";
import WebcamTrackingCard from "./components/WebcamTrackingCard";
import WeeklyStudyCard from "./components/WeeklyStudyCard";
import StreakCard from "./components/StreakCard";
import { loadStudySettings, saveStudySettings, StudySettings } from "./data/studySettings";
import { settingsMockData as mock } from "./data/settingsMockData";

type StudySettingsPageProps = {
  onMenuClick?: (label: string) => void;
};

function StudySettingsPage({ onMenuClick = () => {} }: StudySettingsPageProps) {
  const [settings, setSettings] = useState<StudySettings>(loadStudySettings);

  const updateSettings = (patch: Partial<StudySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveStudySettings(next);
      return next;
    });
  };

  const handleTimerSave = (values: TimerValues) => updateSettings(values);

  return (
    <MainLayout activeMenu="학습 설정" onMenuClick={onMenuClick} userName={mock.userName}>
      <h1 className="text-base font-bold text-neutral-10">학습 설정</h1>

      <div className="mt-5 grid grid-cols-1 gap-7 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)]">
        {/* 왼쪽: 타이머 + 웹캠 (오른쪽 주간 통계와 높이를 맞춤) */}
        <div className="flex min-w-0 flex-col gap-7 xl:col-start-1 xl:row-start-1">
          <PomodoroCard
            savedValues={{ studyMinutes: settings.studyMinutes, breakMinutes: settings.breakMinutes }}
            onSave={handleTimerSave}
          />
          <WebcamTrackingCard
            enabled={settings.webcamTracking}
            onChange={(webcamTracking) => updateSettings({ webcamTracking })}
          />
        </div>

        {/* 오른쪽 위: 주간 통계 — 왼쪽 열(웹캠 카드 끝)까지 늘어남 */}
        <div className="flex min-w-0 flex-col xl:col-start-2 xl:row-start-1">
          <WeeklyStudyCard days={mock.weeklyStudy} />
        </div>

        {/* 오른쪽 아래: 연속 학습일 */}
        <div className="min-w-0 xl:col-start-2 xl:row-start-2">
          <StreakCard days={mock.streakDays} />
        </div>
      </div>
    </MainLayout>
  );
}

export default StudySettingsPage;
