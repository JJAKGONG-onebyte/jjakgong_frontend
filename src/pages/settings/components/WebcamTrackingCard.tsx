import { useState } from "react";
import Switch from "../../../components/Switch";
import SettingsCard from "./SettingsCard";
import { ReactComponent as FocusCamIcon } from "../../../assets/icons/ar-on-you.svg";

type WebcamTrackingCardProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

function WebcamTrackingCard({ enabled, onChange }: WebcamTrackingCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [requesting, setRequesting] = useState(false);

  const handleToggle = async () => {
    if (requesting) return;

    if (enabled) {
      onChange(false);
      setError(null);
      return;
    }

    // 켤 때 브라우저 카메라 권한을 먼저 확인 (확인만 하고 바로 끔)
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("이 브라우저에서는 웹캠을 사용할 수 없어요.");
      return;
    }

    setRequesting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setError(null);
      onChange(true);
    } catch {
      setError("카메라 권한이 거부되어 켤 수 없어요. 브라우저 설정에서 카메라 권한을 허용해 주세요.");
    } finally {
      setRequesting(false);
    }
  };

  return (
    <SettingsCard title="집중 트래킹 · 웹캠" icon={<FocusCamIcon className="w-[30px] h-[30px]" />}>
      <div className="mt-5 flex items-center justify-between gap-4">
        <span className="text-small font-normal text-neutral-10">웹캠 집중 트래킹 접근 권한</span>
        <Switch checked={enabled} onClick={handleToggle} ariaLabel="웹캠 집중 트래킹 접근 권한" />
      </div>

      {error ? (
        <p role="alert" className="mt-7 text-small font-normal text-ter-80">
          {error}
        </p>
      ) : (
        <p className="mt-7 text-small font-normal text-primary-10">
          영상은 브라우저에서만 분석하며 서버로 전송 · 저장하지 않아요.
        </p>
      )}
    </SettingsCard>
  );
}

export default WebcamTrackingCard;
