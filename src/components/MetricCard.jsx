import React, { useEffect } from "react";
import { normalize, getStatusColor } from "../utils/weatherUtils.js";

const MetricCard = React.memo(function MetricCard({
  label,
  value,
  unit,
  Icon,
  min,
  max,
  description,
  openKey,
  setOpenKey,
  metricKey,
}) {
  const ref = React.useRef(null);

  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenKey(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpenKey]);

  const isOpen = openKey === metricKey;

  const isBottomMetric = [
    "lux",
    "rain",
    "wind",
    "dir",
    "heat",
    "dew",
    "abs",
  ].includes(metricKey);

  const arcPercent = normalize(value, min, max);
  const arcColor = getStatusColor(arcPercent);

  const gradient = {
    temp: "from-red-500 to-pink-400", // Warm reds/pinks for temperature
    hum: "from-blue-400 to-indigo-600", // Cool blues for humidity
    pres: "from-yellow-400 to-amber-500", // Sunny yellows for pressure
    heat: "from-orange-500 to-red-600", // Hot gradient for heat index
    dew: "from-teal-400 to-cyan-500", // Fresh/greenish-teal for dew point
    wind: "from-purple-400 to-indigo-500", // Light purple for wind
    rain: "from-sky-400 to-blue-500", // Sky blue for rain
    lux: "from-amber-300 to-yellow-400", // Bright yellow for light
    dir: "from-pink-400 to-fuchsia-500", // Vibrant pinks for direction
    abs: "from-gray-400 to-gray-600", // Neutral gray for absolute values
    default: "from-gray-500 to-gray-700", // Fallback
  };

  const bgGradient = gradient[metricKey] || gradient.default;

  return (
    <div
      ref={ref}
      className="
        relative bg-white rounded-xl shadow-md p-5
        flex items-center gap-4 min-h-[88px]
        transition-shadow duration-200 hover:shadow-xl cursor-pointer
      "
      onMouseEnter={() => !isTouch && setOpenKey(metricKey)}
      onMouseLeave={() => !isTouch && setOpenKey(null)}
      onClick={() => isTouch && setOpenKey(isOpen ? null : metricKey)}
    >
      {/* ICON BOX */}
      <div
        className={`rounded-md p-3 bg-gradient-to-tr shadow flex items-center justify-center ${bgGradient}`}
      >
        {typeof Icon === "string" ? (
          <span className="text-white text-2xl">{Icon}</span>
        ) : (
          <Icon className="w-8 h-8 text-white" />
        )}
      </div>

      {/* LABEL + VALUE */}
      <div className="flex-1">
        <div className="text-sm text-gray-600 font-medium">{label}</div>
        <div className="text-2xl font-bold text-gray-900">
          {value}
          {unit && unit}
        </div>
      </div>

      {/* POPOVER */}
      {isOpen && (
        <div
          className={`
            absolute w-56 z-20 bg-white/80 backdrop-blur-xl
            border border-white/30 rounded-xl p-4
            text-sm text-gray-800 shadow-lg
            animate-fadeInScale transition-all duration-200 ease-out
            ${
              isBottomMetric
                ? "right-4 bottom-full mb-3"
                : "right-4 top-full mt-3"
            }
          `}
        >
          {description}
        </div>
      )}

      {/* ARC INDICATOR */}
      {metricKey !== "dir" && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
          <svg width="52" height="52">
            <circle
              cx="26"
              cy="26"
              r="22"
              strokeWidth="6"
              stroke={arcColor}
              strokeDasharray={`${arcPercent * 138} 138`}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 26 26)"
            />
          </svg>
        </div>
      )}
    </div>
  );
});

export default MetricCard;
