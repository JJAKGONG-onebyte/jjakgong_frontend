
import React from "react";
import LearningPageA from "./pages/learning/LearningPageA";
import LearningPageB from "./pages/learning/LearningPageB";
import StartLearningModal, { getLearningPath } from "./pages/learning/components/StartLearningModal";
import StudySettingsPage from "./pages/settings/StudySettingsPage";
import MaterialsPage from "./pages/materials/MaterialsPage";
import SignupPage from "./pages/signup/SignupPage";
import CharacterSelectPage from "./pages/signup/CharacterSelectPage";
import LoginPage from "./pages/login/LoginPage";
import PasswordResetPage from "./pages/login/PasswordResetPage";
import HomePage from "./pages/home/HomePage";

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

// 라우터 도입 전 임시 분기: /start 로 접속하면 학습 시작 팝업 (홈 페이지가 생기면 홈의 버튼에서 띄우기)
  if (path === "/start") {
    return (
      <div className="min-h-screen bg-primary-90">
        <StartLearningModal
          open
          onClose={() => window.history.back()}
          // TODO: 선택한 자료/시간/웹캠 설정을 학습 세션 생성 API로 보내기
          onStart={(options) => {
            window.location.href = getLearningPath(options);
          }}
        />
      </div>
    );
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
  
  if (path === "/home") {
    return <HomePage />;
  }

  return <LearningPageA />;
}

export default App;
