import { HomeMaterial, HomeRecord } from "../../../types/home";

// 홈 화면 목업 데이터 (API 연동 전까지)
export const homeMockData = {
  userName: "송 눈송",

  materials: [
    { id: 1, type: "pdf", name: "운영체제_강의자료.pdf", size: "12.4MB", date: "2026.09.20" },
    { id: 2, type: "txt", name: "자료구조_개념정리.txt", size: "2.2MB", date: "2026.09.20" },
    { id: 3, type: "pdf", name: "생활법률_강의자료.pdf", size: "6.8MB", date: "2026.09.20" },
  ] as HomeMaterial[],

  todaySubject: "운영체제",

  todayStudyMinutes: 0,
  goalMinutes: 50,

  streakDays: 5,

  recentRecords: [
    { id: 1, date: "26.09.20", title: "운영체제 기초 개념 학습", minutes: 32 },
  ] as HomeRecord[],
};