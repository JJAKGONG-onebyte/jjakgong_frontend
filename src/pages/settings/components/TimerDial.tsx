import { KeyboardEvent, PointerEvent, useRef } from "react";

type TimerDialProps = {
  value: number; // 분
  min: number;
  max: number;
  label: string;
  onChange: (minutes: number) => void;
};

// 다이얼 한 바퀴 = 60분 (60분을 넘으면 두 바퀴째로 이어짐)
const MINUTES_PER_TURN = 60;
const SIZE = 300;
const CENTER = SIZE / 2;
const RADIUS = 135; // 링이 상자(362px)를 거의 꽉 채우도록 (손잡이가 잘리지 않을 만큼만 여백)
const STROKE = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const TICKS = [
  { label: "0", x: CENTER, y: CENTER - RADIUS + 36 },
  { label: "15", x: CENTER + RADIUS - 30, y: CENTER },
  { label: "30", x: CENTER, y: CENTER + RADIUS - 36 },
  { label: "45", x: CENTER - RADIUS + 30, y: CENTER },
];

function TimerDial({ value, min, max, label, onChange }: TimerDialProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  // 드래그 중 누적 회전량(분, 소수 포함)과 직전 각도
  const dragRef = useRef<{ lastAngle: number; raw: number } | null>(null);

  const clamp = (minutes: number) => Math.min(max, Math.max(min, minutes));

  // 12시 방향 0°, 시계 방향으로 증가
  const angleFromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current!.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    return (Math.atan2(x, -y) * 180) / Math.PI;
  };

  const handlePointerDown = (e: PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { lastAngle: angleFromPointer(e), raw: value };
  };

  const handlePointerMove = (e: PointerEvent<SVGSVGElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const angle = angleFromPointer(e);
    let delta = angle - drag.lastAngle;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    drag.lastAngle = angle;
    drag.raw = clamp(drag.raw + (delta / 360) * MINUTES_PER_TURN);

    const next = Math.round(drag.raw);
    if (next !== value) onChange(next);
  };

  const handlePointerUp = () => {
    dragRef.current = null;
  };

  const handleKeyDown = (e: KeyboardEvent<SVGCircleElement>) => {
    const steps: Record<string, number> = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
      PageUp: 5,
      PageDown: -5,
    };
    if (e.key in steps) {
      e.preventDefault();
      onChange(clamp(value + steps[e.key]));
    } else if (e.key === "Home") {
      e.preventDefault();
      onChange(min);
    } else if (e.key === "End") {
      e.preventDefault();
      onChange(max);
    }
  };

  const fraction = Math.min(value / MINUTES_PER_TURN, 1);
  const knobRad = ((value % MINUTES_PER_TURN) / MINUTES_PER_TURN) * 2 * Math.PI;
  const knobX = CENTER + RADIUS * Math.sin(knobRad);
  const knobY = CENTER - RADIUS * Math.cos(knobRad);

  // 채워지는 호 모양을 SVG로 만들어 CSS 마스크로 사용 (SVG는 conic-gradient를 못 그려서)
  const arcMask = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}">` +
      `<circle cx="${CENTER}" cy="${CENTER}" r="${RADIUS}" fill="none" stroke="#fff" stroke-width="${STROKE}"` +
      ` stroke-linecap="${fraction < 1 ? "round" : "butt"}"` +
      ` stroke-dasharray="${CIRCUMFERENCE * fraction} ${CIRCUMFERENCE}"` +
      ` transform="rotate(-90 ${CENTER} ${CENTER})"/></svg>`
  )}")`;

  return (
    <div className="relative w-full max-w-[362px] aspect-square select-none">
      {/* 배경 트랙 */}
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 w-full h-full" aria-hidden="true">
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="#DDDDE6" strokeWidth={STROKE} />
      </svg>

      {/* 설정된 시간만큼 채워지는 호: 피그마 conic-gradient + 블러 그림자 */}
      {fraction > 0 && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ filter: "drop-shadow(0 0 10px #2B52FF80)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "conic-gradient(from 270deg at 50% 50%, #FFC3EA 0deg, #2B52FF 110.77deg, #FFC3EA 360deg)",
              WebkitMaskImage: arcMask,
              maskImage: arcMask,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
            }}
          />
        </div>
      )}

      {/* 손잡이 + 드래그 영역 */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="relative w-full h-full cursor-grab active:cursor-grabbing touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* 손잡이 */}
        <circle
          cx={knobX}
          cy={knobY}
          r={13}
          className="fill-white stroke-primary-10 outline-none focus-visible:stroke-[5px]"
          strokeWidth={3}
          tabIndex={0}
          role="slider"
          aria-label={`${label} 설정`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value}분`}
          onKeyDown={handleKeyDown}
        />
      </svg>

      {/* 눈금 숫자: SVG 밖(HTML)에 두어 다이얼 크기와 상관없이 실제 18px로 표시 */}
      {TICKS.map((tick) => (
        <span
          key={tick.label}
          aria-hidden="true"
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2
            text-small font-normal text-center text-neutral-70"
          style={{ left: `${(tick.x / SIZE) * 100}%`, top: `${(tick.y / SIZE) * 100}%` }}
        >
          {tick.label}
        </span>
      ))}

      {/* 가운데 표시 */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-large font-bold text-center text-primary-10">{value}분</p>
        <p className="text-small font-normal text-center text-neutral-70">{label}</p>
      </div>
    </div>
  );
}

export default TimerDial;
