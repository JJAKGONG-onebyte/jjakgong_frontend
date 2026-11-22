
import React, { useEffect, useRef, useState } from "react";
import WebcamView from "./components/WebcamView";
import EndLearningModal from "./components/EndLearningModal";
import CharacterBubble from "./components/CharacterBubble";
import { useCharacterReaction } from "./hooks/useCharacterReaction";
import { learningPageAMockData as mock } from "./data/learningMockData";
import type { LearningMode, LearningTab } from "../../types/learning";

function LearningPageA() {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState<LearningMode>("video");
  const [activeTab, setActiveTab] = useState<LearningTab>("chat");
  const [showEndModal, setShowEndModal] = useState(false);
  // 캐릭터 반응 (B 화면과 같은 데이터)
  // - 졸음 반응: 졸음 감지 알림창으로 (같은 문구가 두 번 보이지 않도록 말풍선에는 표시 안 함)
  // - 그 외 반응: 캐릭터 말풍선으로
  // 30초 뒤 자동으로 닫히는 시간은 useCharacterReaction 의 REACTION_DISPLAY_MS.drowsy
  const { reaction, dismiss: dismissReaction } = useCharacterReaction(cameraEnabled);
  const drowsyReaction = reaction?.type === "drowsy" ? reaction : null;
  const bubbleReaction = reaction?.type === "drowsy" ? null : reaction;
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#F4F6FF] text-[#0D0D0D]">
      
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
      </div>
      {/* 학습 시간: 헤더 전체의 정중앙 */}
      <div className="w-full text-center lg:absolute lg:left-1/2 lg:top-1/2 lg:w-auto lg:-translate-x-1/2 lg:-translate-y-1/2">
        <p className="whitespace-nowrap text-[20px] font-bold lg:text-[24px]">
          {mock.elapsedTime}
          <span className="ml-1 text-[15px] font-normal text-[#797980] lg:text-[18px]">
            / {mock.totalTime}
          </span>
        </p>
      </div>

      {/* 오른쪽: 학습 정보 */}
      <div className="relative flex w-full min-w-0 items-center justify-between gap-3 lg:ml-auto lg:flex-1">

        {/* 집중 트래킹 */}
        <span className="shrink-0 whitespace-nowrap rounded-full bg-[#0AE1DA] px-[10px] py-[2px] text-[14px]">
          {mock.focusTracking ? "집중 트래킹 ON" : "집중 트래킹 OFF"}
        </span>

        {/* 오른쪽: 모드 버튼 + 프로필 */}
        <div className="ml-auto flex shrink-0 items-center gap-3 lg:gap-5">

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
      </div>

    </header>


      {/* 메인 영역 */}
      <main
        className="
          relative grid grid-cols-1 gap-5 px-4 py-5
          min-[1280px]:h-[calc(100vh-173px)]
          min-[1280px]:min-h-[700px]
          min-[1280px]:grid-cols-[minmax(220px,1.27fr)_minmax(400px,2.1fr)_minmax(260px,1fr)]
          min-[1280px]:items-center
          min-[1280px]:gap-4
          min-[1280px]:px-[3.65%]
          min-[1280px]:py-4
        "
      >
        {/* 캐릭터 영역 */}
        <section
          className="
            relative order-2 mx-auto
            h-[420px] w-full max-w-[520px]
            overflow-hidden rounded-[15px]
            bg-gradient-to-b from-[#2B52FF] to-[#FFC3EA]
            p-[10px] shadow-[0_0_10px_#2B52FF80]
            min-[1280px]:order-1
            min-[1280px]:h-[73%]
            min-[1280px]:min-h-[500px]
            min-[1280px]:max-w-none
          "
        >
          <img
            src="/assets/learning/character-image.png"
            alt="짝공 캐릭터"
            className="h-full w-full rounded-[10px] object-cover"
          />

          <span className="absolute left-[46px] top-[38px] rounded-full bg-[#2B52FF] px-[10px] py-[2px] text-[14px] text-white">
            {mock.characterName}
          </span>

          <CharacterBubble
            reaction={bubbleReaction}
            size="md"
            className="absolute left-[46px] right-[46px] top-[73px]"
          />

        </section>

        {/* 사용자 웹캠 */}
        <section
          className="
            relative order-1 mx-auto
            h-[65vh] min-h-[350px] max-h-[750px] w-full
            overflow-hidden rounded-[15px]
            bg-[#F4F6FF] shadow-[0_0_10px_#2B52FF80]
            min-[1280px]:order-2
            min-[1280px]:h-[92%]
            min-[1280px]:min-h-0
            min-[1280px]:max-h-none
          "
        >
          <div className="absolute left-9 top-7 z-10 rounded-full bg-[#F4F6FF] px-[10px] py-[2px] text-[14px]">
            나
          </div>

          <div className="h-full w-full p-2">
            <WebcamView
              enabled={cameraEnabled}
              className="h-full w-full"
            />
          </div>
        </section>

        {/* AI 문답 패널 */}
        <section
          className="
            relative order-3 mx-auto
            h-[600px] w-full max-w-[520px]
            overflow-hidden rounded-[15px]
            bg-gradient-to-b from-white to-[#EAEEFF]
            shadow-[0_0_10px_#2B52FF80]
            min-[1280px]:h-[86%]
            min-[1280px]:min-h-0
            min-[1280px]:max-w-none
          "
        >
          {/* AI 문답 / 학습 자료 탭 */}
          <div className="absolute left-5 top-5 flex h-10 w-[187px] overflow-hidden rounded-full border border-[#797980] bg-[#F4F6FF] lg:left-9 lg:top-7">
            <button
              type="button"
              onClick={() => setActiveTab("chat")}
              className={`flex-1 text-[14px] lg:text-[18px] ${
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
              className={`flex-1 text-[14px] lg:text-[18px] ${
                activeTab === "material"
                  ? "bg-[#2B52FF] font-bold text-white"
                  : "text-[#797980]"
              }`}
            >
              학습 자료
            </button>
          </div>

          {activeTab === "chat" ? (
            // 대화 내용: 질문이 쌓이면 스크롤되도록 flex 컬럼으로 구성
            <div className="absolute bottom-[84px] left-5 right-5 top-[85px] flex flex-col gap-5 overflow-y-auto p-[5px] lg:left-9 lg:right-9 lg:top-[98px]">
              {/* 사용자 질문 */}
              <div className="max-w-[85%] self-end rounded-[5px] bg-[#2B52FF] px-[15px] py-[7px] text-[14px] text-white">
                {mock.chat.question}
              </div>

              {/* AI 답변 */}
              <div className="max-w-[90%] self-start rounded-[5px] bg-[#DDDDE6] px-[15px] py-[7px] text-[14px] leading-[21px]">
                {mock.chat.answer.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== mock.chat.answer.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>

              {/* 문제 만들기 */}
              <div className="flex h-10 shrink-0 items-center justify-center rounded-full border border-[#2B52FF] bg-[#F4F6FF] text-[14px] text-[#2B52FF]">
                문제 만들기
              </div>

              {/* 퀴즈 카드 */}
              <div className="shrink-0 rounded-[10px] bg-gradient-to-b from-[#95A8FF] to-white p-[15px] shadow-[0_0_10px_#2B52FF80]">
                <p className="mb-3 text-[14px] font-bold">
                  {mock.quiz.title}
                </p>

                {mock.quiz.options.map((item) => (
                  <div
                    key={item.id}
                    className={`mb-[10px] flex h-[35px] items-center rounded-[10px] px-[15px] text-[14px] ${
                      item.status === "incorrect"
                        ? "bg-[#F5383B] text-white"
                        : item.status === "correct"
                          ? "border border-[#2B52FF] bg-[#0AE1DA] text-[#2B52FF]"
                          : "border border-[#BEBEC8] bg-[#F4F6FF]"
                    }`}
                  >
                    {item.text}

                    {item.label && (
                      <span
                        className={`ml-auto rounded-full px-2 text-[12px] ${
                          item.status === "incorrect"
                            ? "bg-white text-[#F5383B]"
                            : "bg-[#2B52FF] text-white"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}

                <p className="mt-3 text-[12px] text-[#797980]">
                  {mock.quiz.explanation}
                </p>
              </div>

              {/* 새로 보낸 질문 (답변은 백엔드 연동 후) */}
              {sentQuestions.map((question, index) => (
                <div
                  key={index}
                  className="max-w-[85%] self-end whitespace-pre-wrap break-words rounded-[5px] bg-[#2B52FF] px-[15px] py-[7px] text-[14px] text-white"
                >
                  {question}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          ) : (
            <div className="absolute left-5 right-5 top-[100px] text-[14px] text-[#797980] lg:left-9 lg:right-9">
              {mock.materialPlaceholder}
            </div>
          )}

          {/* 질문 입력 */}
          <div className="absolute bottom-[28px] left-5 right-5 flex h-[44px] items-center gap-2 lg:left-9 lg:right-9">
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
              className="h-full min-w-0 flex-1 rounded-[10px] border border-[#BEBEC8] bg-[#F8F9FA] px-[15px] text-[14px] text-[#0D0D0D] outline-none placeholder:text-[#797980] focus:border-[#2B52FF]"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!chatInput.trim()}
              className="h-full w-[65px] shrink-0 rounded-full bg-[#2B52FF] text-[14px] font-bold text-white disabled:opacity-50"
            >
              전송
            </button>
          </div>

        </section>

        {/* 졸음 감지 알림
            - 1280px 미만: 스크롤 위치와 상관없이 보이도록 화면 하단 중앙에 고정(토스트)
            - 1280px 이상: 왼쪽 아래, 가로는 캐릭터 카드(첫 번째 열) 중앙
              첫 번째 열 중앙 = 좌우 여백 3.65% + 열 영역 × (1.27 / 4.37 / 2) */}
        {drowsyReaction && (
          <div
            key={drowsyReaction.id}
            role="alert"
            className="
              fixed bottom-4 left-1/2 z-40
              w-[calc(100%-32px)] max-w-[380px] -translate-x-1/2
              rounded-[15px] bg-[#F4F6FF] px-5 pb-3 pt-4
              shadow-[0_0_10px_#2B52FF]
              motion-safe:animate-toast-in
              min-[1280px]:absolute
              min-[1280px]:bottom-3
              min-[1280px]:left-[calc(3.65%_+_(100%_-_7.3%_-_32px)_*_0.1453)]
              min-[1280px]:z-20
            "
          >
            <div className="flex items-center gap-[7px]">
              <img
                src="/assets/learning/notifications-active.svg"
                alt=""
                className="h-6 w-6"
              />
              <h2 className="bg-gradient-to-b from-[#2B52FF] to-[#FFC3EA] bg-clip-text text-[20px] font-bold text-transparent">
                {mock.drowsinessAlert.title}
              </h2>

              <button
                type="button"
                onClick={dismissReaction}
                aria-label="알림 닫기"
                className="ml-auto h-6 w-6 shrink-0"
              >
                <img
                  src="/assets/learning/cancel.svg"
                  alt=""
                  className="h-6 w-6"
                />
              </button>
            </div>

            <div className="mt-[10px] flex items-center gap-3">
              <img
                src="/assets/learning/character-head.png"
                alt=""
                className="h-10 w-10 shrink-0"
              />

              <p className="rounded-[5px] border border-[#2B52FF] bg-gradient-to-b from-white to-[#EAEEFF] px-3 py-[7px] text-[14px] font-bold text-[#2B52FF]">
                {drowsyReaction.message}
              </p>
            </div>
          </div>
        )}
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
        // TODO: 학습 기록 저장 API 호출
        onEnd={() => (window.location.href = "/home")}
      />
    </div>
  );
}

export default LearningPageA;

