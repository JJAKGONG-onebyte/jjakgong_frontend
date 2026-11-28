import type {
  CharacterReaction,
  CharacterReactionFeedback,
  CharacterReactionType,
} from "../../../types/learning";

type ReactionMeta = {
  title: string;
  image: string; // 상태별 캐릭터 표정 (?, !, zZ, ♪ 등 포함)
  // 감지 반응만 버튼이 있다. secondary = 잘못 감지됐다고 알림, primary = 확인
  actions?: { secondary: string; primary: string };
  alert?: boolean; // 사용자의 응답이 필요한 경고성 반응 (스크린리더가 바로 읽음)
};

const IMAGE_DIR = "/assets/learning/reactions";

// Figma "12 캐릭터 반응 상태 (학습 중 반응)" 기준
const REACTION_META: Record<CharacterReactionType, ReactionMeta> = {
  start: { title: "학습 시작", image: `${IMAGE_DIR}/start.png` },
  away: {
    title: "자리 이탈",
    image: `${IMAGE_DIR}/away.png`,
    actions: { secondary: "자리에 있었어", primary: "돌아왔어!" },
    alert: true,
  },
  gaze: {
    title: "시선 이탈",
    image: `${IMAGE_DIR}/gaze.png`,
    actions: { secondary: "화면을 보고 있었어", primary: "지금 볼게!" },
    alert: true,
  },
  drowsy: {
    title: "졸음 감지",
    image: `${IMAGE_DIR}/drowsy.png`,
    actions: { secondary: "아직 집중하고 있었어", primary: "다시 집중할게!" },
    alert: true,
  },
  break: { title: "휴식 권유", image: `${IMAGE_DIR}/break.png` },
  complete: { title: "학습 완료", image: `${IMAGE_DIR}/complete.png` },
};

type CharacterReactionCardProps = {
  reaction: CharacterReaction | null;
  onDismiss: () => void;
  onFeedback: (reaction: CharacterReaction, feedback: CharacterReactionFeedback) => void;
  className?: string; // 화면마다 다른 위치 지정 (토스트 등장 효과 포함)
};

// 학습 중 캐릭터 반응 알림 카드.
// 반응이 바뀔 때 등장 효과가 다시 나오도록 쓰는 쪽에서 key={reaction.id} 를 넘긴다.
function CharacterReactionCard({ reaction, onDismiss, onFeedback, className = "" }: CharacterReactionCardProps) {
  if (!reaction) return null;

  const meta = REACTION_META[reaction.type];

  return (
    <div
      role={meta.alert ? "alert" : "status"}
      className={`rounded-[15px] bg-[#F4F6FF] px-5 pb-4 pt-4 shadow-[0_0_10px_#2B52FF] ${className}`}
    >
      <div className="flex items-center gap-[7px]">
        <img src="/assets/learning/notifications-active.svg" alt="" className="h-6 w-6" />
        <h2 className="bg-gradient-to-b from-primary-10 to-sec-80 bg-clip-text text-[20px] font-bold text-transparent">
          {meta.title}
        </h2>

        <button type="button" onClick={onDismiss} aria-label="알림 닫기" className="ml-auto h-6 w-6 shrink-0">
          <img src="/assets/learning/cancel.svg" alt="" className="h-6 w-6" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-5">
        <img src={meta.image} alt="" className="h-[49px] w-auto shrink-0" />

        <p className="min-w-0 flex-1 rounded-[5px] border border-primary-10 bg-gradient-to-b from-white to-gradient-3 px-3 py-[7px] text-center text-[14px] font-bold text-primary-10">
          {reaction.message}
        </p>
      </div>

      {meta.actions && (
        <div className="mt-[21px] flex flex-wrap justify-end gap-[10px]">
          <button
            type="button"
            onClick={() => onFeedback(reaction, "false_alarm")}
            className="rounded-full border border-neutral-60 bg-white px-[15px] py-[3px] text-[14px] text-neutral-60"
          >
            {meta.actions.secondary}
          </button>
          <button
            type="button"
            onClick={() => onFeedback(reaction, "acknowledged")}
            className="rounded-full bg-primary-10 px-[15px] py-[3px] text-[14px] font-bold text-white"
          >
            {meta.actions.primary}
          </button>
        </div>
      )}
    </div>
  );
}

export default CharacterReactionCard;
