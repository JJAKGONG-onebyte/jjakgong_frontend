import type { CharacterReaction, CharacterReactionType } from "../types/learning";

// 캐릭터 반응 수신 창구.
// 화면/훅은 이 함수만 사용하므로, 백엔드가 준비되면 이 파일 안쪽만 교체하면 된다.
//
// TODO(백엔드 연동): 아래 목업 대신 SSE 또는 WebSocket으로 교체
//   const source = new EventSource(`/api/learning/sessions/${sessionId}/reactions`);
//   source.onmessage = (e) => onReaction(JSON.parse(e.data) as CharacterReaction);
//   return () => source.close();

export type Unsubscribe = () => void;

const PRIORITY: Record<CharacterReactionType, number> = {
  drowsy: 40,
  distracted: 30,
  break: 20,
  praise: 10,
  idle: 0,
};

// 목업 시나리오: [이전 반응으로부터 몇 ms 뒤, 종류, 문구] 를 순서대로 반복
const MOCK_TIMELINE: Array<[number, CharacterReactionType, string]> = [
  [500, "praise", "잘하고 있어!"],
  [4_000, "drowsy", "졸려 보이네. 잠깐 쉬었다 할까?"],
  [40_000, "praise", "다시 집중 모드 돌입!"],
  [15_000, "distracted", "어디 보고 있어? 같이 집중하자!"],
  [20_000, "praise", "지금 페이스 아주 좋아!"],
  [25_000, "break", "벌써 꽤 했네. 곧 쉬는 시간이야!"],
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
