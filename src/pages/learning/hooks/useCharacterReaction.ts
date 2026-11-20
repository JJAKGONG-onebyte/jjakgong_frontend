import { useCallback, useEffect, useRef, useState } from "react";
import { subscribeCharacterReactions } from "../../../services/characterReactionService";
import type { CharacterReaction, CharacterReactionType } from "../../../types/learning";

// 한 반응을 최소 이만큼은 보여준 뒤에 같은 우선순위 반응으로 바꾼다 (깜빡임 방지)
const MIN_DISPLAY_MS = 5_000;

// 종류별로 화면에 머무는 시간. 지나면 자동으로 사라진다.
export const REACTION_DISPLAY_MS: Record<CharacterReactionType, number> = {
  drowsy: 30_000,
  distracted: 15_000,
  break: 15_000,
  praise: 10_000,
  idle: 10_000,
};

/**
 * 캐릭터 반응을 받아서 "지금 보여줄 반응 하나"로 정리해 주는 훅.
 *
 * 표시 규칙
 * - 더 중요한 반응(priority 높음)이 오면 바로 교체
 * - 같은 중요도면 현재 반응을 최소 5초 보여준 뒤 교체
 * - 덜 중요한 반응은 무시 (예: 졸음 알림을 칭찬이 덮지 않음)
 * - 종류별 표시 시간이 지나면 자동으로 사라짐
 *
 * @param enabled 집중 트래킹이 꺼져 있으면 반응을 받지 않는다.
 */
export function useCharacterReaction(enabled = true) {
  const [reaction, setReaction] = useState<CharacterReaction | null>(null);
  const hideRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (!enabled) {
      setReaction(null);
      return;
    }

    let current: { reaction: CharacterReaction; shownAt: number } | null = null;
    let pending: CharacterReaction | null = null;
    let expireTimer: number | undefined;
    let pendingTimer: number | undefined;

    const clearTimers = () => {
      window.clearTimeout(expireTimer);
      window.clearTimeout(pendingTimer);
    };

    const hide = () => {
      clearTimers();
      current = null;
      pending = null;
      setReaction(null);
    };

    const show = (next: CharacterReaction) => {
      clearTimers();
      current = { reaction: next, shownAt: Date.now() };
      pending = null;
      setReaction(next);
      expireTimer = window.setTimeout(hide, REACTION_DISPLAY_MS[next.type]);
    };

    const receive = (incoming: CharacterReaction) => {
      if (!current || incoming.priority > current.reaction.priority) {
        show(incoming);
        return;
      }
      if (incoming.priority < current.reaction.priority) return;

      const elapsed = Date.now() - current.shownAt;
      if (elapsed >= MIN_DISPLAY_MS) {
        show(incoming);
        return;
      }

      // 같은 중요도: 최소 노출 시간이 지나면 가장 최근 것으로 교체
      pending = incoming;
      window.clearTimeout(pendingTimer);
      pendingTimer = window.setTimeout(() => {
        if (pending) show(pending);
      }, MIN_DISPLAY_MS - elapsed);
    };

    hideRef.current = hide;
    const unsubscribe = subscribeCharacterReactions(receive);

    return () => {
      unsubscribe();
      clearTimers();
      hideRef.current = () => {};
    };
  }, [enabled]);

  // X 버튼 등으로 사용자가 직접 닫을 때
  const dismiss = useCallback(() => hideRef.current(), []);

  return { reaction, dismiss };
}
