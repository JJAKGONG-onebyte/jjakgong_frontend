export type LearningMode = "video" | "material";

export type LearningTab = "chat" | "material";

export type QuizOption = {
  id: number;
  text: string;
  status: "default" | "incorrect" | "correct";
  label?: string;
};