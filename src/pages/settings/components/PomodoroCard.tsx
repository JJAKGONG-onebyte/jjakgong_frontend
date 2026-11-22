import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Chip from "../../../components/Chip";
import SegmentedToggle from "../../../components/SegmentedToggle";
import SettingsCard from "./SettingsCard";
import TimerDial from "./TimerDial";
import { ReactComponent as TimerIcon } from "../../../assets/icons/avg-pace.svg";
import { clampMinutes, TIMER_CONFIG, TimerMode } from "../data/studySettings";

export type TimerValues = {
  studyMinutes: number;
  breakMinutes: number;
};

type PomodoroCardProps = {
  savedValues: TimerValues;
  onSave: (values: TimerValues) => void;
};

const STEP = 5; // +, - 버튼 한 번에 바뀌는 분

const MODE_OPTIONS: { mode: TimerMode; label: string }[] = [
  { mode: "study", label: TIMER_CONFIG.study.label },
  { mode: "break", label: TIMER_CONFIG.break.label },
];

const minutesKey = (mode: TimerMode) => (mode === "study" ? "studyMinutes" : "breakMinutes");

function PomodoroCard({ savedValues, onSave }: PomodoroCardProps) {
  const [mode, setMode] = useState<TimerMode>("study");
  const [draft, setDraft] = useState<TimerValues>(savedValues);
  // 직접 입력 중인 값 (포커스를 잃을 때 반영)
  const [inputText, setInputText] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  // 저장된 값이 바뀌면(다른 탭에서 저장 등) 편집 중인 값도 맞춰줌
  useEffect(() => {
    setDraft({ studyMinutes: savedValues.studyMinutes, breakMinutes: savedValues.breakMinutes });
  }, [savedValues.studyMinutes, savedValues.breakMinutes]);

  const config = TIMER_CONFIG[mode];
  const minutes = draft[minutesKey(mode)];

  useEffect(() => {
    if (!justSaved) return;
    const timer = window.setTimeout(() => setJustSaved(false), 2000);
    return () => window.clearTimeout(timer);
  }, [justSaved]);

  const setMinutes = (next: number) => {
    setDraft((prev) => ({ ...prev, [minutesKey(mode)]: clampMinutes(mode, next) }));
    setJustSaved(false);
  };

  const commitInput = () => {
    if (inputText === null) return;
    const parsed = parseInt(inputText.replace(/[^0-9]/g, ""), 10);
    if (!Number.isNaN(parsed)) setMinutes(parsed);
    setInputText(null);
  };

  const handleReset = () => {
    setDraft({
      studyMinutes: TIMER_CONFIG.study.defaultMinutes,
      breakMinutes: TIMER_CONFIG.break.defaultMinutes,
    });
    setInputText(null);
    setJustSaved(false);
  };

  const handleSave = () => {
    onSave(draft);
    setJustSaved(true);
  };

  return (
    <SettingsCard title="뽀모도로 타이머" icon={<TimerIcon className="w-[30px] h-[30px]" />}>
      <div className="mt-5 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-9">
        <div className="w-full max-w-[362px] shrink-0 lg:w-[clamp(240px,42%,362px)]">
          <TimerDial
            value={minutes}
            min={config.min}
            max={config.max}
            label={config.label}
            onChange={setMinutes}
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col">
          {/* 학습/휴식 전환 */}
          <div className="flex flex-wrap items-center gap-3">
            <SegmentedToggle
              size="lg"
              options={MODE_OPTIONS.map((option) => option.label)}
              value={config.label}
              onChange={(label) => {
                const next = MODE_OPTIONS.find((option) => option.label === label);
                if (next) {
                  setMode(next.mode);
                  setInputText(null);
                }
              }}
            />
            <span className="text-small font-normal text-neutral-60">시계를 돌려 분 단위로 설정해요.</span>
          </div>

          {/* - [ 50분 ] + */}
          <div className="mt-[38px] flex items-center gap-3">
            <button
              type="button"
              aria-label={`${config.label} ${STEP}분 줄이기`}
              onClick={() => setMinutes(minutes - STEP)}
              disabled={minutes <= config.min}
              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-primary-10
                bg-white text-body font-normal text-center text-primary-10 transition
                shadow-[0_0_10px_0_#2B52FF80]
                disabled:border-neutral-90 disabled:text-neutral-80 disabled:shadow-none"
            >
              −
            </button>

            <label className="flex h-[54px] min-w-[109px] items-center justify-center rounded-[10px] px-[30px] py-[10px] border border-neutral-90 bg-white
              text-body font-normal text-neutral-10 focus-within:border-primary-10">
              <input
                type="text"
                inputMode="numeric"
                aria-label={`${config.label}(분)`}
                value={inputText ?? String(minutes)}
                onChange={(e) => setInputText(e.target.value)}
                onBlur={commitInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.currentTarget.blur();
                }}
                // 숫자 길이만큼만 넓혀서 "50분" 전체가 상자 가운데 오도록
                style={{ width: `${Math.max(1, (inputText ?? String(minutes)).length)}ch` }}
                className="bg-transparent text-center outline-none"
              />
              <span>분</span>
            </label>

            <button
              type="button"
              aria-label={`${config.label} ${STEP}분 늘리기`}
              onClick={() => setMinutes(minutes + STEP)}
              disabled={minutes >= config.max}
              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full border border-primary-10
                bg-white text-body font-normal text-center text-primary-10 transition
                shadow-[0_0_10px_0_#2B52FF80]
                disabled:border-neutral-90 disabled:text-neutral-80 disabled:shadow-none"
            >
              +
            </button>
          </div>

          {/* 빠른 선택 */}
          <div className="mt-[26px] flex flex-wrap gap-2">
            {config.presets.map((preset) => (
              <Chip key={preset} size="lg" selected={minutes === preset} onClick={() => setMinutes(preset)}>
                {preset}분{preset === config.defaultMinutes && "(기본)"}
              </Chip>
            ))}
          </div>

          <p className="mt-9 text-small font-normal">
            <span className="text-primary-10">설정 시간이 지나면 캐릭터가 휴식을 권유해요.</span>
            <br />
            <span className="text-neutral-70">타이머를 강제로 종료하지 않아요.</span>
          </p>

          <div className="mt-3 flex items-center justify-end gap-5">
            <span role="status" className="text-caption text-primary-10 empty:hidden">
              {justSaved ? "저장되었어요!" : ""}
            </span>
            <Button variant="outline" size="lg" onClick={handleReset} className="w-[165px] min-w-0 shrink !font-normal">
              초기화
            </Button>
            <Button size="lg" onClick={handleSave} className="w-[165px] min-w-0 shrink">
              저장하기
            </Button>
          </div>
        </div>
      </div>
    </SettingsCard>
  );
}

export default PomodoroCard;
