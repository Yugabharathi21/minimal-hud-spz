import React, { useEffect, useMemo, useRef } from "react";
import { PiEngineFill } from "react-icons/pi";

interface SpeedometerProps {
  speed: number;
  maxRpm: number;
  rpm: number;
  gears: number;
  currentGear: string;
  engineHealth: number;
  speedUnit: "MPH" | "KPH";
}

const Speedometer: React.FC<SpeedometerProps> = React.memo(function Speedometer({ speed = 50, maxRpm = 100, rpm = 20, gears = 8, currentGear, engineHealth = 50, speedUnit }) {
  const percentage = useMemo(() => (rpm / maxRpm) * 100, [rpm, maxRpm]);
  const activeArcRef = useRef<SVGPathElement>(null);

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  useEffect(() => {
    if (activeArcRef.current) {
      const length = activeArcRef.current.getTotalLength();
      const offset = length * (1 - percentage / 100);
      activeArcRef.current.style.strokeDasharray = `${length} ${length}`;
      activeArcRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [percentage]);

  const gearLines = useMemo(
    () =>
      [...Array(gears)].map((_, i) => {
        const angle = -120 + (i * 240) / (gears - 1);
        const textPosition = polarToCartesian(0, 0, 30, angle); 
        return (
            <text
              x={textPosition.x}
              y={textPosition.y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="white"
              fontSize="5" 
              fontWeight="bold"
            >
              {i}
            </text>
        );
      }),
    [gears, polarToCartesian],
  );

  return (
    <div className="w-60 2k:w-[15dvw] 2k:h-[21dvh] 4k:w-[10dvw] 4k:h-[20dvh] h-64 relative flex items-center justify-center -mb-20 z-0">
      <div className="absolute inset-0 flex items-center justify-center bottom-[-70px]">
        <div className="text-center flex flex-col">
          <span className="absolute -mt-5 left-[200px] transform -translate-x-1/2 bottom-[140px] text-[1vw] font-semibold text-gray-400 tabular-nums drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] ml-1 border border-gray-700 p-1 w-7 h-7 flex items-center justify-center"> {currentGear} </span>
          <span className="text-[3vw] font-bold text-white tabular-nums drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] ml-2"> {speed} </span>
          <span className="absolute text-[19px] right-[5px] bottom-[165px] -mt-1 font-semibold text-gray-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] ml-4 uppercase"> {speedUnit} </span>
          {engineHealth < 30 && (
            <div className={"flex items-center justify-center *:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)] *:size-[0.9vw] *:text-red-600 mt-1"}>
              <PiEngineFill />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default Speedometer;