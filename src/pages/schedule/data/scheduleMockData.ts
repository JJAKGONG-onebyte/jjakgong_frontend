import { Schedule } from "../../../types/schedule";

export const scheduleMockData = {
  userName: "송 눈송",

  today: "2026-10-08",
  calendarYear: 2026,
  calendarMonth: 10,

  schedules: [
    { id: 1, title: "데이터베이스 과제 제출", date: "2026-10-08", time: "14:00", priority: "high", done: false },
    { id: 2, title: "자격증 문제 풀이", date: "2026-10-08", priority: "medium", done: false },
    { id: 3, title: "영어 단어 복습", date: "2026-10-08", time: "20:00", priority: "low", done: true },
    { id: 4, title: "자격증 문제 풀이", date: "2026-10-07", priority: "medium", done: true },
    { id: 5, title: "영어 단어 복습", date: "2026-10-07", priority: "low", done: true },
    { id: 6, title: "자격증 문제 풀이", date: "2026-10-09", priority: "medium", done: false },
    { id: 7, title: "생활법률 중간고사", date: "2026-10-13", priority: "high", done: false },
    { id: 8, title: "영어 단어 복습", date: "2026-10-15", priority: "low", done: false },
  ] as Schedule[],
};