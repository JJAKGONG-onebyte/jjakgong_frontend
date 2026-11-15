
import React from "react";
import LearningPageA from "./pages/learning/LearningPageA";
import LearningPageB from "./pages/learning/LearningPageB";
import StudySettingsPage from "./pages/settings/StudySettingsPage";

// 라우터 도입 전 임시 분기: /settings 로 접속하면 학습 설정 페이지
function App() {
  const path = window.location.pathname;

  if (path.startsWith("/settings")) {
    return <StudySettingsPage />;
  }
// 라우터 도입 전 임시 분기: /studyA 로 접속하면 학습 페이지 A
  if (path === "/studyA") {
    return <LearningPageA />;
  }
// 라우터 도입 전 임시 분기: /studyB 로 접속하면 학습 페이지 B
  if (path === "/studyB") {
    return <LearningPageB />;
  }

  return <LearningPageA />;
}

export default App;
