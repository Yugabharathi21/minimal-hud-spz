import { useMemo } from "preact/hooks";

interface TextProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  icon?: React.ReactNode;
  color?: string;
  iconSize?: string;
  iconSpacing?: string;
}

export const TextProgressBar = ({ value = 50, icon, color = "#06CE6B", iconSize = "1.2vw", iconSpacing = "12px", ...props }: TextProgressBarProps) => {
  const getColor = useMemo(() => {
    if (value <= 20) return "#FE2436";
    if (value <= 50) return "#FB8607";
    return color;
  }, [color, value]);

  return (
    <div className="flex items-center justify-center w-[2.5dvw] h-[3.5dvh] space-x-1">
      {/* Icon with border */}
      <div
        className="flex items-center justify-center text-[1vw] border border-gray-700 rounded-md bg-black/40 p-[0.3vw]"
        style={{
          fontSize: iconSize,
          color: "rgba(255, 255, 255, 0.87)",
        }}
      >
        {icon}
      </div>

      {/* Vertical Progress Bar */}
      <div className="relative w-[3px] h-[2.5dvh] bg-gray-800/60 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 w-full transition-all duration-300 rounded-full"
          style={{
            height: `${Math.max(value, 5)}%`, // Ensures visibility even at low values
            backgroundColor: getColor || "#00ff00", // Default color if undefined
          }}
        ></div>
      </div>
    </div>
  );
};
