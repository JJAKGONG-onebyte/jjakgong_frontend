import Modal from "../../../components/Modal";
import Button from "../../../components/Button";

export type LearningSummary = {
  sessionTime: string;
  quizResult: string;
  todayTotalTime: string;
  exp: string;
};

type EndLearningModalProps = {
  open: boolean;
  summary: LearningSummary;
  onContinue: () => void;
  onEnd: () => void;
};

function EndLearningModal({ open, summary, onContinue, onEnd }: EndLearningModalProps) {
  const rows = [
    { label: "이번 학습 시간", value: summary.sessionTime },
    { label: "풀이 결과", value: summary.quizResult },
    { label: "오늘 누적 학습 시간", value: summary.todayTotalTime },
    { label: "캐릭터 경험치", value: summary.exp },
  ];

  return (
    <Modal open={open} onClose={onContinue} ariaLabel="학습 종료" className="max-w-[578px] px-5 pb-7 pt-7 sm:px-8">
      <h2 className="text-center text-base font-bold text-neutral-10">학습을 종료할까요?</h2>

      {/* 캐릭터 + 말풍선 */}
      <div className="mt-2 flex items-start justify-center">
        <div className="h-[169px] w-[153px] shrink-0 overflow-hidden">
          <img
            src="/assets/learning/jjaki-good.png"
            alt="짝이"
            className="h-[120.94%] w-full max-w-none -translate-y-[0.12%] drop-shadow-[0_0_10px_#FFC3EA]"
          />
        </div>

        {/* 시안처럼 말풍선이 캐릭터 손 쪽에 살짝 겹치도록 */}
        <div className="relative z-10 -ml-[25px] mt-[22px] flex items-center gap-[10px] rounded-[5px] border border-primary-10 bg-gradient-to-t from-gradient-3 to-white px-[10px] py-[5px] shadow-50">
          <p className="whitespace-nowrap text-caption font-medium text-primary-10">
            오늘 학습도
            <br />
            집중해서 잘했어!
            <br />
            수고했어~
          </p>
          <img src="/assets/learning/clap.svg" alt="" className="h-10 w-10 shrink-0" />
        </div>
      </div>

      {/* 학습 요약 */}
      <dl className="flex flex-col gap-[13px] rounded-[10px] bg-primary-90 p-[18px] shadow-50">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4">
            <dt className="shrink-0 text-caption font-medium text-neutral-60">{row.label}</dt>
            <dd className="text-right text-small font-bold text-neutral-10">{row.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-center text-caption font-medium text-neutral-60">
        학습을 종료하면 이번 기록과 경험치가 자동으로 저장돼요.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5">
        <Button onClick={onContinue} fullWidth>
          계속 학습하기
        </Button>
        <Button variant="danger" onClick={onEnd} fullWidth>
          학습 종료하기
        </Button>
      </div>
    </Modal>
  );
}

export default EndLearningModal;
