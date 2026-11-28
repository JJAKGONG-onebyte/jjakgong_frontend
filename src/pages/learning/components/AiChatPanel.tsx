import React, { useEffect, useMemo, useRef, useState } from "react";
import QuizItemView, { PANEL_SIZE, PanelSize, buttonStyles } from "./QuizItemView";
import { useQuiz, QuizItem } from "../hooks/useQuiz";
import { learningPageAMockData as mock } from "../data/learningMockData";

// 크기별 패널 레이아웃 (글자/버튼 크기는 QuizItemView 의 PANEL_SIZE 와 공유)
const LAYOUT = {
  md: {
    padding: "px-5 pb-7 pt-5 lg:px-9 lg:pt-7",
    title: "h-10 px-6 text-[14px] lg:text-[18px]",
    section: "gap-5",
    bubble: "rounded-[5px] px-[15px] py-[7px] text-[14px] leading-[21px]",
    input: "h-[44px] rounded-[10px] px-[15px] text-[14px]",
    send: "w-[65px] text-[14px]",
  },
  sm: {
    padding: "p-3",
    title: "h-8 px-4 text-[11px]",
    section: "gap-3",
    bubble: "rounded-[5px] px-3 py-2 text-[10px] leading-[1.6]",
    input: "h-[34px] rounded-[8px] px-2 text-[10px]",
    send: "px-3 text-[10px]",
  },
};

type TimelineEntry =
  | { key: string; at: number; kind: "user"; text: string }
  | { key: string; at: number; kind: "ai"; lines: string[] }
  | { key: string; at: number; kind: "quiz"; item: QuizItem };

const formatCooldown = (sec: number) =>
  `${String(Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

type AiChatPanelProps = {
  materialId: string | null; // 없으면 문제를 만들 수 없다
  onSelectMaterial: () => void; // "자료 선택하기" / "다른 자료 선택하기"
  size?: PanelSize;
  className?: string; // 패널 바깥 크기/모양 (화면마다 다름)
};

// 학습 화면 오른쪽 AI 문답 패널: 질문/답변과 AI 문제 풀이를 한 흐름으로 보여준다
function AiChatPanel({ materialId, onSelectMaterial, size = "md", className = "" }: AiChatPanelProps) {
  const layout = LAYOUT[size];
  const s = PANEL_SIZE[size];
  const quiz = useQuiz(materialId);
  const [chatInput, setChatInput] = useState("");
  // 백엔드 연동 전까지는 보낸 질문을 화면에만 쌓아둔다
  const [sentQuestions, setSentQuestions] = useState<Array<{ at: number; text: string }>>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 대화와 문제 풀이 기록을 시간 순서대로 합친다
  const timeline = useMemo<TimelineEntry[]>(() => {
    const entries: TimelineEntry[] = [
      { key: "mock-question", at: 0, kind: "user", text: mock.chat.question },
      { key: "mock-answer", at: 0, kind: "ai", lines: mock.chat.answer },
      ...sentQuestions.map((q, i): TimelineEntry => ({ key: `sent-${i}`, at: q.at, kind: "user", text: q.text })),
      ...quiz.items.map((item): TimelineEntry => ({ key: item.id, at: item.at, kind: "quiz", item })),
    ];
    return entries.sort((a, b) => a.at - b.at);
  }, [sentQuestions, quiz.items]);

  useEffect(() => {
    // 첫 화면에서는 스크롤하지 않고, 새 질문/문제가 생겼을 때만 맨 아래로
    if (sentQuestions.length === 0 && quiz.items.length === 0) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [sentQuestions, quiz.items]);

  const handleSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setSentQuestions((prev) => [...prev, { at: Date.now(), text }]);
    setChatInput("");
  };

  // 상단 "문제 만들기"는 시작 전, 자료 미선택, 재생성 대기일 때만 보인다.
  // 풀이가 시작되면 흐름 안의 "다음 문제 풀기" / "다시 시도하기" 로 이어진다.
  const showLauncher = !quiz.hasMaterial || quiz.cooldownSec > 0 || quiz.items.length === 0;
  const lastQuizId = quiz.items[quiz.items.length - 1]?.id;

  return (
    <section className={`flex flex-col ${layout.padding} ${className}`}>
      <h2 className={`flex w-fit shrink-0 items-center rounded-full bg-primary-10 font-bold text-white ${layout.title}`}>
        AI 문답
      </h2>

      {showLauncher && (
        <div className={`mt-4 flex shrink-0 flex-col ${s.gap}`}>
          <button
            type="button"
            disabled={!quiz.canGenerate}
            onClick={quiz.generate}
            className={`w-full rounded-full ${s.button} ${
              quiz.canGenerate ? "border border-primary-10 bg-primary-90 text-primary-10" : "bg-neutral-70 text-white"
            }`}
          >
            문제 만들기{quiz.cooldownSec > 0 && ` (${formatCooldown(quiz.cooldownSec)})`}
          </button>

          {!quiz.hasMaterial && (
            <>
              <p className={`text-primary-10 ${s.text}`}>학습 자료를 선택해야 문제를 만들 수 있어요.</p>
              <button type="button" onClick={onSelectMaterial} className={`${buttonStyles.outline} ${s.button}`}>
                자료 선택하기
              </button>
            </>
          )}

          {quiz.hasMaterial && quiz.cooldownSec > 0 && (
            <p className={`text-primary-10 ${s.text}`}>같은 자료는 잠시 후 문제를 다시 만들 수 있어요.</p>
          )}
        </div>
      )}

      {/* 대화 + 문제 풀이 기록 */}
      <div className={`mt-4 flex min-h-0 flex-1 flex-col overflow-y-auto p-[5px] ${layout.section}`}>
        {timeline.map((entry) => {
          switch (entry.kind) {
            case "user":
              return (
                <div
                  key={entry.key}
                  className={`max-w-[85%] shrink-0 self-end whitespace-pre-wrap break-words bg-primary-10 text-white ${layout.bubble}`}
                >
                  {entry.text}
                </div>
              );
            case "ai":
              return (
                <div key={entry.key} className={`max-w-[90%] shrink-0 self-start bg-neutral-90 ${layout.bubble}`}>
                  {entry.lines.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index !== entry.lines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              );
            case "quiz":
              return (
                <QuizItemView
                  key={entry.key}
                  item={entry.item}
                  size={size}
                  isLast={entry.item.id === lastQuizId}
                  canGenerate={quiz.canGenerate}
                  onGenerate={quiz.generate}
                  onSubmit={quiz.submit}
                  onSelectMaterial={onSelectMaterial}
                />
              );
          }
          return null;
        })}
        <div ref={chatEndRef} />
      </div>

      {/* 질문 입력 */}
      <div className="mt-3 flex shrink-0 items-center gap-2">
        <input
          type="text"
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => {
            // 한글 조합 중 Enter는 무시 (마지막 글자 중복 전송 방지)
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={mock.chatPlaceholder}
          aria-label="AI에게 질문하기"
          className={`min-w-0 flex-1 border border-neutral-80 bg-neutral-100 text-neutral-10 outline-none placeholder:text-neutral-60 focus:border-primary-10 ${layout.input}`}
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!chatInput.trim()}
          className={`self-stretch shrink-0 rounded-full bg-primary-10 font-bold text-white disabled:opacity-50 ${layout.send}`}
        >
          전송
        </button>
      </div>
    </section>
  );
}

export default AiChatPanel;
