import { useCallback, useEffect, useRef, useState } from "react";
import { QuizError, generateQuiz, gradeQuiz } from "../../../services/quizService";
import type { QuizGrade, QuizQuestion } from "../../../types/learning";

// AI 문답 패널에 쌓이는 문제 풀이 기록 하나.
// at: 대화 메시지와 시간 순서대로 섞어서 보여주기 위한 값
export type QuizItem =
  | { id: string; at: number; kind: "generating" }
  | { id: string; at: number; kind: "question"; question: QuizQuestion; submitting: boolean; submitFailed: boolean }
  | { id: string; at: number; kind: "graded"; question: QuizQuestion; answer: string; grade: QuizGrade }
  | { id: string; at: number; kind: "error"; reason: "generate_failed" | "no_text" };

let itemSeq = 0;
const nextItemId = () => `quiz-item-${itemSeq++}`;

/**
 * AI 문제 풀이 상태 (Figma "13 AI 문제 풀이 상태 정의" 기준)
 *
 * - 자료 미선택: materialId 가 없으면 문제를 만들 수 없다
 * - 생성 중 → 풀이 중 → 채점 결과 → (다음 문제) 순서로 한 문제씩 진행
 * - 생성 실패: 다시 시도 / 텍스트 추출 실패: 다른 자료 선택
 * - 재생성 대기: 같은 자료로 너무 많이 만들면 cooldownSec 동안 막힌다
 */
export function useQuiz(materialId: string | null) {
  const [items, setItems] = useState<QuizItem[]>([]);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // 재생성 대기 카운트다운
  useEffect(() => {
    if (cooldownUntil === null) return;
    setNow(Date.now());
    const timer = window.setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= cooldownUntil) setCooldownUntil(null);
    }, 1_000);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  const cooldownSec = cooldownUntil === null ? 0 : Math.max(0, Math.ceil((cooldownUntil - now) / 1_000));

  const last = items[items.length - 1];
  const busy = last?.kind === "generating" || last?.kind === "question";
  const canGenerate = Boolean(materialId) && !busy && cooldownSec === 0;

  // id 에 해당하는 기록을 next 로 교체 (null 이면 삭제)
  const replaceItem = useCallback(
    (id: string, next: QuizItem | null) =>
      setItems((prev) => prev.flatMap((item) => (item.id === id ? (next ? [next] : []) : [item]))),
    [],
  );

  const generate = useCallback(async () => {
    if (!materialId || !canGenerate) return;

    const id = nextItemId();
    const at = Date.now();
    // "다시 시도하기"면 실패 카드를 생성 중 카드로 바꾼다
    setItems((prev) => {
      const tail = prev[prev.length - 1];
      const base = tail?.kind === "error" && tail.reason === "generate_failed" ? prev.slice(0, -1) : prev;
      return [...base, { id, at, kind: "generating" }];
    });

    try {
      const question = await generateQuiz(materialId);
      if (!mountedRef.current) return;
      replaceItem(id, { id, at, kind: "question", question, submitting: false, submitFailed: false });
    } catch (error) {
      if (!mountedRef.current) return;
      if (error instanceof QuizError && error.code === "COOLDOWN") {
        replaceItem(id, null);
        setCooldownUntil(Date.now() + error.retryAfterSec * 1_000);
        return;
      }
      const reason = error instanceof QuizError && error.code === "NO_TEXT" ? "no_text" : "generate_failed";
      replaceItem(id, { id, at, kind: "error", reason });
    }
  }, [materialId, canGenerate, replaceItem]);

  const submit = useCallback(
    async (answer: string) => {
      if (last?.kind !== "question" || last.submitting || !answer.trim()) return;
      const target = last;

      replaceItem(target.id, { ...target, submitting: true, submitFailed: false });
      try {
        const grade = await gradeQuiz(target.question.id, answer);
        if (!mountedRef.current) return;
        replaceItem(target.id, {
          id: target.id,
          at: target.at,
          kind: "graded",
          question: target.question,
          answer,
          grade,
        });
      } catch {
        if (!mountedRef.current) return;
        replaceItem(target.id, { ...target, submitting: false, submitFailed: true });
      }
    },
    [last, replaceItem],
  );

  return { items, hasMaterial: Boolean(materialId), canGenerate, cooldownSec, generate, submit };
}
