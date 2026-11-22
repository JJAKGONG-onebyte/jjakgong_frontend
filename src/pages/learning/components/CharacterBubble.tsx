import type { CharacterReaction, CharacterReactionType } from "../../../types/learning";

type CharacterBubbleProps = {
  reaction: CharacterReaction | null;
  size?: "sm" | "md"; // sm: 학습화면 B의 작은 캐릭터 카드, md: 학습화면 A의 큰 캐릭터 카드
  className?: string;
};

// 경고성 반응은 빨간색, 나머지는 기본 파란색
const toneStyles: Record<CharacterReactionType, string> = {
  praise: "border-primary-10 text-primary-10",
  idle: "border-primary-10 text-primary-10",
  break: "border-primary-10 text-primary-10",
  distracted: "border-ter-80 text-ter-80",
  drowsy: "border-ter-80 text-ter-80",
};

const sizeStyles = {
  sm: "bg-white px-2 py-1 text-[10px]",
  md: "bg-gradient-to-t from-gradient-3 to-white px-[10px] py-[5px] text-caption font-medium shadow-50",
};

// 캐릭터 옆 말풍선. 반응이 바뀔 때마다 톡 튀어나오며 교체된다.
function CharacterBubble({ reaction, size = "sm", className = "" }: CharacterBubbleProps) {
  return (
    // 바깥 영역은 항상 렌더링해야 스크린리더가 새 메시지를 읽어준다
    <div aria-live="polite" className={className}>
      {reaction && (
        <div
          key={reaction.id}
          className={`w-fit max-w-full origin-top-left rounded-[5px] border motion-safe:animate-bubble-pop ${sizeStyles[size]} ${toneStyles[reaction.type]}`}
        >
          {reaction.message}
        </div>
      )}
    </div>
  );
}

export default CharacterBubble;
