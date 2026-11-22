export type StudyMaterial = {
  id: string;
  name: string;
  uploadedAt: string; // YYYY-MM-DD
};

// 자료 API 연동 전 임시 데이터
export const materialsMockData = {
  userName: "송 눈송",

  materials: [
    { id: "m1", name: "컴퓨터구조_3장.pdf", uploadedAt: "2026-09-28" },
    { id: "m2", name: "정보처리기사_요약.pdf", uploadedAt: "2026-09-21" },
    { id: "m3", name: "영어단어_정리.txt", uploadedAt: "2026-09-15" },
  ] as StudyMaterial[],

  // 처음에는 아무 자료도 선택하지 않은 상태 (자료 없이 학습)
  selectedMaterialId: null as string | null,
};
