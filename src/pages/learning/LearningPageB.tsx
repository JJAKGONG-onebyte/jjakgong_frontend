
import { useState } from "react";
import WebcamView from "./components/WebcamView";
import EndLearningModal from "./components/EndLearningModal";
import CharacterReactionCard from "./components/CharacterReactionCard";
import AiChatPanel from "./components/AiChatPanel";
import { useCharacterReaction } from "./hooks/useCharacterReaction";
import { useSelectedMaterial } from "./hooks/useSelectedMaterial";
import { learningPageAMockData as mock } from "./data/learningMockData";
import { getLearningPath } from "./components/StartLearningModal";
import PdfViewer from "./components/PdfViewer";
import type { LearningMode } from "../../types/learning";

// "자료 선택하기": 학습 시작 팝업에서 자료를 다시 고른다
const goToMaterialSelect = () => window.location.assign("/start");

function LearningPageB() {
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [mode, setMode] = useState<LearningMode>("material");
  const [showEndModal, setShowEndModal] = useState(false);
  // 학습 시작 팝업에서 고른 자료 (?material=ID). 업로드한 파일이 없으면 목업 자료를 보여준다.
  const { materialId, file: materialFile, loading: materialLoading } = useSelectedMaterial();
  const materialName = materialFile?.name ?? mock.materialName;
  // 캐릭터 반응 (집중 트래킹이 켜져 있을 때만 수신)
  const { reaction, dismiss: dismissReaction, respond: respondReaction } = useCharacterReaction(cameraEnabled);

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
            자료 : {materialName}
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
            <button
              type="button"
              onClick={() => (window.location.href = getLearningPath({ mode: "material", materialId }))}
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
      {/* lg 이상: 화면 높이에 고정 (오른쪽 패널 내용이 늘어나도 PDF 칸이 커지지 않고 패널 안에서 스크롤) */}
      <main className="grid grid-cols-1 gap-4 px-4 py-4 lg:h-[calc(100vh-173px)] lg:min-h-[632px] lg:grid-cols-[minmax(0,3.35fr)_minmax(260px,1fr)] lg:grid-rows-[minmax(0,1fr)] lg:gap-4 lg:px-[1.5%] lg:py-4">
        {/* PDF 학습 자료 영역 */}
        <PdfViewer fileName={materialName} file={materialFile} loading={materialLoading} />

        {/* 오른쪽 사이드 영역 */}
        <aside className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:relative lg:flex lg:min-h-0 lg:flex-col">
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

          {/* AI 문답 패널 (질문/답변 + AI 문제 풀이) */}
          <AiChatPanel
            materialId={materialId}
            onSelectMaterial={goToMaterialSelect}
            size="sm"
            className="relative h-[390px] min-w-0 overflow-hidden rounded-[12px] border-[2px] border-[#DCE4FF] bg-gradient-to-b from-white to-[#EAEEFF] shadow-[0_0_8px_#2B52FF60] sm:col-span-2 lg:h-auto lg:min-h-[280px] lg:flex-1"
          />

          {/* 캐릭터 반응 알림
              - lg 미만: 화면 하단 중앙에 고정(토스트)
              - lg 이상: 오른쪽 열 맨 위, 캐릭터·웹캠 카드 위에 겹쳐서 표시 (PDF를 가리지 않도록) */}
          <CharacterReactionCard
            key={reaction?.id}
            reaction={reaction}
            onDismiss={dismissReaction}
            onFeedback={respondReaction}
            className="
              fixed bottom-4 left-1/2 z-40
              w-[calc(100%-32px)] max-w-[440px] -translate-x-1/2
              motion-safe:animate-toast-in
              lg:absolute lg:bottom-auto lg:top-0
              lg:z-20 lg:w-full lg:max-w-none
            "
          />
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

export default LearningPageB;
