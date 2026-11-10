import React, { useState } from "react";
import LearningPageA from "./LearningPageA";
import LearningPageB from "./LearningPageB";

function LearningPage() {
  const [mode, setMode] = useState<"video" | "material">("video");

  return (
    <>
      {mode === "video" ? (
        <LearningPageA />
      ) : (
        <LearningPageB />
      )}
    </>
  );
}

export default LearningPage;