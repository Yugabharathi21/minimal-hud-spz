import { usePlayerState } from "@/states/player";
import React from "preact/compat";
import { FaCompass, FaLocationDot, FaMap } from "react-icons/fa6";
import IconLabelBox from "./ui/icon-label-box";
import { useCompassLocation, useCompassAlways } from "@/states/compass-location";

const Compass = () => {
  const playerState = usePlayerState();
  const compassLocation = useCompassLocation();
  const compassAlways = useCompassAlways();

  if (!compassAlways && !playerState.isInVehicle) {
    return null;
  }
  return (
<div className={`absolute ${compassLocation === "bottom" ? "bottom-2" : "top-2"} w-full flex items-center justify-center`}>
  <div className="flex gap-3 items-center justify-center px-5 py-2  border-white/10 w-fit">
    <IconLabelBox label={playerState.heading} Icon={FaCompass} className="p-2 rounded-[3px] border border-gray-700   text-white shadow-md" />
    <IconLabelBox label={playerState.streetLabel} Icon={FaLocationDot} className="p-2 rounded-[3px] border border-gray-700  text-white shadow-md" />
    <IconLabelBox label={playerState.areaLabel} Icon={FaMap} className="p-2 rounded-[3px] border border-gray-700  text-white shadow-md" />
  </div>
</div>


  );
};

export default React.memo(Compass);

