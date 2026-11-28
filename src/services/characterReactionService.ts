import type { CharacterReaction, CharacterReactionFeedback, CharacterReactionType } from "../types/learning";

// 캐릭터 반응 수신 창구.
// 화면/훅은 이 함수만 사용하므로, 백엔드가 준비되면 이 파일 안쪽만 교체하면 된다.
//
// TODO(백엔드 연동): 아래 목업 대신 SSE 또는 WebSocket으로 교체
//   const source = new EventSource(`/api/learning/sessions/${sessionId}/reactions`);
//   source.onmessage = (e) => onReaction(JSON.parse(e.data) as CharacterReaction);
//   return () => source.close();

export type Unsubscribe = () => void;

const PRIORITY: Record<CharacterReactionType, number> = {
  drowsy: 50,
  away: 40,
  gaze: 30,
  break: 20,
  complete: 15,
  start: 10,
};

// 목업 시나리오: [이전 반응으로부터 몇 ms 뒤, 종류, 문구] 를 순서대로 반복
const MOCK_TIMELINE: Array<[number, CharacterReactionType, string]> = [
  [500, "start", "공부 시작! 같이 힘내보자~"],
  [10_000, "gaze", "화면을 바라봐 줘!"],
  [20_000, "drowsy", "졸려 보이네. 잠깐 쉬었다 할까?"],
  [35_000, "away", "어디 갔어? 돌아오면 다시 시작할게!"],
  [35_000, "break", "50분 집중했어! 잠깐 쉬었다 할까?"],
  [20_000, "complete", "오늘 학습도 집중해서 잘했어! 수고했어~"],
];

export function subscribeCharacterReactions(onReaction: (reaction: CharacterReaction) => void): Unsubscribe {
  let index = 0;
  let timer: number | undefined;

  const scheduleNext = () => {
    const [delay, type, message] = MOCK_TIMELINE[index % MOCK_TIMELINE.length];
    timer = window.setTimeout(() => {
      onReaction({
        id: `mock-${Date.now()}-${index}`,
        type,
        message,
        priority: PRIORITY[type],
        createdAt: new Date().toISOString(),
      });
      index += 1;
      scheduleNext();
    }, delay);
  };

  scheduleNext();
  return () => window.clearTimeout(timer);
}

// 반응 카드의 버튼("자리에 있었어" / "돌아왔어!" 등)을 눌렀을 때 서버에 알린다.
// TODO(백엔드 연동): POST /api/learning/reactions/{reactionId}/feedback  { feedback }
export async function sendReactionFeedback(
  reactionId: string,
  feedback: CharacterReactionFeedback,
): Promise<void> {
  void reactionId;
  void feedback;
}
