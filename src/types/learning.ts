export type LearningMode = "video" | "material";

// 캐릭터 반응 메시지 (집중 트래킹 결과에 따라 백엔드에서 내려줄 데이터)
// start: 학습 시작 / away: 자리 이탈 / gaze: 시선 이탈 / drowsy: 졸음 감지 / break: 휴식 권유 / complete: 학습 완료
export type CharacterReactionType = "start" | "away" | "gaze" | "drowsy" | "break" | "complete";

export type CharacterReaction = {
  id: string; // 같은 문구가 다시 와도 새 반응으로 구분하기 위한 값
  type: CharacterReactionType;
  message: string;
  priority: number; // 클수록 중요 (졸음 > 자리 이탈 > 시선 이탈 > 휴식 권유 > 학습 완료 > 학습 시작)
  createdAt: string;
};

// 감지 반응(자리/시선 이탈, 졸음)에 대한 사용자 응답
// - false_alarm: "자리에 있었어" 처럼 잘못 감지됐다고 알려줌 (모델 보정용)
// - acknowledged: "돌아왔어!" 처럼 반응을 확인함
export type CharacterReactionFeedback = "false_alarm" | "acknowledged";

// AI 문제 (정답은 채점 API에서만 받는다)
export type QuizQuestion = {
  id: string;
  number: number; // Q1, Q2 ... 표시용
  type: "multiple" | "short"; // 객관식 / 단답형
  question: string;
  options?: Array<{ id: string; text: string }>; // 객관식일 때만
};

// 채점 결과
export type QuizGrade = {
  correct: boolean;
  correctAnswer: string; // 정답 표시용 문구
  correctOptionId?: string; // 객관식일 때 정답 보기
  explanation: string;
};

// 학습 자료 (학습 시작 팝업의 자료 목록)
export type StudyMaterial = {
  id: string;
  name: string;
  size: string; // 표시용 문자열 (예: "32.4MB")
};
