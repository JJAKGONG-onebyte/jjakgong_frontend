export type LearningMode = "video" | "material";

export type LearningTab = "chat" | "material";

// 캐릭터 반응 메시지 (집중 트래킹 결과에 따라 백엔드에서 내려줄 데이터)
export type CharacterReactionType = "praise" | "drowsy" | "distracted" | "break" | "idle";

export type CharacterReaction = {
  id: string; // 같은 문구가 다시 와도 새 반응으로 구분하기 위한 값
  type: CharacterReactionType;
  message: string;
  priority: number; // 클수록 중요 (졸음 > 집중 이탈 > 휴식 권유 > 칭찬)
  createdAt: string;
};

export type QuizOption = {
  id: number;
  text: string;
  status: "default" | "incorrect" | "correct";
  label?: string;
};
// 학습 자료 (학습 시작 팝업의 자료 목록)
export type StudyMaterial = {
  id: string;
  name: string;
  size: string; // 표시용 문자열 (예: "32.4MB")
};
