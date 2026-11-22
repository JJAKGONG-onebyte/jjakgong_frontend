export type MaterialFileType = "pdf" | "txt";

export type HomeMaterial = {
  id: number;
  type: MaterialFileType;
  name: string;
  size: string;
  date: string;
};

export type HomeRecord = {
  id: number;
  date: string;
  title: string;
  minutes: number;
};