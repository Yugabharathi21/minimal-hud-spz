import { useMemo } from "preact/hooks";

interface TextProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  icon?: React.ReactNode;
  color?: string;
  iconSize?: string;
  iconSpacing?: string;
}

export const TextProgressBar = ({ 
  value = 50, 
  icon, 
  color = "#4ade80", // Changed to Fallout green
  iconSize = "1.2vw", 
  iconSpacing = "12px", 
  ...props 
}: TextProgressBarProps) => {
  const getColor = useMemo(() => {
    if (value <= 20) return "#ef4444"; // Fallout-style red
    if (value <= 50) return "#eab308"; // Fallout-style amber/yellow
    return color;
  }, [color, value]);

  return (
    <div className="flex items-center justify-center w-[2.5dvw] h-[3.5dvh] space-x-1 gap-y-10">
      {/* Icon with border - Fallout styled */}
      <div
        className="flex items-center justify-center text-[1vw] border border-green-700 rounded-md p-[0.3vw] bg-black bg-opacity-40"
        style={{
          fontSize: iconSize,
          color: "#4ade80", // Fallout green for icon
        }}
      >
        {icon}
      </div>

      {/* Vertical Progress Bar - Fallout styled */}
      <div className="relative w-[3px] h-[2.5dvh] bg-gray-900 rounded-full overflow-hidden border-t border-b border-green-900">
        <div
          className="absolute bottom-0 w-full transition-all duration-300 rounded-none"
          style={{
            height: `${Math.max(value, 5)}%`, // Ensures visibility even at low values
            backgroundColor: getColor || "#4ade80", // Default color if undefined
          }}
        ></div>
      </div>
    </div>
  );
};