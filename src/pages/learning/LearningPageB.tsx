
import React, { useEffect, useRef, useState } from "react";
import WebcamView from "./components/WebcamView";
import EndLearningModal from "./components/EndLearningModal";
import CharacterBubble from "./components/CharacterBubble";
import { useCharacterReaction } from "./hooks/useCharacterReaction";
import { learningPageAMockData as mock } from "./data/learningMockData";
import PdfViewer from "./components/PdfViewer";
import type { LearningMode, LearningTab } from "../../types/learning";

function LearningPageB() {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState<LearningMode>("material");
  const [activeTab, setActiveTab] = useState<LearningTab>("chat");
  const [showEndModal, setShowEndModal] = useState(false);
  // 캐릭터 반응 메시지 (집중 트래킹이 켜져 있을 때만 수신)
  const { reaction } = useCharacterReaction(cameraEnabled);
  const [chatInput, setChatInput] = useState("");
  // 백엔드 연동 전까지는 보낸 질문을 화면에만 쌓아둔다
  const [sentQuestions, setSentQuestions] = useState<string[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 첫 화면에서는 스크롤하지 않고, 질문을 보냈을 때만 맨 아래로
    if (sentQuestions.length === 0) return;
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [sentQuestions]);

  const handleSend = () => {
    const text = chatInput.trim();
    if (!text) return;
    setSentQuestions((prev) => [...prev, text]);
    setChatInput("");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F6FF] text-[#0D0D0D]">
      {/* 상단 헤더 */}
      <header className="relative z-30 flex min-h-[85px] flex-wrap items-center gap-4 bg-[#F8F9FA] px-4 py-3 shadow-[0_0_10px_#2B52FF] lg:h-[85px] lg:flex-nowrap lg:px-[30px] lg:py-0">

        {/* 왼쪽: 로고 + 학습 자료 */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex shrink-0 items-center gap-2">
            <img
              src="/assets/learning/character-head.png"
              alt=""
              className="h-[29px] w-[28px]"
            />
            <img
              src="/assets/learning/jjakgong-logo.png"
              alt="짝공"
              className="h-[29px] w-[54px]"
            />
          </div>

          <div className="whitespace-nowrap rounded-full bg-[#2B52FF] px-[15px] py-[3px] text-sm text-white lg:text-[18px]">
            자료 : {mock.materialName}
          </div>
          {/* 집중 트래킹 */}
          <span className="shrink-0 whitespace-nowrap rounded-full bg-[#0AE1DA] px-[10px] py-[2px] text-[14px]">
            {mock.focusTracking ? "집중 트래킹 ON" : "집중 트래킹 OFF"}
          </span>
        </div>

        {/* 학습 시간: 헤더 전체 정중앙 */}
        <div className="w-full text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:w-auto lg:-translate-x-1/2 lg:-translate-y-1/2">
          <p className="whitespace-nowrap text-[20px] font-bold lg:text-[24px]">
            {mock.elapsedTime}
            <span className="ml-1 text-[15px] font-normal text-[#797980] lg:text-[18px]">
              / {mock.totalTime}
            </span>
          </p>
        </div>

        {/* 오른쪽: 모드 + 프로필 */}
        <div className="ml-auto flex min-w-0 flex-wrap items-center justify-end gap-3 lg:flex-nowrap lg:gap-5">

          {/* 화면 모드 */}
          <div className="flex shrink-0 overflow-hidden rounded-full bg-[#F4F6FF]">
            {/* 영상 통화 */}
            <button
              type="button"
              onClick={() => (window.location.href = "/studyA")}
              className={`rounded-full px-4 py-2 text-[14px] ${
                mode === "video"
                  ? "bg-[#2B52FF] text-white"
                  : "text-[#797980]"
              }`}
            >
              영상 통화
            </button>

            {/* 자료 집중 */}
            <button
              type="button"
              onClick={() => (window.location.href = "/studyB")}
              className={`rounded-full px-4 py-2 text-[14px] ${
                mode === "material"
                  ? "bg-[#2B52FF] text-white"
                  : "text-[#797980]"
              }`}
            >
              자료 집중
            </button>
          </div>

          {/* 프로필 */}
          <div className="flex shrink-0 items-center gap-2 text-small font-normal text-neutral-10">
            <img
              src="/assets/learning/account-circle.svg"
              alt=""
              className="h-5 w-5"
            />
            <span className="whitespace-nowrap">{mock.userName}</span>
          </div>

        </div>
      </header>


      {/* 메인 영역 */}
      <main className="grid grid-cols-1 gap-4 px-4 py-4 lg:min-h-[calc(100vh-173px)] lg:grid-cols-[minmax(0,3.35fr)_minmax(260px,1fr)] lg:gap-4 lg:px-[1.5%] lg:py-4">
        {/* PDF 학습 자료 영역 */}
        <PdfViewer fileName={mock.materialName} />

        {/* 오른쪽 사이드 영역 */}
        <aside className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-col">
          {/* 캐릭터 */}
          <section className="relative h-[150px] overflow-hidden rounded-[12px] border-[4px] border-[#DCE4FF] bg-gradient-to-b from-[#2B52FF] to-[#FFC3EA] shadow-[0_0_8px_#2B52FF60] lg:h-[120px] lg:shrink-0">
            <img
              src="/assets/learning/character-image.png"
              alt="짝공 캐릭터"
              className="h-full w-full object-cover"
            />

            <span className="absolute left-2 top-2 rounded-full bg-[#2B52FF] px-2 py-1 text-[10px] text-white">
              {mock.characterName}
            </span>

            <CharacterBubble
              reaction={reaction}
              className="absolute left-2 right-2 top-8"
            />
          </section>

          {/* 사용자 웹캠 */}
          <section className="relative h-[150px] overflow-hidden rounded-[12px] border-[4px] border-[#DCE4FF] bg-white shadow-[0_0_8px_#2B52FF60] lg:h-[120px] lg:shrink-0">
            <div className="absolute left-2 top-2 z-10 rounded-full bg-[#F4F6FF] px-2 py-1 text-[10px]">
              나
            </div>

            <WebcamView
              enabled={cameraEnabled}
              className="h-full w-full"
            />
          </section>

          {/* AI 문답 패널 */}
          <section className="relative flex h-[390px] min-w-0 flex-col overflow-hidden rounded-[12px] border-[2px] border-[#DCE4FF] bg-gradient-to-b from-white to-[#EAEEFF] p-3 shadow-[0_0_8px_#2B52FF60] sm:col-span-2 lg:h-auto lg:min-h-[280px] lg:flex-1">
            {/* 탭 */}
            <div className="flex h-8 w-fit shrink-0 overflow-hidden rounded-full border border-[#797980] bg-[#F4F6FF]">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`px-3 text-[11px] ${
                  activeTab === "chat"
                    ? "bg-[#2B52FF] font-bold text-white"
                    : "text-[#797980]"
                }`}
              >
                AI 문답
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("material")}
                className={`px-3 text-[11px] ${
                  activeTab === "material"
                    ? "bg-[#2B52FF] font-bold text-white"
                    : "text-[#797980]"
                }`}
              >
                학습 자료
              </button>
            </div>

            {/* 대화 내용 */}
            <div className="mt-4 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto">
              {activeTab === "chat" ? (
                <>
                  <div className="flex justify-end">
                    <div className="max-w-[90%] rounded-[5px] bg-[#2B52FF] px-3 py-2 text-[10px] text-white">
                      {mock.chat.question}
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-[95%] rounded-[5px] bg-[#DDDDE6] px-3 py-2 text-[10px] leading-[1.6]">
                      {mock.chat.answer.map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          {index !== mock.chat.answer.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="h-8 shrink-0 rounded-full border border-[#2B52FF] text-[10px] text-[#2B52FF]"
                  >
                    문제 만들기
                  </button>

                  {/* 새로 보낸 질문 (답변은 백엔드 연동 후) */}
                  {sentQuestions.map((question, index) => (
                    <div key={index} className="flex justify-end">
                      <div className="max-w-[90%] whitespace-pre-wrap break-words rounded-[5px] bg-[#2B52FF] px-3 py-2 text-[10px] text-white">
                        {question}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </>
              ) : (
                <div className="text-[11px] text-[#797980]">
                  {mock.materialPlaceholder}
                </div>
              )}
            </div>

            {/* 질문 입력 */}
            <div className="mt-3 flex h-[34px] shrink-0 items-center gap-2">
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
                className="h-full min-w-0 flex-1 rounded-[8px] border border-[#BEBEC8] bg-[#F8F9FA] px-2 text-[10px] text-[#0D0D0D] outline-none placeholder:text-[#797980] focus:border-[#2B52FF]"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={!chatInput.trim()}
                className="h-full shrink-0 rounded-full bg-[#2B52FF] px-3 text-[10px] font-bold text-white disabled:opacity-50"
              >
                전송
              </button>
            </div>
          </section>
        </aside>
      </main>

      {/* 하단 컨트롤 */}
      <footer className="flex flex-wrap items-center justify-center gap-3 bg-[#F4F6FF] px-4 py-4 lg:h-[88px] lg:flex-nowrap lg:gap-[18px] lg:py-0">
        <button
          type="button"
          onClick={() => setCameraEnabled((prev) => !prev)}
          className="h-[50px] w-full rounded-full border border-[#797980] bg-[#F8F9FA] text-[16px] sm:w-[199px] lg:h-[60px] lg:text-[18px]"
        >
          카메라(집중 트래킹) {cameraEnabled ? "ON" : "OFF"}
        </button>

        <button
          type="button"
          className="h-[50px] w-full rounded-full border border-[#797980] bg-[#F8F9FA] text-[16px] sm:w-[199px] lg:h-[60px] lg:text-[18px]"
        >
          학습 자료 보기
        </button>

        <button
          type="button"
          className="h-[50px] w-full rounded-full border border-[#797980] bg-[#F8F9FA] text-[16px] sm:w-[199px] lg:h-[60px] lg:text-[18px]"
        >
          휴식하기
        </button>

        <button
          type="button"
          onClick={() => setShowEndModal(true)}
          className="h-[50px] w-full rounded-full bg-[#F5383B] text-[16px] font-bold text-white sm:w-[199px] lg:h-[60px] lg:text-[18px]"
        >
          학습 종료하기
        </button>
      </footer>

      {/* 학습 종료 팝업 */}
      <EndLearningModal
        open={showEndModal}
        summary={mock.endSummary}
        onContinue={() => setShowEndModal(false)}
        // TODO: 홈 페이지가 생기면 홈으로 이동 + 학습 기록 저장 API 호출
        onEnd={() => (window.location.href = "/settings")}
      />
    </div>
  );
}

export default LearningPageB;
