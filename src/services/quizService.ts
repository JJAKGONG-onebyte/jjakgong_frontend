import type { QuizGrade, QuizQuestion } from "../types/learning";

// AI 문제 생성/채점 창구.
// 화면/훅은 이 함수들만 사용하므로, 백엔드가 준비되면 이 파일 안쪽만 교체하면 된다.
//
// TODO(백엔드 연동)
//   생성: POST /api/learning/materials/{materialId}/quizzes          → QuizQuestion
//         - 텍스트 추출 실패  → QuizError("NO_TEXT")
//         - 같은 자료 재요청 제한 → QuizError("COOLDOWN", retryAfter 초)
//         - 그 외 실패        → QuizError("GENERATE_FAILED")
//   채점: POST /api/learning/quizzes/{questionId}/answers  { answer } → QuizGrade
//         (정답은 화면에 미리 내려주지 않고 채점 응답으로만 받는다. 풀이 기록 저장·세션 통계 반영은 서버에서)

export type QuizErrorCode = "GENERATE_FAILED" | "NO_TEXT" | "COOLDOWN";

export class QuizError extends Error {
  code: QuizErrorCode;
  retryAfterSec: number;

  constructor(code: QuizErrorCode, retryAfterSec = 0) {
    super(code);
    this.name = "QuizError";
    this.code = code;
    this.retryAfterSec = retryAfterSec;
  }
}

// ----- 아래는 목업 -----

type MockQuiz = Omit<QuizQuestion, "id" | "number"> & {
  answer: string; // 단답형 정답 / 객관식 정답 보기 id
  answerText: string;
  explanation: string;
};

const MOCK_QUIZZES: MockQuiz[] = [
  {
    type: "short",
    question: "실행 중인 프로그램을 무엇이라고 하나요?",
    answer: "프로세스",
    answerText: "프로세스",
    explanation: "실행 중인 프로그램은 '프로세스'라고 합니다.",
  },
  {
    type: "multiple",
    question: "다음 중 스케줄링 알고리즘이 아닌 것은?",
    options: [
      { id: "1", text: "① FCFS" },
      { id: "2", text: "② Round Robin" },
      { id: "3", text: "③ Paging" },
      { id: "4", text: "④ SJF" },
    ],
    answer: "3",
    answerText: "③ Paging",
    explanation: "Paging은 메모리 관리 기법이에요.",
  },
  {
    type: "short",
    question: "프로세스 안에서 실제로 실행되는 흐름의 단위를 무엇이라고 하나요?",
    answer: "스레드",
    answerText: "스레드",
    explanation: "한 프로세스 안의 실행 흐름 단위를 '스레드'라고 해요.",
  },
];

const MOCK_DELAY_MS = 1_500;
const MOCK_LIMIT_PER_MATERIAL = 5; // 같은 자료로 연속 생성 가능한 문제 수
const MOCK_COOLDOWN_SEC = 30;

const issued = new Map<string, MockQuiz>(); // questionId → 정답 (서버만 알고 있는 값)
const issuedCount = new Map<string, number>(); // materialId → 생성한 문제 수
let sequence = 0;

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export async function generateQuiz(materialId: string): Promise<QuizQuestion> {
  await wait(MOCK_DELAY_MS);

  const count = issuedCount.get(materialId) ?? 0;
  if (count >= MOCK_LIMIT_PER_MATERIAL) {
    issuedCount.set(materialId, 0);
    throw new QuizError("COOLDOWN", MOCK_COOLDOWN_SEC);
  }
  issuedCount.set(materialId, count + 1);

  const mock = MOCK_QUIZZES[sequence % MOCK_QUIZZES.length];
  sequence += 1;
  const id = `mock-quiz-${sequence}`;
  issued.set(id, mock);

  return { id, number: count + 1, type: mock.type, question: mock.question, options: mock.options };
}

const normalize = (text: string) => text.replace(/\s+/g, "").toLowerCase();

export async function gradeQuiz(questionId: string, answer: string): Promise<QuizGrade> {
  await wait(300);

  const mock = issued.get(questionId);
  if (!mock) throw new QuizError("GENERATE_FAILED");

  return {
    correct: normalize(answer) === normalize(mock.answer),
    correctAnswer: mock.answerText,
    correctOptionId: mock.type === "multiple" ? mock.answer : undefined,
    explanation: mock.explanation,
  };
}
