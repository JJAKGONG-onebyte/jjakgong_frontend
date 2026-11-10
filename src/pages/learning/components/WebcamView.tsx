
import React, { useEffect, useRef, useState } from "react";

interface WebcamViewProps {
  enabled: boolean;
  className?: string;
}

function WebcamView({ enabled, className = "" }: WebcamViewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let stream: MediaStream | null = null;
    let isActive = true;

    const startCamera = async () => {
      if (!enabled) return;

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("현재 브라우저에서는 카메라를 사용할 수 없습니다.");
        return;
      }

      try {
        const mediaStream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });

        if (!isActive) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        stream = mediaStream;

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }

        setError("");
      } catch {
        if (isActive) {
          setError("카메라 접근 권한을 확인해 주세요.");
        }
      }
    };

    if (enabled) {
      startCamera();
    }

    return () => {
      isActive = false;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [enabled]);

  return (
    <div
  className={`relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-neutral-10 ${className}`}
>
      {enabled ? (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover"
          />

          {error && (
            <p className="absolute px-4 text-center text-sm text-white">
              {error}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-white">카메라가 꺼져 있습니다.</p>
      )}
    </div>
  );
}

export default WebcamView;
