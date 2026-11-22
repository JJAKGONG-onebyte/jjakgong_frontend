export type Priority = "high" | "medium" | "low";

export type Schedule = {
  id: number;
  title: string;
  date: string;
  time?: string;
  priority: Priority;
  done: boolean;
  repeat?: string;
  repeatEnd?: string;
};