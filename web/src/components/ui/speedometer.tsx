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
    if (percentage > 80) return "#FF3333";
    if (percentage > 60) return "#FFCC00";
    return "#00FFAA";
  };

  // Calculate tick positions and values
  const rpmTicks = useMemo(() => {
    return [0, 25, 50, 75, 100].map(percent => ({
      percent,
      value: Math.round((percent / 100) * maxRpm / 1000), // Show in thousands (K)
    }));
  }, [maxRpm]);

  return (
    <div className="flex items-center space-x-4 absolute bottom-4 right-4 bg-black/80 border border-white/30 p-4">
      {/* RPM gauge */}
      <div className="relative h-20 w-12 flex flex-col justify-between items-center">
        {/* RPM ticks and values */}
        <div className="absolute inset-0 flex flex-col-reverse justify-between pointer-events-none">
          {rpmTicks.map((tick, index) => (
            <div key={index} className="flex items-center w-full">
              <div className="w-2 h-0.5 bg-white/50"></div>
              <span className="text-xs text-white font-mono ml-1 drop-shadow-glow">
                {tick.value}K
              </span>
            </div>
          ))}
        </div>
        
        {/* RPM bar */}
        <div className="absolute left-0 bottom-0 w-3 h-20 bg-black/70 border border-white/30 overflow-hidden">
          {/* Scanlines effect */}
          <div className="absolute inset-0 bg-scanlines opacity-20 z-10"></div>
          
          <div 
            style={{ 
              height: `${percentage}%`, 
              marginTop: `${100 - percentage}%`,
              backgroundColor: getRpmColor(),
              boxShadow: `0 0 8px ${getRpmColor()}`,
            }}
            className="w-full transition-all duration-100"
          ></div>
          
          {/* Pixel grid overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay z-20"></div>
        </div>
        
        {/* RPM label */}
        <span className="absolute -bottom-6 left-0 text-xs text-white font-mono uppercase tracking-wider drop-shadow-glow">RPM</span>
      </div>
      
      {/* Center section with speed value */}
      <div className="flex flex-col items-center">
        <span className="text-5xl font-bold text-white font-mono leading-none drop-shadow-glow">
          {speed}
        </span>
        <span className="text-lg text-white font-mono mt-1 uppercase tracking-wider drop-shadow-glow">
          {speedUnit}
        </span>
      </div>

      {/* Gear indicator */}
      <div className="flex items-center justify-center w-12 h-12 border border-white/30 bg-black/70 relative">
        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-scanlines opacity-20"></div>
        
        <span className="text-2xl font-mono text-white drop-shadow-glow z-10">
          {currentGear}
        </span>
        
        {/* Gear label */}
        <span className="absolute -bottom-6 left-0 text-xs text-white font-mono uppercase tracking-wider drop-shadow-glow">GEAR</span>
      </div>
      
      {/* Optional: Add decorative elements for that retro feel */}
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-white/50"></div>
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-white/50"></div>
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-white/50"></div>
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-white/50"></div>
    </div>
  );
});

export default Speedometer;