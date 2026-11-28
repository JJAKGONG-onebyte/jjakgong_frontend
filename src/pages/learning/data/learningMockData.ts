export const learningPageAMockData = {
  userName: "송 눈송님",

  materialName: "운영체제_강의자료.pdf",

  elapsedTime: "00:32:10",
  totalTime: "00:50:00",

  focusTracking: true,

  characterName: "짝공",

  chat: {
    question: "프로세스랑 스레드 차이가 뭐야?",
    answer: [
      "선택한 자료 기준으로 설명할게요.",
      "프로세스는 실행 중인 프로그램,",
      "스레드는 그 안의 실행 흐름이에요.",
    ],
  },

  chatPlaceholder: "궁금한 걸 물어보세요.",

  // 학습 종료 팝업 요약 (백엔드 연동 전 임시값)
  endSummary: {
    sessionTime: "32분 10초",
    quizResult: "총 5문제 (정답 3개 / 오답 2개)",
    todayTotalTime: "32분 10초",
    exp: "+32 EXP",
  },

  controls: {
    camera: "카메라(집중 트래킹)",
    material: "학습 자료 보기",
    rest: "휴식하기",
    end: "학습 종료하기",
  },
};