import { QuizOption } from "../types/learning";

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

  quiz: {
    title: "Q1. 다음 중 스케일링 알고리즘이 아닌 것은?",
    options: [
      {
        id: 1,
        text: "① FCFS",
        status: "default",
      },
      {
        id: 2,
        text: "② Round Robin",
        status: "incorrect",
        label: "오답",
      },
      {
        id: 3,
        text: "③ Paging",
        status: "correct",
        label: "정답",
      },
      {
        id: 4,
        text: "④ SJF",
        status: "default",
      },
    ] as QuizOption[],
    explanation: "해설 : Paging은 메모리 관리 기법이에요.",
  },

  chatPlaceholder: "궁금한 걸 물어보세요.",

  materialPlaceholder: "선택한 학습 자료를 이 영역에서 확인할 수 있습니다.",

  drowsinessAlert: {
    title: "졸음 감지",
    message: "졸려 보이네. 잠깐 쉬었다 할까?",
  },

  controls: {
    camera: "카메라(집중 트래킹)",
    material: "학습 자료 보기",
    rest: "휴식하기",
    end: "학습 종료하기",
  },
};