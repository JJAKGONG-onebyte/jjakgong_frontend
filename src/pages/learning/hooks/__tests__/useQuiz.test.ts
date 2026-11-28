import { act, renderHook } from "@testing-library/react";
import { useQuiz } from "../useQuiz";
import { QuizError, generateQuiz, gradeQuiz } from "../../../../services/quizService";
import type { QuizQuestion } from "../../../../types/learning";

jest.mock("../../../../services/quizService", () => {
  const actual = jest.requireActual("../../../../services/quizService");
  return { ...actual, generateQuiz: jest.fn(), gradeQuiz: jest.fn() };
});

const mockGenerate = generateQuiz as jest.MockedFunction<typeof generateQuiz>;
const mockGrade = gradeQuiz as jest.MockedFunction<typeof gradeQuiz>;

const question: QuizQuestion = { id: "q1", number: 1, type: "short", question: "실행 중인 프로그램은?" };
const lastKind = (items: { kind: string }[]) => items[items.length - 1]?.kind;

beforeEach(() => {
  mockGenerate.mockReset();
  mockGrade.mockReset();
});

test("자료가 없으면 문제를 만들 수 없다", async () => {
  const { result } = renderHook(() => useQuiz(null));
  expect(result.current.hasMaterial).toBe(false);
  expect(result.current.canGenerate).toBe(false);
  await act(() => result.current.generate());
  expect(mockGenerate).not.toHaveBeenCalled();
});

test("생성 중 → 풀이 중 → 채점 결과 순서로 진행된다", async () => {
  let resolve: (q: QuizQuestion) => void = () => {};
  mockGenerate.mockReturnValue(new Promise((r) => (resolve = r)));
  mockGrade.mockResolvedValue({ correct: false, correctAnswer: "프로세스", explanation: "해설" });
  const { result } = renderHook(() => useQuiz("m1"));

  let pending: Promise<void> = Promise.resolve();
  act(() => {
    pending = result.current.generate();
  });
  expect(lastKind(result.current.items)).toBe("generating");
  expect(result.current.canGenerate).toBe(false);

  await act(async () => {
    resolve(question);
    await pending;
  });
  expect(lastKind(result.current.items)).toBe("question");

  await act(() => result.current.submit("스레드"));
  const graded = result.current.items[0];
  expect(graded.kind).toBe("graded");
  if (graded.kind === "graded") {
    expect(graded.answer).toBe("스레드");
    expect(graded.grade.correct).toBe(false);
  }
  expect(result.current.canGenerate).toBe(true);
});

test("생성 실패 후 다시 시도하면 실패 카드가 생성 중 카드로 바뀐다", async () => {
  mockGenerate.mockRejectedValueOnce(new QuizError("GENERATE_FAILED"));
  const { result } = renderHook(() => useQuiz("m1"));

  await act(() => result.current.generate());
  expect(result.current.items).toHaveLength(1);
  expect(result.current.items[0]).toMatchObject({ kind: "error", reason: "generate_failed" });

  mockGenerate.mockResolvedValueOnce(question);
  await act(() => result.current.generate());
  expect(result.current.items).toHaveLength(1);
  expect(result.current.items[0].kind).toBe("question");
});

test("텍스트 추출 실패는 no_text 로 구분된다", async () => {
  mockGenerate.mockRejectedValueOnce(new QuizError("NO_TEXT"));
  const { result } = renderHook(() => useQuiz("m1"));
  await act(() => result.current.generate());
  expect(result.current.items[0]).toMatchObject({ kind: "error", reason: "no_text" });
});

test("재생성 제한에 걸리면 카운트다운 동안 문제를 만들 수 없다", async () => {
  jest.useFakeTimers();
  try {
    mockGenerate.mockRejectedValueOnce(new QuizError("COOLDOWN", 30));
    const { result } = renderHook(() => useQuiz("m1"));

    await act(() => result.current.generate());
    expect(result.current.items).toHaveLength(0);
    expect(result.current.cooldownSec).toBe(30);
    expect(result.current.canGenerate).toBe(false);

    act(() => jest.advanceTimersByTime(10_000));
    expect(result.current.cooldownSec).toBe(20);

    act(() => jest.advanceTimersByTime(20_000));
    expect(result.current.cooldownSec).toBe(0);
    expect(result.current.canGenerate).toBe(true);
  } finally {
    jest.useRealTimers();
  }
});

test("채점 요청이 실패하면 다시 제출할 수 있다", async () => {
  mockGenerate.mockResolvedValueOnce(question);
  mockGrade.mockRejectedValueOnce(new Error("network"));
  const { result } = renderHook(() => useQuiz("m1"));

  await act(() => result.current.generate());
  await act(() => result.current.submit("프로세스"));
  expect(result.current.items[0]).toMatchObject({ kind: "question", submitting: false, submitFailed: true });
});
