export type TimerMode = "study" | "break";

export type StudySettings = {
  studyMinutes: number;
  breakMinutes: number;
  webcamTracking: boolean;
};

// 모드별 설정 범위와 기본값
export const TIMER_CONFIG: Record<
  TimerMode,
  { label: string; min: number; max: number; defaultMinutes: number; presets: number[] }
> = {
  study: { label: "학습 시간", min: 5, max: 180, defaultMinutes: 50, presets: [25, 50, 90] },
  break: { label: "휴식 시간", min: 1, max: 60, defaultMinutes: 10, presets: [5, 10, 15] },
};

export const DEFAULT_SETTINGS: StudySettings = {
  studyMinutes: TIMER_CONFIG.study.defaultMinutes,
  breakMinutes: TIMER_CONFIG.break.defaultMinutes,
  webcamTracking: true,
};

export const clampMinutes = (mode: TimerMode, minutes: number) => {
  const { min, max } = TIMER_CONFIG[mode];
  return Math.min(max, Math.max(min, Math.round(minutes)));
};

// 백엔드 API가 생기기 전까지는 브라우저(localStorage)에 저장
export const STUDY_SETTINGS_STORAGE_KEY = "jjakgong:studySettings";

export function loadStudySettings(): StudySettings {
  try {
    const raw = localStorage.getItem(STUDY_SETTINGS_STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;

    const parsed = JSON.parse(raw) as Partial<StudySettings>;
    return {
      studyMinutes: clampMinutes("study", parsed.studyMinutes ?? DEFAULT_SETTINGS.studyMinutes),
      breakMinutes: clampMinutes("break", parsed.breakMinutes ?? DEFAULT_SETTINGS.breakMinutes),
      webcamTracking: parsed.webcamTracking ?? DEFAULT_SETTINGS.webcamTracking,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveStudySettings(settings: StudySettings) {
  try {
    localStorage.setItem(STUDY_SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // 저장소를 쓸 수 없는 환경(시크릿 모드 등)에서는 무시
  }
}
