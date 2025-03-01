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
  
  // Enhanced RPM segments with better visual breakpoints
  const rpmSegments = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => {
      const segmentPercentage = (i / 23) * 100;
      const isRedline = segmentPercentage > 80;
      const isWarning = segmentPercentage > 60 && segmentPercentage <= 80;
      
      return {
        color: isRedline 
          ? 'from-rose-600 via-red-500 to-rose-600'
          : isWarning
          ? 'from-amber-500 via-orange-500 to-amber-500'
          : 'from-emerald-400 via-teal-500 to-emerald-400',
        glow: isRedline
          ? 'rgba(225,29,72,0.6)'
          : isWarning
          ? 'rgba(245,158,11,0.5)'
          : 'rgba(16,185,129,0.5)',
        active: percentage >= segmentPercentage,
        isRedline,
        isWarning
      };
    });
  }, [percentage]);

  return (
    <div className="relative w-56 h-24 select-none">
      <div className="absolute inset-0 transform-gpu rotate-x-12">
        {/* Main Content */}
        <div className="relative h-full flex flex-col justify-center items-center">
          {/* Enhanced Speed Display */}
          <div className="flex items-baseline gap-2 mb-3">
            <div className="relative">
              <span className="text-6xl font-bold tabular-nums tracking-tight text-rose-500
                drop-shadow-[0_0_15px_rgba(225,29,72,0.5)]"
                style={{
                  textShadow: '0 0 20px rgba(225,29,72,0.3), 0 0 40px rgba(225,29,72,0.2)',
                  animation: 'speedPulse 2s ease-in-out infinite'
                }}>
                {speed.toString().padStart(3, '0')}
              </span>
              {/* Speed Underline */}
              <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
            </div>
            <span className="text-sm font-medium text-rose-400/70 uppercase tracking-widest">
              {speedUnit}
            </span>
          </div>

          {/* Improved RPM Gauge */}
          <div className="relative w-48 h-3">
            {/* RPM Track Background */}
            <div className="absolute inset-0 bg-black/40 rounded-full overflow-hidden">
              {/* Track Pattern */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 8px)'
                }}
              />
            </div>
            
            {/* RPM Segments */}
            <div className="absolute inset-0 flex gap-[1px] rounded-full overflow-hidden p-[1px]">
              {rpmSegments.map((segment, i) => (
                <div 
                  key={i}
                  className={`h-full flex-1 transition-all duration-75
                    ${segment.active ? `bg-gradient-to-b ${segment.color}` : 'bg-zinc-900/30'}
                    ${segment.isRedline ? 'scale-y-110' : segment.isWarning ? 'scale-y-105' : ''}`}
                  style={{
                    boxShadow: segment.active ? `0 0 12px ${segment.glow}` : 'none',
                    animation: segment.active ? 'rpmPulse 0.75s ease-in-out infinite' : 'none',
                    animationDelay: `${i * 0.02}s`
                  }}
                />
              ))}
            </div>

            {/* RPM Shine Effect */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>

        {/* Enhanced Gear Display */}
        <div className="absolute top-4 left-[155px]">
          <div className="relative px-4 py-1 bg-black/40 border-l-2 border-rose-500/50
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-rose-500/10 before:to-transparent">
            <span className="relative text-sm font-bold text-rose-500 tracking-wider">
              {currentGear}
            </span>
            {/* Gear Indicator Glow */}
            <div className="absolute -left-0.5 top-0 bottom-0 w-[2px] bg-rose-500/50 blur-[1px]" />
          </div>
        </div>

        {/* Side Accent */}
        <div className="absolute -left-0.5 top-0 h-full w-[2px] bg-gradient-to-b from-rose-500/30 via-rose-500/50 to-rose-500/30 blur-[2px]" />
      </div>
    </div>
  );
});

export default Speedometer;