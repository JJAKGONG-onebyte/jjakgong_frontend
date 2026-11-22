import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_SETTINGS,
  loadStudySettings,
  saveStudySettings,
  STUDY_SETTINGS_STORAGE_KEY,
  StudySettings,
} from "../pages/settings/data/studySettings";

type StudySettingsContextValue = {
  settings: StudySettings;
  /** 일부 값만 바꿔서 저장 (예: updateSettings({ webcamTracking: false })) */
  updateSettings: (patch: Partial<StudySettings>) => void;
  /** 기본값(학습 50분 · 휴식 10분 · 웹캠 ON)으로 되돌리고 저장 */
  resetSettings: () => void;
};

const StudySettingsContext = createContext<StudySettingsContextValue | null>(null);

/**
 * 학습 설정(학습·휴식 시간, 웹캠 트래킹)을 앱 전체에서 함께 쓰는 상태.
 * 지금은 localStorage에 저장하고, API가 생기면 load/save 함수만 바꾸면 된다.
 */
export function StudySettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StudySettings>(loadStudySettings);

  const updateSettings = useCallback((patch: Partial<StudySettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveStudySettings(next);
      return next;
    });
  }, []);

  const resetSettings = useCallback(() => {
    saveStudySettings(DEFAULT_SETTINGS);
    setSettings(DEFAULT_SETTINGS);
  }, []);

  // 다른 탭에서 설정을 바꾸면 이 탭에도 반영
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STUDY_SETTINGS_STORAGE_KEY) setSettings(loadStudySettings());
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const value = useMemo(
    () => ({ settings, updateSettings, resetSettings }),
    [settings, updateSettings, resetSettings]
  );

  return <StudySettingsContext.Provider value={value}>{children}</StudySettingsContext.Provider>;
}

/** 어느 페이지에서든 학습 설정을 읽고 바꿀 때 사용 */
export function useStudySettings() {
  const context = useContext(StudySettingsContext);
  if (!context) {
    throw new Error("useStudySettings는 StudySettingsProvider 안에서만 사용할 수 있어요.");
  }
  return context;
}
