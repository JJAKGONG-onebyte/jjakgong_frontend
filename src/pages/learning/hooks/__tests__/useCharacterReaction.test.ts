import { act, renderHook } from "@testing-library/react";
import { useCharacterReaction } from "../useCharacterReaction";
import type { CharacterReaction, CharacterReactionType } from "../../../../types/learning";

// 데이터 소스를 가로채서 테스트에서 직접 반응을 보낸다
let emit: (reaction: CharacterReaction) => void = () => {};
jest.mock("../../../../services/characterReactionService", () => ({
  subscribeCharacterReactions: (cb: (r: CharacterReaction) => void) => {
    emit = cb;
    return () => {};
  },
}));

const PRIORITY: Record<CharacterReactionType, number> = { drowsy: 50, away: 40, gaze: 30, break: 20, complete: 15, start: 10 };
let seq = 0;
const make = (type: CharacterReactionType, message: string = type): CharacterReaction => ({
  id: String(seq++), type, message, priority: PRIORITY[type], createdAt: "",
});

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("더 중요한 반응은 바로 교체된다", () => {
  const { result } = renderHook(() => useCharacterReaction());
  act(() => emit(make("start")));
  act(() => emit(make("drowsy")));
  expect(result.current.reaction?.type).toBe("drowsy");
});

test("덜 중요한 반응은 졸음 알림을 덮지 않는다 (학습 시작 인사)", () => {
  const { result } = renderHook(() => useCharacterReaction());
  act(() => emit(make("drowsy")));
  act(() => { jest.advanceTimersByTime(10_000); emit(make("start")); });
  expect(result.current.reaction?.type).toBe("drowsy");
});

test("같은 중요도는 최소 5초 노출 후 최신 것으로 교체된다", () => {
  const { result } = renderHook(() => useCharacterReaction());
  act(() => emit(make("start", "첫번째")));
  act(() => { jest.advanceTimersByTime(1_000); emit(make("start", "두번째")); });
  expect(result.current.reaction?.message).toBe("첫번째");
  act(() => jest.advanceTimersByTime(4_000));
  expect(result.current.reaction?.message).toBe("두번째");
});

test("표시 시간이 지나면 사라지고, dismiss로 바로 닫을 수 있다", () => {
  const { result } = renderHook(() => useCharacterReaction());
  act(() => emit(make("drowsy")));
  act(() => jest.advanceTimersByTime(29_999));
  expect(result.current.reaction).not.toBeNull();
  act(() => jest.advanceTimersByTime(1));
  expect(result.current.reaction).toBeNull();

  act(() => emit(make("start")));
  act(() => result.current.dismiss());
  expect(result.current.reaction).toBeNull();
});

test("집중 트래킹이 꺼지면 반응이 사라진다", () => {
  const { result, rerender } = renderHook(({ enabled }) => useCharacterReaction(enabled), {
    initialProps: { enabled: true },
  });
  act(() => emit(make("start")));
  rerender({ enabled: false });
  expect(result.current.reaction).toBeNull();
});
