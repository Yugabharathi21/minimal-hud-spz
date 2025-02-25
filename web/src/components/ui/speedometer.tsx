import React, { useMemo } from "react";

interface SpeedometerProps {
  speed: number;
  maxRpm: number;
  rpm: number;
  currentGear: string;
  speedUnit: "MPH" | "KPH";
}

const Speedometer: React.FC<SpeedometerProps> = React.memo(function Speedometer({ 
  speed = 50, 
  maxRpm = 100, 
  rpm = 20, 
  currentGear, 
  speedUnit 
}) {
  const percentage = useMemo(() => (rpm / maxRpm) * 100, [rpm, maxRpm]);

  // Get color based on RPM percentage
  const getRpmColor = () => {
    if (percentage > 80) return "#ef4444";
    if (percentage > 60) return "#eab308";
    return "#22c55e";
  };

  // Calculate tick positions and values
  const rpmTicks = useMemo(() => {
    return [0, 25, 50, 75, 100].map(percent => ({
      percent,
      value: Math.round((percent / 100) * maxRpm),
    }));
  }, [maxRpm]);

  return (
    <div className="flex items-center space-x-2 absolute bottom-4 right-4 bg-black bg-opacity-40 border-2 border-green-700 p-4 rounded">
      {/* Realistic RPM gauge */}
      <div className="relative h-16 w-10 flex flex-col justify-between items-center">
        {/* RPM ticks and values */}
        <div className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none">
          {rpmTicks.map((tick, index) => (
            <div key={index} className="flex items-center w-full">
              <div className="w-2 h-px bg-green-600"></div>
              <span className="text-xs text-green-500 font-mono ml-1">
                {tick.value}
              </span>
            </div>
          ))}
        </div>
        
        {/* RPM bar */}
        <div className="absolute left-0 bottom-0 w-2 h-16 bg-gray-800 rounded-full overflow-hidden">
          <div 
            style={{ 
              height: `${percentage}%`, 
              marginTop: `${100 - percentage}%`,
              backgroundColor: getRpmColor()
            }}
            className="w-full transition-all duration-200"
          ></div>
        </div>
        
        {/* RPM label */}
        <span className="absolute -bottom-5 left-0 text-xs text-green-500 font-mono">RPM</span>
      </div>
      
      {/* Speed value */}
      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold text-green-500 font-mono leading-none">
          {speed}
        </span>
      </div>

      {/* Gear indicator */}
      <div className="flex items-center justify-center w-10 h-10 border-2 border-green-700 rounded bg-black">
        <span className="text-xl font-mono text-green-500">
          {currentGear}
        </span>
        {/* Speed value */}
      <div className="absolute flex-row items-center bottom-[65px]">
      <span className="text-lg text-green-400 font-mono mt-1">
          {speedUnit}
        </span>
      </div>
      </div>
    </div>
  );
});

export default Speedometer;