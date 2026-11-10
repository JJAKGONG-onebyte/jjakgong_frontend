
import React, { useState } from "react";
import WebcamView from "./components/WebcamView";
import { learningPageAMockData as mock } from "./data/learningMockData";
import PdfViewer from "./components/PdfViewer";
import type { LearningMode, LearningTab } from "./types/learning";

function LearningPageB() {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState<LearningMode>("material");
  const [activeTab, setActiveTab] = useState<LearningTab>("chat");

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F4F6FF] text-[#0D0D0D]">
      {/* 상단 헤더 */}
      <header className="relative z-30 flex min-h-[85px] flex-wrap items-center justify-between gap-3 bg-[#F8F9FA] px-4 py-3 shadow-[0_0_10px_#2B52FF] lg:h-[85px] lg:flex-nowrap lg:px-[30px] lg:py-0">
        {/* 로고 */}
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

        {/* 선택된 학습 자료 */}
        <div className="rounded-full bg-[#2B52FF] px-[15px] py-[3px] text-sm text-white lg:absolute lg:left-[137px] lg:text-[18px]">
          자료 : {mock.materialName}
        </div>

        {/* 사용자 정보 및 학습 설정 */}
        <div className="flex flex-wrap items-center justify-end gap-3 lg:gap-6">
          <span className="rounded-full bg-[#0AE1DA] px-[10px] py-[2px] text-[14px]">
            {mock.focusTracking ? "집중 트래킹 ON" : "집중 트래킹 OFF"}
          </span>

          <div className="text-right">
            <p className="text-[20px] font-bold lg:text-[24px]">
              {mock.elapsedTime}
            </p>
            <p className="text-[15px] text-[#797980] lg:text-[18px]">
              / {mock.totalTime}
            </p>
          </div>

          {/* 화면 모드 */}
          <div className="flex overflow-hidden rounded-full bg-[#F4F6FF]">
            <button
              type="button"
              onClick={() => setMode("video")}
              className={`rounded-full px-4 py-2 text-[14px] ${
                mode === "video"
                  ? "bg-[#2B52FF] text-white"
                  : "text-[#797980]"
              }`}
            >
              영상 통화
            </button>

            <button
              type="button"
              onClick={() => setMode("material")}
              className={`rounded-full px-4 py-2 text-[14px] ${
                mode === "material"
                  ? "bg-[#2B52FF] text-white"
                  : "text-[#797980]"
              }`}
            >
              자료 집중
            </button>
          </div>

          <img
            src="/assets/learning/notifications.svg"
            alt="알림"
            className="h-7 w-7"
          />

          <img
            src="/assets/learning/account-circle.svg"
            alt=""
            className="h-7 w-7"
          />

          <span className="whitespace-nowrap text-[16px] lg:text-[18px]">
            {mock.userName}
          </span>
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

            <div className="absolute left-2 top-8 rounded-[5px] border border-[#2B52FF] bg-white px-2 py-1 text-[10px] text-[#2B52FF]">
              잘하고 있어!
            </div>
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
                </>
              ) : (
                <div className="text-[11px] text-[#797980]">
                  {mock.materialPlaceholder}
                </div>
              )}
            </div>

            {/* 질문 입력 */}
            <div className="mt-3 flex h-[34px] shrink-0 items-center gap-2">
              <div className="flex h-full min-w-0 flex-1 items-center overflow-hidden rounded-[8px] border border-[#BEBEC8] bg-[#F8F9FA] px-2 text-[10px] text-[#797980]">
                {mock.chatPlaceholder}
              </div>

              <button
                type="button"
                className="h-full shrink-0 rounded-full bg-[#2B52FF] px-3 text-[10px] font-bold text-white"
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
          className="h-[50px] w-full rounded-full bg-[#F5383B] text-[16px] font-bold text-white sm:w-[199px] lg:h-[60px] lg:text-[18px]"
        >
          학습 종료하기
        </button>
      </footer>
    </div>
  );
}

export default LearningPageB;
