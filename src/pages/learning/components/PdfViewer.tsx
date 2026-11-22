import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdf.js 작업용 워커 (react-pdf 7 + CRA 권장 설정)
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

type PdfViewerProps = {
  fileName: string;
  file?: File | null; // 없으면 목업 페이지를 보여준다
  loading?: boolean;
};

const ZOOM_MIN = 70;
const ZOOM_MAX = 150;
const ZOOM_STEP = 10;

const isPdfFile = (file: File) => file.type === "application/pdf" || /\.pdf$/i.test(file.name);

const toolbarButton =
  "flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[14px] font-bold text-[#2B52FF] disabled:opacity-40";

function PdfViewer({ fileName, file = null, loading = false }: PdfViewerProps) {
  const kind: "pdf" | "text" | "mock" = file ? (isPdfFile(file) ? "pdf" : "text") : "mock";

  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(kind === "mock" ? 3 : 1);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [text, setText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // PDF 페이지 너비를 영역 너비에 맞추기 위해 측정
  const areaRef = useRef<HTMLDivElement>(null);
  const [areaWidth, setAreaWidth] = useState(0);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setAreaWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 파일이 바뀌면 처음 페이지부터
  useEffect(() => {
    setCurrentPage(file ? 1 : 3);
    setNumPages(null);
    setText(null);
    setError(null);
    if (file && !isPdfFile(file)) {
      file
        .text()
        .then(setText)
        .catch(() => setError("텍스트 자료를 읽지 못했어요."));
    }
  }, [file]);

  const totalPages = kind === "pdf" ? numPages : kind === "mock" ? 43 : null;

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + ZOOM_STEP, ZOOM_MAX));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - ZOOM_STEP, ZOOM_MIN));

  const renderContent = () => {
    if (loading) return <p className="m-auto text-[13px] text-[#797980]">자료를 불러오는 중이에요...</p>;
    if (error) return <p className="m-auto text-[13px] text-[#F5383B]">{error}</p>;

    if (kind === "pdf" && file) {
      // 영역 너비에 맞추고(세로 스크롤바 자리 16px 제외) 확대 비율 적용
      const pageWidth = Math.max(areaWidth - 16, 200) * (zoom / 100);
      return (
        <Document
          file={file}
          onLoadSuccess={({ numPages: total }) => setNumPages(total)}
          onLoadError={() => setError("PDF 자료를 열지 못했어요. 파일이 손상되지 않았는지 확인해주세요.")}
          loading={<p className="text-[13px] text-[#797980]">PDF를 여는 중이에요...</p>}
          className="mx-auto w-fit"
        >
          <Page pageNumber={currentPage} width={pageWidth} />
        </Document>
      );
    }

    if (kind === "text") {
      return (
        <pre
          className="w-full max-w-[1100px] self-start whitespace-pre-wrap break-words bg-white p-5 font-sans leading-[1.7] text-[#0D0D0D] sm:p-8"
          style={{ fontSize: `${(15 * zoom) / 100}px` }}
        >
          {text ?? ""}
        </pre>
      );
    }

    return <MockMaterialPage zoom={zoom} />;
  };

  return (
    <section className="flex min-h-[500px] min-w-0 flex-col overflow-hidden rounded-[12px] border-[5px] border-[#0D0D0D] bg-[#0D0D0D] shadow-[0_0_6px_#2B52FF80] lg:min-h-[600px]">
      {/* PDF 상단 툴바 */}
      <div className="flex h-[28px] shrink-0 items-center justify-between gap-3 px-3 text-[10px] text-white">
        <span className="min-w-0 truncate">{fileName}</span>

        {totalPages !== null && (
          <div className="flex shrink-0 items-center gap-2">
            {kind === "pdf" && (
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage <= 1}
                aria-label="이전 페이지"
                className={toolbarButton}
              >
                ‹
              </button>
            )}
            <span>
              {currentPage} / {totalPages}
            </span>
            {kind === "pdf" && (
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages}
                aria-label="다음 페이지"
                className={toolbarButton}
              >
                ›
              </button>
            )}
          </div>
        )}

        <div className="flex shrink-0 items-center gap-1">
          <button type="button" onClick={handleZoomOut} disabled={zoom <= ZOOM_MIN} aria-label="축소" className={toolbarButton}>
            -
          </button>

          <span className="rounded bg-white px-2 py-[2px] text-[10px] text-[#0D0D0D]">{zoom}%</span>

          <button type="button" onClick={handleZoomIn} disabled={zoom >= ZOOM_MAX} aria-label="확대" className={toolbarButton}>
            +
          </button>
        </div>
      </div>

      {/* 자료 영역: 페이지가 길어도 화면 전체가 늘어나지 않고 이 안에서만 스크롤 */}
      <div className="relative min-h-0 flex-1 rounded-t-[8px] bg-[#F8F9FA]">
        <div
          ref={areaRef}
          className={`absolute inset-0 flex overflow-auto p-3 ${
            kind === "mock" && !loading ? "items-center justify-center" : "items-start"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </section>
  );
}

// 업로드한 파일이 없을 때 보여주는 목업 페이지 (예시 자료)
function MockMaterialPage({ zoom }: { zoom: number }) {
  return (
    <div
      className="flex min-h-[440px] w-full max-w-[1100px] flex-col justify-between bg-[#F8F9FA] p-5 sm:p-8 lg:min-h-full lg:p-8"
      style={{
        transform: `scale(${zoom / 100})`,
        transformOrigin: "top center",
      }}
    >
      <div>
        <h1 className="mb-6 text-[22px] font-medium sm:text-[28px] lg:text-[30px]">
          1. 운영체제(OS)의 개념 및 정의
        </h1>

        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          {/* 설명 */}
          <div className="space-y-5 text-[13px] leading-[1.7] sm:text-[15px]">
            <p>
              • 운영체제는 컴퓨터 시스템의 자원들을 효율적으로 관리하며,
              사용자가 컴퓨터를 편리하고 효과적으로 사용할 수 있도록
              환경을 제공하는 여러 프로그램의 모임이다.
            </p>

            <p>
              • 컴퓨터 사용자와 컴퓨터 하드웨어 간의 인터페이스로서
              동작하는 시스템 소프트웨어의 일종으로, 다른 응용
              프로그램이 유용한 작업을 할 수 있도록 환경을 제공한다.
            </p>
          </div>

          {/* 운영체제 구조 */}
          <div className="flex flex-col items-center justify-center py-3">
            <div
              className="flex h-[75px] w-[30%] items-center justify-center bg-[#FFD66B] text-[15px] sm:text-[17px]"
              style={{
                clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
              }}
            >
              <span className="mt-6">사용자</span>
            </div>

            <div className="flex h-[65px] w-[48%] items-center justify-center bg-[#FFA36F] text-[15px] sm:text-[17px]">
              응용프로그램
            </div>

            <div className="flex h-[65px] w-[68%] items-center justify-center bg-[#91E447] text-[15px] sm:text-[17px]">
              유틸리티
            </div>

            <div className="flex h-[65px] w-[87%] items-center justify-center bg-[#49C4E2] text-[15px] font-bold sm:text-[17px]">
              운영체제
            </div>

            <div
              className="flex h-[65px] w-full items-center justify-center bg-[#A4B4B7] text-[15px] sm:text-[17px]"
              style={{
                clipPath: "polygon(13% 0, 87% 0, 100% 100%, 0 100%)",
              }}
            >
              하드웨어
            </div>
          </div>
        </div>
      </div>

      {/* 하단 설명 */}
      <div className="mt-5 flex items-center gap-2 lg:mt-0">
        <div className="w-[45%] bg-[#BFE1EE] px-3 py-3 text-right text-[12px] leading-[1.6] sm:text-[14px]">
          기계어(Machine Language)
          <br />
          명령어 해석기(SHELL)
          <br />
          제어 프로그램(Kernel)
          <br />
          마이크로 프로그램(Micro-Program)
        </div>

        <div className="h-[2px] flex-1 bg-[#49C4E2]" />
      </div>
    </div>
  );
}

export default PdfViewer;
