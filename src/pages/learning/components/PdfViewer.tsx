
import React, { useState } from "react";

type PdfViewerProps = {
  fileName: string;
};

function PdfViewer({ fileName }: PdfViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(3);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 70));
  };

  return (
    <section className="flex min-h-[500px] min-w-0 flex-col overflow-hidden rounded-[12px] border-[5px] border-[#0D0D0D] bg-[#0D0D0D] shadow-[0_0_6px_#2B52FF80] lg:min-h-[600px]">
      {/* PDF 상단 툴바 */}
      <div className="flex h-[28px] shrink-0 items-center justify-between px-3 text-[10px] text-white">
        <span>{fileName}</span>

        <span>{currentPage} / 43</span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            aria-label="축소"
            className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[14px] font-bold text-[#2B52FF]"
          >
            -
          </button>

          <span className="rounded bg-white px-2 py-[2px] text-[10px] text-[#0D0D0D]">
            {zoom}%
          </span>

          <button
            type="button"
            onClick={handleZoomIn}
            aria-label="확대"
            className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white text-[14px] font-bold text-[#2B52FF]"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF 페이지 */}
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto rounded-t-[8px] bg-[#F8F9FA] p-3">
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
      </div>
    </section>
  );
}

export default PdfViewer;
