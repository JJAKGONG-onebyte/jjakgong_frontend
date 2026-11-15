import React from "react";
import LearningPage from "./pages/learning/LearningPage";
import StudySettingsPage from "./pages/settings/StudySettingsPage";

// 라우터 도입 전 임시 분기: /settings 로 접속하면 학습 설정 페이지
function App() {
  if (window.location.pathname.startsWith("/settings")) {
    return <StudySettingsPage />;
  }

  return <LearningPage />;
}

export default App;
