
import React from "react";
import LearningPageA from "./pages/learning/LearningPageA";
import LearningPageB from "./pages/learning/LearningPageB";
import StudySettingsPage from "./pages/settings/StudySettingsPage";
import MaterialsPage from "./pages/materials/MaterialsPage";
import SignupPage from "./pages/signup/SignupPage";
import CharacterSelectPage from "./pages/signup/CharacterSelectPage";
import LoginPage from "./pages/login/LoginPage";
import PasswordResetPage from "./pages/login/PasswordResetPage";

// 라우터 도입 전 임시 분기: /settings 로 접속하면 학습 설정 페이지
function App() {
  const path = window.location.pathname;

  if (path.startsWith("/settings")) {
    return <StudySettingsPage />;
  }
  // 라우터 도입 전 임시 분기: /materials 로 접속하면 학습 자료 관리 페이지
  if (path.startsWith("/materials")) {
    return <MaterialsPage />;
  }
// 라우터 도입 전 임시 분기: /studyA 로 접속하면 학습 페이지 A
  if (path === "/studyA") {
    return <LearningPageA />;
  }
// 라우터 도입 전 임시 분기: /studyB 로 접속하면 학습 페이지 B
  if (path === "/studyB") {
    return <LearningPageB />;
  }

  if (path === "/signup") {
    return <SignupPage />;
  }
  if (path === "/signup/character") {
    return <CharacterSelectPage />;
  }
  if (path === "/login") {
    return <LoginPage />;
  }
  if (path === "/login/reset") {
    return <PasswordResetPage />;
  }

  return <LearningPageA />;
}

export default App;
