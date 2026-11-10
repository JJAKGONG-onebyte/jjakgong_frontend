
import React from "react";

interface LearningControlsProps {
  cameraEnabled: boolean;
  onToggleCamera: () => void;
  onShowMaterial: () => void;
  onRest: () => void;
  onEndLearning: () => void;
}

function LearningControls({
  cameraEnabled,
  onToggleCamera,
  onShowMaterial,
  onRest,
  onEndLearning,
}: LearningControlsProps) {
  return (
    <footer className="flex h-24 items-center justify-center gap-4 border-t border-neutral-90 bg-white px-8">
      <button
        type="button"
        onClick={onToggleCamera}
        className="rounded-xl border border-neutral-90 px-6 py-3 text-sm font-medium text-neutral-10 hover:bg-neutral-100"
      >
        카메라(집중 트래킹) {cameraEnabled ? "ON" : "OFF"}
      </button>

      <button
        type="button"
        onClick={onShowMaterial}
        className="rounded-xl border border-neutral-90 px-6 py-3 text-sm font-medium text-neutral-10 hover:bg-neutral-100"
      >
        학습 자료 보기
      </button>

      <button
        type="button"
        onClick={onRest}
        className="rounded-xl border border-neutral-90 px-6 py-3 text-sm font-medium text-neutral-10 hover:bg-neutral-100"
      >
        휴식하기
      </button>

      <button
        type="button"
        onClick={onEndLearning}
        className="rounded-xl bg-ter-80 px-6 py-3 text-sm font-medium text-white hover:opacity-90"
      >
        학습 종료하기
      </button>
    </footer>
  );
}

export default LearningControls;
