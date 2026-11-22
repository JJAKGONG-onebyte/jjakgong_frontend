// 라우터 도입 전 임시 이동: 사이드바 메뉴 이름 → 주소
// 아직 페이지가 없는 메뉴는 목록에 없어서 눌러도 이동하지 않는다.
export const MENU_PATHS: Record<string, string> = {
  홈: "/home",
  "학습 설정": "/settings",
  "학습 자료 관리": "/materials",
};

export function navigateToMenu(label: string) {
  const path = MENU_PATHS[label];
  if (path && window.location.pathname !== path) {
    window.location.assign(path);
  }
}
