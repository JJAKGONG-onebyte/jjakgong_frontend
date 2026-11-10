
import React from "react";

type LearningMode = "video" | "material";

interface LearningHeaderProps {
  mode: LearningMode;
  onModeChange: (mode: LearningMode) => void;
  focusTracking: boolean;
  onToggleFocusTracking: () => void;
  onLogout: () => void;
}

function LearningHeader({
  mode,
  onModeChange,
  focusTracking,
  onToggleFocusTracking,
  onLogout,
}: LearningHeaderProps) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-neutral-90 bg-white px-8">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-10">짝공</span>
          <span className="text-sm text-neutral-70">학습 공간</span>
        </div>

        <nav className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onModeChange("video")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "video"
                ? "bg-primary-90 text-primary-10"
                : "text-neutral-70 hover:bg-neutral-100"
            }`}
          >
            영상통화형
          </button>

          <button
            type="button"
            onClick={() => onModeChange("material")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              mode === "material"
                ? "bg-primary-90 text-primary-10"
                : "text-neutral-70 hover:bg-neutral-100"
            }`}
          >
            자료 집중형
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          onClick={onToggleFocusTracking}
          className="flex items-center gap-2 text-sm text-neutral-70"
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              focusTracking ? "bg-green-500" : "bg-neutral-80"
            }`}
          />
          집중 트래킹 {focusTracking ? "ON" : "OFF"}
        </button>

        <div className="h-5 w-px bg-neutral-90" />

        <span className="text-sm font-medium text-neutral-10">
          송 눈송님
        </span>

        <button
          type="button"
          onClick={onLogout}
          className="text-sm text-neutral-70 hover:text-neutral-10"
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}

export default LearningHeader;
