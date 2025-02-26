import { useMemo } from "react";
import { TiHeartFullOutline } from "react-icons/ti";

interface StatBarProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: React.ComponentType<{ className?: string }>;
  value?: number;
  maxValue?: number;
  color?: string;
  vertical?: boolean;
  iconColor?: string;
  label?: string;
}

export const StatBar = ({ 
  Icon = TiHeartFullOutline, 
  value = 20, 
  maxValue = 100, 
  color = "#00FFAA", 
  vertical = false,
  iconColor,
  label,
  ...props 
}: StatBarProps) => {
  const percentage = useMemo(() => (value / maxValue) * 100, [value, maxValue]);
  const finalIconColor = value === 0 ? "text-red-500" : iconColor || "text-white";
  
  return (
    <div className={`flex ${vertical ? "h-[3dvh]" : "w-full"} items-center gap-2 font-mono`} {...props}>
      {!vertical && <Icon className={`${finalIconColor} text-[1.2vw] filter drop-shadow-glow`} />}
      
      {!vertical && (
        <div className="flex flex-col">
          {label && (
            <p className="text-[0.7vw] font-bold uppercase tracking-wider text-white drop-shadow-glow">
              {label}
            </p>
          )}
          <p
            className="text-[0.8vw] drop-shadow-glow w-[30px] font-bold"
            style={{
              color: color,
            }}
          >
            {value}
          </p>
        </div>
      )}
      
      <div className={`relative ${vertical ? "h-full 2k:w-[6px] w-[4px] 4k:w-[8px] rounded-none" : "w-full ml-1 h-3 2k:h-4"} bg-black/70 border border-white/30 rounded-none overflow-hidden`}>
        {/* Background scanlines effect */}
        <div className="absolute inset-0 bg-scanlines opacity-20 z-10"></div>
        
        {/* Progress bar with pixelated edges */}
        <div
          className={`absolute ${vertical ? "bottom-0 w-full" : "left-0 h-full"} transition-all ease-in-out`}
          style={{
            backgroundColor: color,
            [vertical ? "height" : "width"]: `${percentage}%`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
        
        {/* Pixel overlay pattern */}
        <div className={`absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay z-20`}></div>
      </div>
      
      {vertical && <Icon className={`${finalIconColor} drop-shadow-glow text-[1vw]`} />}
    </div>
  );
};

interface StatBarSegmentedProps extends React.HTMLAttributes<HTMLDivElement> {
  Icon?: React.ComponentType<{ className?: string }>;
  value?: number;
  color?: string;
  label?: string;
}

export const StatBarSegmented = ({ 
  Icon = TiHeartFullOutline, 
  value = 20, 
  color = "#00FFAA",
  label,
  ...props 
}: StatBarSegmentedProps) => {
  const segments = 4;
  const segmentWidth = 100 / segments;

  const segmentFills = useMemo(
    () =>
      Array.from({ length: segments }, (_, i) => {
        const segmentMaxValue = ((i + 1) * 100) / segments;
        if (value >= segmentMaxValue) {
          return 100;
        } else if (value > (i * 100) / segments) {
          return ((value - (i * 100) / segments) / segmentWidth) * 100;
        } else {
          return 0;
        }
      }),
    [value, segments, segmentWidth],
  );

  return (
    <div className="flex items-center gap-2 w-full font-mono" {...props}>
      <Icon className="text-white text-[1.2vw] filter drop-shadow-glow" />
      
      <div className="flex flex-col">
        {label && (
          <p className="text-[0.7vw] font-bold uppercase tracking-wider text-white drop-shadow-glow mb-1">
            {label}
          </p>
        )}
        <p className="text-[0.8vw] w-[30px] font-bold drop-shadow-glow" style={{ color }}>
          {value}
        </p>
      </div>
      
      <div className="relative flex gap-1 w-full h-3 2k:h-4 ml-1">
        {segmentFills.map((fill, index) => (
          <div 
            key={index} 
            className="relative h-full w-full border border-white/30 overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-black/70"></div>
            
            {/* Scanlines effect */}
            <div className="absolute inset-0 bg-scanlines opacity-20 z-10"></div>
            
            {/* Fill */}
            <div 
              className="absolute left-0 h-full transition-all ease-in-out" 
              style={{
                width: `${fill}%`,
                backgroundColor: color,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
            
            {/* Pixel grid overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay z-20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
