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
<div className="flex items-center space-x-1 bottom-4 right-4 absolute mr-4 mb-4">
      {/* Speed Display */}
      <span className="text-[3vw] font-extrabold text-white tabular-nums drop-shadow-md">
        {speed}
      </span>

      <div className="flex flex-col items-start">
        {/* Speed Unit */}
        <span className="text-[0.9vw] font-semibold text-gray-400 uppercase leading-none">
          {speedUnit}
        </span>

        {/* Gear */}
        <span className="text-[0.8vw] font-bold text-white border border-gray-700 p-1 w-8 h-8 flex items-center justify-center rounded-md">
          {currentGear}
        </span>
      </div>
    </div>
  );
});

export default Speedometer;