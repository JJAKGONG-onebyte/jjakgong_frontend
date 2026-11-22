import { DragEvent, useState } from "react";
import Button from "../../../components/Button";
import { ReactComponent as UploadIcon } from "../../../assets/icons/upload.svg";

type UploadDropzoneProps = {
  /** 파일을 놓거나 버튼을 눌렀을 때 (실제 업로드 기능은 다음 작업에서 연결) */
  onUploadClick?: () => void;
};

function UploadDropzone({ onUploadClick }: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  return (
    <section
      aria-label="학습 자료 업로드"
      onDragOver={handleDragOver}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center gap-4 rounded-[15px] border-2 border-dashed shadow-50
        px-6 py-8 text-center transition-colors
        ${dragging ? "border-primary-10 bg-primary-90" : "border-gradient-1 bg-neutral-90/60"}`}
    >
      <p className="text-small text-neutral-60">
        PDF · TXT 파일을 끌어다 놓거나 [자료 업로드]를 눌러주세요. (용량 제한 있음 · 업로드는 선택 사항)
      </p>
      <Button size="md" icon={<UploadIcon className="h-[18px] w-[18px]" />} onClick={onUploadClick}>
        자료 업로드
      </Button>
    </section>
  );
}

export default UploadDropzone;
