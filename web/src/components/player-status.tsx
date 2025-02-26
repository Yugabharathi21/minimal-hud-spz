import { useNuiEvent } from "@/hooks/useNuiEvent";
import { MinimapStateInterface, useMinimapStateStore } from "@/states/minimap";
import { PlayerStateInterface, usePlayerStateStore } from "@/states/player";
import React, { useCallback, useMemo } from "preact/compat";
import { BiSolidShieldAlt2 } from "react-icons/bi";
import { FaGlassWater, FaBurger, FaBrain, FaMicrophone, FaPersonSwimming, FaPersonRunning } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";
import { StatBar, StatBarSegmented } from "./ui/status-bars";
import { useSkewedStyle, useSkewAmount } from "@/states/skewed-style";

const PlayerStatus = () => {
  const [playerState, setPlayerState] = usePlayerStateStore();
  const [minimap, setMinimapState] = useMinimapStateStore();
  const skewedStyle = useSkewedStyle();
  const skewedAmount = useSkewAmount();

  const handlePlayerStateUpdate = useCallback(
    (newState: PlayerStateInterface) => {
      setPlayerState((prevState) => {
        if (JSON.stringify(prevState) !== JSON.stringify(newState)) {
          return newState;
        }
        return prevState;
      });
    },
    [setPlayerState],
  );

  useNuiEvent<{ minimap: MinimapStateInterface; player: PlayerStateInterface }>("state::global::set", (data) => {
    handlePlayerStateUpdate(data.player);
    setMinimapState(data.minimap);
  });

  const isUsingFramework = useMemo(() => {
    return playerState.hunger !== undefined || playerState.thirst !== undefined;
  }, [playerState]);

  // Map status icons to labels for the retro UI
  const statusLabels = {
    armor: "ARMOR",
    health: "HEALTH",
    mic: "VOICE",
    hunger: "FOOD",
    thirst: "WATER",
    oxygen: "O2",
    stamina: "STAM",
    stress: "STRESS"
  };

  // Custom color palette for the retro theme
  const retroColors = {
    armor: "#00AAFF",    // Bright blue
    health: "#00FFAA",   // Neon green
    mic: "#FFFF00",      // Bright yellow
    hunger: "#FF9900",   // Orange
    thirst: "#00CCFF",   // Cyan
    oxygen: "#00FFFF",   // Aqua
    stamina: "#CCFF00",  // Lime
    stress: "#FF3333"    // Bright red
  };

  return (
    <>
      <div
        class="absolute items-end justify-center z-20 flex"
        style={{
          top: minimap.top + "px",
          left: minimap.left + "px",
          width: minimap.width * 2 + "px",
          height: minimap.height + "px",
        }}
      >
        <div
          className="w-full h-full relative"
          style={skewedStyle ? {
            transform: `perspective(1000px) rotateY(${skewedAmount}deg)`,
            backfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            willChange: "transform",
          } : undefined}
        >
          {/* Main container with retro background */}
          <div className="absolute -bottom-14 w-full flex gap-4 items-center justify-start font-mono">
            {/* Add a decorative border around the whole status UI */}
            <div className="absolute inset-0 border border-white/30 pointer-events-none opacity-50"></div>
            
            {/* Scanlines overlay for the entire UI */}
            <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none"></div>
            
            {/* Health & Armor Section */}
            <div className="flex flex-col w-2/4 items-center justify-center gap-2 p-1 relative">
              {/* Add corner accents for that retro feel */}
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/50"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/50"></div>
              
              <StatBarSegmented 
                Icon={BiSolidShieldAlt2} 
                value={playerState.armor} 
                color={retroColors.armor} 
                label={statusLabels.armor}
              />
              <StatBar 
                Icon={TiHeartFullOutline} 
                value={playerState.health} 
                color={retroColors.health} 
                maxValue={100} 
                label={statusLabels.health}
              />
            </div>
            
            {/* Status Icons Section */}
            {isUsingFramework && (
              <div className="w-2/4 flex gap-3 p-1 relative">
                {/* Add corner accents for that retro feel */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/50"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/50"></div>
                
                {typeof playerState.mic === "boolean" && playerState.mic === true ? (
                  <StatBar 
                    Icon={FaMicrophone} 
                    value={playerState.mic ? 100 : 0} 
                    color={retroColors.mic} 
                    vertical 
                    label={statusLabels.mic}
                  />
                ) : typeof playerState.voice === "number" ? (
                  <StatBar 
                    Icon={FaMicrophone} 
                    value={playerState.voice} 
                    color={retroColors.mic} 
                    vertical 
                    label={statusLabels.mic}
                  />
                ) : null}

                <StatBar 
                  Icon={FaBurger} 
                  value={playerState.hunger} 
                  color={retroColors.hunger} 
                  vertical 
                  label={statusLabels.hunger}
                />
                
                <StatBar 
                  Icon={FaGlassWater} 
                  value={playerState.thirst} 
                  color={retroColors.thirst} 
                  vertical 
                  label={statusLabels.thirst}
                />
                
                {playerState.oxygen < 100 && (
                  <StatBar
                    Icon={FaPersonSwimming}
                    value={playerState.oxygen}
                    color={retroColors.oxygen}
                    vertical
                    label={statusLabels.oxygen}
                  />
                )}
                
                {playerState.stamina < 100 && (
                  <StatBar
                    Icon={FaPersonRunning}
                    value={playerState.stamina}
                    color={retroColors.stamina}
                    vertical
                    label={statusLabels.stamina}
                  />
                )}
                
                {typeof playerState.stress === "number" && playerState.stress > 0 && (
                  <StatBar 
                    Icon={FaBrain} 
                    value={playerState.stress} 
                    color={retroColors.stress} 
                    vertical 
                    label={statusLabels.stress}
                  />
                )}
              </div>
            )}
            
            {/* Add a pixel grid overlay for the entire UI */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20 mix-blend-overlay pointer-events-none"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PlayerStatus);