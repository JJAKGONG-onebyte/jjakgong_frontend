import { ReactNode, useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import Switch from "../../../components/Switch";
import CheckIcon from "../../../components/CheckIcon";
import { loadStudySettings } from "../../settings/data/studySettings";
import { startLearningMockMaterials, webcamPermissionLabel } from "../data/startLearningMockData";
import type { LearningMode, StudyMaterial } from "../../../types/learning";
import { formatFileSize } from "../../../utils/formatFileSize";
import { saveMaterialFile } from "../../../services/materialFileStore";

export type StartLearningOptions = {
  materialId: string | null; // null = 자료 없이 학습
  useTimer: boolean;
  studyMinutes: number;
  mode: LearningMode;
  webcamTracking: boolean;
};

// 선택한 모드와 자료로 학습화면 주소를 만든다 (예: /studyB?material=local-123)
export function getLearningPath({ mode, materialId }: Pick<StartLearningOptions, "mode" | "materialId">): string {
  const path = mode === "video" ? "/studyA" : "/studyB";
  return materialId ? `${path}?material=${encodeURIComponent(materialId)}` : path;
}

type StartLearningModalProps = {
  open: boolean;
  onClose: () => void;
  onStart: (options: StartLearningOptions) => void;
};

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="text-small font-bold text-neutral-60">{children}</p>;
}

// 자료 선택 행 (선택되면 파란 배경)
function MaterialOption({
  selected,
  label,
  size,
  onClick,
}: {
  selected: boolean;
  label: string;
  size?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex h-[50px] w-full items-center gap-[15px] rounded-[10px] px-[19px] text-left text-caption transition-colors ${
        selected
          ? "bg-primary-10 font-bold text-neutral-100"
          : "border border-neutral-80 bg-primary-90 font-medium text-neutral-10"
      }`}
    >
      <span
        className={`flex h-[21px] w-[21px] shrink-0 items-center justify-center rounded-full ${
          selected ? "bg-white text-primary-10" : "border border-neutral-80 text-neutral-80"
        }`}
      >
        <CheckIcon className="h-[13px] w-[13px]" />
      </span>
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {size && (
        <span className={`shrink-0 ${selected ? "text-neutral-100" : "text-neutral-70"}`}>{size}</span>
      )}
    </button>
  );
}

// 학습 화면 모드 카드 (영상 통화형 / 자료 집중형)
function ModeCard({
  selected,
  title,
  description,
  illustration,
  onClick,
  disabled = false,
}: {
  selected: boolean;
  title: string;
  description: string;
  illustration: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={onClick}
      className={`relative h-[160px] w-full overflow-hidden rounded-[15px] text-center transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        selected
          ? "border-2 border-primary-10 bg-primary-90 shadow-50"
          : "border border-neutral-60 bg-neutral-100"
      }`}
    >
      {illustration}
      <span
        className={`absolute inset-x-0 top-[95px] text-small ${
          selected ? "font-bold text-primary-10" : "font-normal text-black"
        }`}
      >
        {title}
      </span>
      <span className="absolute inset-x-0 top-[124px] text-caption font-medium text-neutral-60">
        {description}
      </span>
    </button>
  );
}

// 토글이 붙은 설정 행
function ToggleRow({ children, checked, onToggle, ariaLabel }: {
  children: ReactNode;
  checked: boolean;
  onToggle: () => void;
  ariaLabel: string;
}) {
  return (
    <div className="flex h-[50px] items-center gap-[10px] rounded-[10px] border border-neutral-80 bg-gradient-to-t from-gradient-3 to-white px-[19px]">
      <div className="flex min-w-0 flex-1 items-center gap-[10px] text-caption font-medium text-neutral-10">
        {children}
      </div>
      <Switch size="sm" checked={checked} onClick={onToggle} ariaLabel={ariaLabel} />
    </div>
  );
}

function StartLearningModal({ open, onClose, onStart }: StartLearningModalProps) {
  const [materials, setMaterials] = useState<StudyMaterial[]>(startLearningMockMaterials);
  const [materialId, setMaterialId] = useState<string | null>(startLearningMockMaterials[0]?.id ?? null);
  const [useTimer, setUseTimer] = useState(true);
  const [studyMinutes, setStudyMinutes] = useState(50);
  const [mode, setMode] = useState<LearningMode>("video");
  const [webcamTracking, setWebcamTracking] = useState(true);

  // 열릴 때마다 학습 설정 페이지에 저장된 값을 기본값으로 불러온다
  useEffect(() => {
    if (!open) return;
    const settings = loadStudySettings();
    setStudyMinutes(settings.studyMinutes);
    setWebcamTracking(settings.webcamTracking);
  }, [open]);

  const [uploadError, setUploadError] = useState<string | null>(null);

  // 자료 집중형은 자료가 있어야 쓸 수 있다. "자료 없이 학습하기"를 고르면 영상 통화형으로 돌린다.
  const selectMaterial = (id: string | null) => {
    setMaterialId(id);
    if (id === null) setMode("video");
  };

  const handleUpload = async (file: File | undefined) => {
    if (!file) return;
    setUploadError(null);
    try {
      // 업로드 API 연동 전: 브라우저 저장소에 보관하고 그 ID로 목록에 추가
      const id = await saveMaterialFile(file);
      const newMaterial: StudyMaterial = { id, name: file.name, size: formatFileSize(file.size) };
      setMaterials((prev) => [...prev, newMaterial]);
      setMaterialId(id);
    } catch {
      setUploadError("자료를 저장하지 못했어요. 브라우저 저장소를 쓸 수 없는 환경(시크릿 모드 등)인지 확인해주세요.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} ariaLabel="학습 시작하기" className="max-w-[740px] px-5 pb-7 pt-7 sm:px-8">
      <h2 className="text-body font-bold text-neutral-10">학습 시작하기</h2>
      <p className="mt-[10px] text-caption font-medium text-primary-10">
        이번 학습 설정을 확인하고 시작해보세요.
      </p>

      {/* 학습 자료 */}
      <section className="mt-[10px]">
        <SectionLabel>학습 자료 (선택 사항)</SectionLabel>
        <div role="radiogroup" aria-label="학습 자료" className="mt-[10px] flex flex-col gap-[10px]">
          <MaterialOption
            selected={materialId === null}
            label="자료 없이 학습하기"
            onClick={() => selectMaterial(null)}
          />
          {materials.map((material) => (
            <MaterialOption
              key={material.id}
              selected={materialId === material.id}
              label={material.name}
              size={material.size}
              onClick={() => selectMaterial(material.id)}
            />
          ))}
        </div>

        <div className="mt-5 flex h-[50px] items-center justify-center rounded-[15px] border border-dashed border-primary-10 bg-neutral-90 shadow-50">
          <label className="flex h-[33px] cursor-pointer items-center gap-[10px] rounded-full bg-primary-10 px-5 text-caption font-bold text-neutral-100 focus-within:ring-2 focus-within:ring-primary-10 focus-within:ring-offset-2">
            <img src="/assets/learning/upload.svg" alt="" className="h-[18px] w-[18px]" />
            자료 업로드
            <input
              type="file"
              accept=".pdf,.txt"
              className="sr-only"
              onChange={(e) => {
                handleUpload(e.target.files?.[0]);
                e.target.value = ""; // 같은 파일을 다시 골라도 동작하도록
              }}
            />
          </label>
        </div>
        {uploadError && (
          <p role="alert" className="mt-2 text-caption font-medium text-ter-80">
            {uploadError}
          </p>
        )}
      </section>

      {/* 학습 시간 */}
      <section className="mt-5">
        <SectionLabel>학습 시간 (뽀모도로 타이머)</SectionLabel>
        <div className="mt-[10px]">
          <ToggleRow checked={useTimer} onToggle={() => setUseTimer((prev) => !prev)} ariaLabel="뽀모도로 타이머 사용">
            <span className={useTimer ? "" : "text-neutral-60"}>
              {useTimer ? `설정 시간 : ${studyMinutes}분` : "타이머 없이 학습하기"}
            </span>
          </ToggleRow>
        </div>
      </section>

      {/* 학습 화면 모드 */}
      <section className="mt-5">
        <SectionLabel>학습 화면 모드</SectionLabel>
        <div role="radiogroup" aria-label="학습 화면 모드" className="mt-[11px] grid grid-cols-2 gap-3 sm:gap-5">
          <ModeCard
            selected={mode === "video"}
            title="영상 통화형"
            description="카메라 · 캐릭터 크게 보기"
            onClick={() => setMode("video")}
            illustration={
              <>
                <span className="absolute left-1/2 top-[23px] h-[63px] w-[102px] -translate-x-1/2 rounded-[5px] border border-primary-10 bg-gradient-to-l from-primary-10 from-[39.904%] to-sec-80 opacity-70" />
                <span className="absolute left-1/2 top-[10px] h-[76px] w-[77px] -translate-x-1/2 overflow-hidden">
                  <img
                    src="/assets/learning/mode-video-character.png"
                    alt=""
                    className="absolute left-[6.53%] top-[3.69%] h-[134.87%] w-[88.84%] max-w-none"
                  />
                </span>
              </>
            }
          />
          <ModeCard
            selected={mode === "material"}
            title="자료 집중형"
            description={materialId === null ? "자료를 선택하면 쓸 수 있어요" : "자료 크게 보기"}
            disabled={materialId === null}
            onClick={() => setMode("material")}
            illustration={
              <img
                src="/assets/learning/document-scanner.svg"
                alt=""
                className="absolute left-1/2 top-[28px] h-[52px] w-[52px] -translate-x-1/2"
              />
            }
          />
        </div>

        <div className="mt-[10px]">
          <ToggleRow
            checked={webcamTracking}
            onToggle={() => setWebcamTracking((prev) => !prev)}
            ariaLabel="웹캠 집중 트래킹 사용"
          >
            <span className="whitespace-nowrap">웹캠 집중 트래킹</span>
            <span className="flex h-[22px] shrink-0 items-center rounded-full bg-ter-90 px-[10px] text-primary-10">
              {webcamPermissionLabel}
            </span>
          </ToggleRow>
        </div>
      </section>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-5">
        <button
          type="button"
          onClick={onClose}
          className="h-[60px] rounded-full border border-neutral-60 bg-neutral-100 text-small text-neutral-10"
        >
          취소
        </button>
        <Button
          fullWidth
          onClick={() => onStart({ materialId, useTimer, studyMinutes, mode, webcamTracking })}
        >
          학습 시작하기
        </Button>
      </div>
    </Modal>
  );
}

export default StartLearningModal;
