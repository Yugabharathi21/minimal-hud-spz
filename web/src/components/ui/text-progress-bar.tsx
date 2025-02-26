import { useMemo } from "preact/hooks";

interface TextProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  icon?: React.ReactNode;
  color?: string;
  iconSize?: string;
  iconSpacing?: string;
  label?: string;
}

export const TextProgressBar = ({ 
  value = 50, 
  icon, 
  color = "#00FFAA", // Changed to retro neon green
  iconSize = "1.2vw", 
  iconSpacing = "12px",
  label,
  ...props 
}: TextProgressBarProps) => {
  const getColor = useMemo(() => {
    if (value <= 20) return "#FF3333"; // Retro red
    if (value <= 50) return "#FFCC00"; // Retro yellow
    return color;
  }, [color, value]);

  return (
    <div className="flex items-center justify-center w-[3dvw] h-[4dvh] space-x-1 font-mono">
      {/* Icon container with VCR/PS1 style */}
      <div
        className="flex items-center justify-center border border-white/30 p-[0.3vw] bg-black/80 relative"
        style={{
          fontSize: iconSize,
          color: color,
        }}
      >
        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-scanlines opacity-20 z-10"></div>
        
        {/* Icon */}
        <div className="relative z-20 drop-shadow-glow">
          {icon}
        </div>
        
        {/* Optional label underneath */}
        {label && (
          <span className="absolute -bottom-5 left-0 text-[0.6vw] text-white uppercase tracking-wider drop-shadow-glow">
            {label}
          </span>
        )}
      </div>

      {/* Vertical Progress Bar - VCR/PS1/PS2 styled */}
      <div className="relative w-[4px] h-[2.8dvh] bg-black/70 overflow-hidden border border-white/30">
        {/* Scanlines effect */}
        <div className="absolute inset-0 bg-scanlines opacity-20 z-10"></div>
        
        {/* Fill */}
        <div
          className="absolute bottom-0 w-full transition-all duration-200"
          style={{
            height: `${Math.max(value, 5)}%`, // Ensures visibility even at low values
            backgroundColor: getColor,
            boxShadow: `0 0 6px ${getColor}`,
          }}
        ></div>
        
        {/* Pixel grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay z-20"></div>
      </div>
      
      {/* Added value display for that classic UI feel */}
      <div className="text-[0.7vw] text-white font-mono drop-shadow-glow">
        {value}
      </div>
    </div>
  );
};