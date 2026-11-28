
import { useState } from "react";
import WebcamView from "./components/WebcamView";
import EndLearningModal from "./components/EndLearningModal";
import CharacterReactionCard from "./components/CharacterReactionCard";
import AiChatPanel from "./components/AiChatPanel";
import { useCharacterReaction } from "./hooks/useCharacterReaction";
import { useSelectedMaterial } from "./hooks/useSelectedMaterial";
import { learningPageAMockData as mock } from "./data/learningMockData";
import { getLearningPath } from "./components/StartLearningModal";
import type { LearningMode } from "../../types/learning";

// "자료 선택하기": 학습 시작 팝업에서 자료를 다시 고른다
const goToMaterialSelect = () => window.location.assign("/start");

function LearningPageA() {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState<LearningMode>("video");
  const [showEndModal, setShowEndModal] = useState(false);
  // 학습 시작 팝업에서 고른 자료 (?material=ID). 없으면 AI 문제를 만들 수 없다.
  const { materialId } = useSelectedMaterial();
  // 캐릭터 반응 (B 화면과 같은 데이터). 종류별 자동 닫힘 시간은 useCharacterReaction 의 REACTION_DISPLAY_MS
  const { reaction, dismiss: dismissReaction, respond: respondReaction } = useCharacterReaction(cameraEnabled);

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
              onClick={() => (window.location.href = getLearningPath({ mode: "video", materialId }))}
              className={`rounded-full px-4 py-2 text-[14px] ${
                mode === "video"
                  ? "bg-[#2B52FF] text-white"
                  : "text-[#797980]"
              }`}
            >
              영상 통화
            </button>

            {/* 자료 집중 */}
            {/* 자료가 없으면 자료 집중 화면으로 갈 수 없다 */}
            <button
              type="button"
              disabled={!materialId}
              title={materialId ? undefined : "학습 자료를 선택하면 쓸 수 있어요"}
              onClick={() => (window.location.href = getLearningPath({ mode: "material", materialId }))}
              className={`rounded-full px-4 py-2 text-[14px] disabled:cursor-not-allowed disabled:opacity-50 ${
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

        {/* AI 문답 패널 (질문/답변 + AI 문제 풀이) */}
        <AiChatPanel
          materialId={materialId}
          onSelectMaterial={goToMaterialSelect}
          size="md"
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
        />

        {/* 캐릭터 반응 알림
            - 1280px 미만: 스크롤 위치와 상관없이 보이도록 화면 하단 중앙에 고정(토스트)
            - 1280px 이상: 왼쪽 아래, 가로는 캐릭터 카드(첫 번째 열) 중앙
              첫 번째 열 중앙 = 좌우 여백 3.65% + 열 영역 × (1.27 / 4.37 / 2) */}
        <CharacterReactionCard
          key={reaction?.id}
          reaction={reaction}
          onDismiss={dismissReaction}
          onFeedback={respondReaction}
          className="
            fixed bottom-4 left-1/2 z-40
            w-[calc(100%-32px)] max-w-[440px] -translate-x-1/2
            motion-safe:animate-toast-in
            min-[1280px]:absolute
            min-[1280px]:bottom-3
            min-[1280px]:left-[calc(3.65%_+_(100%_-_7.3%_-_32px)_*_0.1453)]
            min-[1280px]:z-20
          "
        />
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

