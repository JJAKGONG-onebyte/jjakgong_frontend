import { ReactNode, useState } from "react";
import type { QuizItem } from "../hooks/useQuiz";
import type { QuizGrade, QuizQuestion } from "../../../types/learning";

export type PanelSize = "sm" | "md"; // sm: 학습화면 B의 좁은 패널, md: 학습화면 A

// 크기별 글자/버튼 크기 (B 화면은 패널이 좁아 한 단계 작게)
export const PANEL_SIZE = {
  md: {
    text: "text-[14px]",
    small: "text-[12px]",
    strong: "text-[20px]",
    button: "h-10 text-[14px]",
    option: "min-h-[35px] px-[15px] text-[14px]",
    card: "p-[15px]",
    icon: "h-10 w-10 text-[24px] border-[3px]",
    gap: "gap-[10px]",
  },
  sm: {
    text: "text-[10px]",
    small: "text-[10px]",
    strong: "text-[14px]",
    button: "h-8 text-[10px]",
    option: "min-h-[28px] px-3 text-[10px]",
    card: "p-3",
    icon: "h-7 w-7 text-[16px] border-2",
    gap: "gap-2",
  },
} as const;

// 공통 버튼 모양
export const buttonStyles = {
  primary: "w-full shrink-0 rounded-full bg-primary-10 font-bold text-white disabled:opacity-50",
  outline: "w-full shrink-0 rounded-full border border-primary-10 bg-white text-neutral-10",
};

const optionStyles = {
  default: "border border-neutral-80 bg-primary-90",
  selected: "border border-primary-10 bg-white font-bold text-primary-10",
  correct: "border border-primary-10 bg-white font-bold text-primary-10",
  incorrect: "bg-ter-80 text-white",
};

function ResultLabel({ correct }: { correct: boolean }) {
  return (
    <span
      className={`ml-auto shrink-0 rounded-full px-2 text-[12px] ${
        correct ? "bg-primary-10 text-white" : "bg-white text-ter-80"
      }`}
    >
      {correct ? "정답" : "오답"}
    </span>
  );
}

function QuizCard({ question, size, children }: { question: QuizQuestion; size: PanelSize; children: ReactNode }) {
  const s = PANEL_SIZE[size];
  return (
    <div className={`shrink-0 rounded-[10px] bg-gradient-to-b from-gradient-1 to-white shadow-50 ${s.card}`}>
      <p className={`mb-3 font-bold ${s.text}`}>
        Q{question.number}. {question.question}
      </p>
      {children}
    </div>
  );
}

// 풀이 중: 객관식은 보기 선택, 단답형은 답 입력 후 제출
function QuestionCard({
  item,
  size,
  onSubmit,
}: {
  item: Extract<QuizItem, { kind: "question" }>;
  size: PanelSize;
  onSubmit: (answer: string) => void;
}) {
  const s = PANEL_SIZE[size];
  const [answer, setAnswer] = useState("");
  const { question, submitting, submitFailed } = item;
  const canSubmit = Boolean(answer.trim()) && !submitting;

  return (
    <QuizCard question={question} size={size}>
      <div className={`flex flex-col ${s.gap}`}>
        {question.type === "multiple" ? (
          question.options?.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={answer === option.id}
              disabled={submitting}
              onClick={() => setAnswer(option.id)}
              className={`flex items-center rounded-[10px] text-left ${s.option} ${
                answer === option.id ? optionStyles.selected : optionStyles.default
              }`}
            >
              {option.text}
            </button>
          ))
        ) : (
          <input
            type="text"
            value={answer}
            disabled={submitting}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              // 한글 조합 중 Enter는 무시 (마지막 글자 중복 전송 방지)
              if (e.key === "Enter" && !e.nativeEvent.isComposing && canSubmit) {
                e.preventDefault();
                onSubmit(answer.trim());
              }
            }}
            placeholder="답을 입력하세요."
            aria-label={`Q${question.number} 답 입력`}
            className={`rounded-[10px] border border-neutral-80 bg-white outline-none placeholder:text-neutral-60 focus:border-primary-10 ${s.option}`}
          />
        )}

        <button
          type="button"
          disabled={!canSubmit}
          onClick={() => onSubmit(answer.trim())}
          className={`mt-1 ${buttonStyles.primary} ${s.button}`}
        >
          {submitting ? "채점 중..." : "제출하기"}
        </button>

        {submitFailed && (
          <p role="alert" className={`text-ter-80 ${s.small}`}>
            채점에 실패했어요. 다시 제출해 주세요.
          </p>
        )}
      </div>
    </QuizCard>
  );
}

// 채점 결과: 정답/오답 색으로 구분하고 정답·해설을 보여준다
function GradedCard({
  question,
  answer,
  grade,
  size,
}: {
  question: QuizQuestion;
  answer: string;
  grade: QuizGrade;
  size: PanelSize;
}) {
  const s = PANEL_SIZE[size];

  return (
    <QuizCard question={question} size={size}>
      <div className={`flex flex-col ${s.gap}`}>
        {question.type === "multiple" ? (
          question.options?.map((option) => {
            const isCorrect = option.id === grade.correctOptionId;
            const isMine = option.id === answer;
            const style = isCorrect ? optionStyles.correct : isMine ? optionStyles.incorrect : optionStyles.default;
            return (
              <div key={option.id} className={`flex items-center gap-2 rounded-[10px] ${s.option} ${style}`}>
                {option.text}
                {(isCorrect || isMine) && <ResultLabel correct={isCorrect} />}
              </div>
            );
          })
        ) : (
          <div
            className={`flex items-center gap-2 rounded-[10px] ${s.option} ${
              grade.correct ? optionStyles.correct : optionStyles.incorrect
            }`}
          >
            <span className="min-w-0 break-words">{answer}</span>
            <ResultLabel correct={grade.correct} />
          </div>
        )}
      </div>

      <div className={`mt-3 ${s.small}`}>
        {!grade.correct && <p className="font-bold text-primary-10">정답 : {grade.correctAnswer}</p>}
        <p className="mt-1 text-neutral-60">해설 : {grade.explanation}</p>
      </div>
    </QuizCard>
  );
}

function ErrorIcon({ size }: { size: PanelSize }) {
  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border-ter-80 font-bold leading-none text-ter-80 ${PANEL_SIZE[size].icon}`}
    >
      !
    </span>
  );
}

type QuizItemViewProps = {
  item: QuizItem;
  size: PanelSize;
  isLast: boolean; // 다음 행동 버튼은 마지막 기록에만
  canGenerate: boolean;
  onGenerate: () => void;
  onSubmit: (answer: string) => void;
  onSelectMaterial: () => void;
};

// AI 문답 패널 안의 문제 풀이 기록 하나 (생성 중 / 풀이 중 / 채점 결과 / 실패)
function QuizItemView({ item, size, isLast, canGenerate, onGenerate, onSubmit, onSelectMaterial }: QuizItemViewProps) {
  const s = PANEL_SIZE[size];

  switch (item.kind) {
    case "generating":
      return (
        <div role="status" className="flex shrink-0 flex-col gap-2">
          <span
            aria-hidden
            className={`animate-spin rounded-full border-primary-10 border-t-transparent ${PANEL_SIZE[size].icon}`}
          />
          <p className={`font-bold text-primary-10 ${s.strong}`}>문제를 만드는 중이에요...</p>
          <p className={`text-neutral-60 ${s.text}`}>한 문제씩 순차적으로 만들어 드려요.</p>
        </div>
      );

    case "question":
      return <QuestionCard item={item} size={size} onSubmit={onSubmit} />;

    case "graded":
      return (
        <div className={`flex shrink-0 flex-col ${s.gap}`}>
          <GradedCard question={item.question} answer={item.answer} grade={item.grade} size={size} />
          {isLast && canGenerate && (
            <button type="button" onClick={onGenerate} className={`${buttonStyles.outline} ${s.button}`}>
              다음 문제 풀기
            </button>
          )}
        </div>
      );

    case "error":
      return (
        <div role="alert" className={`flex shrink-0 flex-col ${s.gap}`}>
          <ErrorIcon size={size} />
          <p className={`text-ter-80 ${s.text}`}>
            {item.reason === "no_text" ? (
              <>
                자료에서 텍스트를 읽지 못해
                <br />
                문제를 만들 수 없어요.
              </>
            ) : (
              <>
                문제를 만들지 못했어요.
                <br />
                잠시 후 다시 시도해 주세요.
              </>
            )}
          </p>
          {isLast &&
            (item.reason === "no_text" ? (
              <button type="button" onClick={onSelectMaterial} className={`${buttonStyles.outline} ${s.button}`}>
                다른 자료 선택하기
              </button>
            ) : (
              <button
                type="button"
                disabled={!canGenerate}
                onClick={onGenerate}
                className={`${buttonStyles.primary} ${s.button}`}
              >
                다시 시도하기
              </button>
            ))}
        </div>
      );
  }
}

export default QuizItemView;
