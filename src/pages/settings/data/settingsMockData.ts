// 학습 기록 API 연동 전 임시 데이터
export const settingsMockData = {
  userName: "송 눈송",

  // 이번 주 요일별 학습 시간(분). 아직 오지 않은 날은 null
  weeklyStudy: [
    { day: "월", minutes: 190 },
    { day: "화", minutes: 150 },
    { day: "수", minutes: 236 },
    { day: "목", minutes: 300 },
    { day: "금", minutes: null },
    { day: "토", minutes: null },
    { day: "일", minutes: null },
  ] as { day: string; minutes: number | null }[],

  streakDays: 5,
};
