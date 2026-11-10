
import React, { useState } from "react";
import WebcamView from "./components/WebcamView";
import { learningPageAMockData as mock } from "./data/learningMockData";
import type { LearningMode, LearningTab } from "./types/learning";

function LearningPageA() {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState<LearningMode>("video");
  const [activeTab, setActiveTab] = useState<LearningTab>("chat");

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F4F6FF] text-[#0D0D0D]">
      {/* 상단 헤더 */}
      <header className="relative z-30 flex min-h-[85px] flex-wrap items-center justify-between gap-3 bg-[#F8F9FA] px-4 py-3 shadow-[0_0_10px_#2B52FF] lg:h-[85px] lg:flex-nowrap lg:px-[30px] lg:py-0">
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

        <div className="rounded-full bg-[#2B52FF] px-[15px] py-[3px] text-sm text-white lg:absolute lg:left-[137px] lg:text-[18px]">
          자료 : {mock.materialName}
        </div>

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
            <>
              {/* 사용자 질문 */}
              <div className="absolute right-5 top-[85px] max-w-[85%] rounded-[5px] bg-[#2B52FF] px-[15px] py-[7px] text-[14px] text-white lg:right-9 lg:top-[98px]">
                {mock.chat.question}
              </div>

              {/* AI 답변 */}
              <div className="absolute left-5 top-[145px] max-w-[90%] rounded-[5px] bg-[#DDDDE6] px-[15px] py-[7px] text-[14px] leading-[21px] lg:left-9 lg:top-[153px]">
                {mock.chat.answer.map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index !== mock.chat.answer.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>

              {/* 문제 만들기 */}
              <div className="absolute left-5 right-5 top-[245px] flex h-10 items-center justify-center rounded-full border border-[#2B52FF] bg-[#F4F6FF] text-[14px] text-[#2B52FF] lg:left-9 lg:right-9 lg:top-[260px]">
                문제 만들기
              </div>

              {/* 퀴즈 카드 */}
              <div className="absolute left-5 right-5 top-[305px] rounded-[10px] bg-gradient-to-b from-[#95A8FF] to-white p-[15px] shadow-[0_0_10px_#2B52FF80] lg:left-9 lg:right-9 lg:top-[320px]">
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
            </>
          ) : (
            <div className="absolute left-5 right-5 top-[100px] text-[14px] text-[#797980] lg:left-9 lg:right-9">
              {mock.materialPlaceholder}
            </div>
          )}

          {/* 질문 입력 */}
          <div className="absolute bottom-[28px] left-5 right-[85px] flex h-[35px] items-center rounded-[10px] border border-[#BEBEC8] bg-[#F8F9FA] px-[15px] text-[14px] text-[#797980] lg:left-9 lg:right-[101px]">
            {mock.chatPlaceholder}
          </div>

          <button
            type="button"
            className="absolute bottom-[28px] right-5 h-[35px] w-[55px] rounded-full bg-[#2B52FF] text-[14px] font-bold text-white lg:right-9"
          >
            전송
          </button>
        </section>

        {/* 졸음 감지 알림 */}
        <section
          className="
            relative order-4
            mx-auto h-[115px] w-full max-w-[380px]
            rounded-[15px] bg-[#F4F6FF]
            shadow-[0_0_10px_#2B52FF]
            min-[1280px]:absolute
            min-[1280px]:bottom-3
            min-[1280px]:left-[3.65%]
            min-[1280px]:z-20
            min-[1280px]:mx-0
          "
        >
          <div className="absolute left-5 top-4 flex items-center gap-[7px]">
            <img
              src="/assets/learning/notifications-active.svg"
              alt=""
              className="h-6 w-6"
            />
            <h2 className="bg-gradient-to-b from-[#2B52FF] to-[#FFC3EA] bg-clip-text text-[20px] font-bold text-transparent">
              {mock.drowsinessAlert.title}
            </h2>
          </div>

          <img
            src="/assets/learning/cancel.svg"
            alt="닫기"
            className="absolute right-5 top-4 h-6 w-6"
          />

          <div className="absolute bottom-3 left-5 right-5 flex items-center gap-3">
            <img
              src="/assets/learning/character-head.png"
              alt=""
              className="h-10 w-10 shrink-0"
            />

            <p className="rounded-[5px] border border-[#2B52FF] bg-gradient-to-b from-white to-[#EAEEFF] px-3 py-[7px] text-[14px] font-bold text-[#2B52FF]">
              {mock.drowsinessAlert.message}
            </p>
          </div>
        </section>
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

export default LearningPageA;

