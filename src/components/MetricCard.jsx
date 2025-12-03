import React, { useEffect } from "react";
import { normalize, getStatusColor } from "../utils/weatherUtils.js";

/**
 * MetricCard Component
 *
 * Displays a single weather metric (temp, humidity, pressure, etc.).
 * Includes:
 *  - Icon, label, and value
 *  - Arc indicator visualizing min→max
 *  - Hover/click popover with extended description
 *
 * Memoized to avoid unnecessary re-renders.
 */
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

  // Detect if the device is touch-capable (no hover interactions).
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  /**
   * Close popover when clicking outside the component.
   * Runs only when the popover is open — improves UX.
   */
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenKey(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpenKey]);

  // Popover state for this card
  const isOpen = openKey === metricKey;

  // Determines whether the popover should appear above or below the card
  const isBottomMetric = ["heat", "dew", "abs"].includes(metricKey);

  /**
   * Compute arc visual indicator:
   * - normalize() converts value → 0..1 range
   * - getStatusColor() gives color based on % threshold
   */
  const arcPercent = normalize(value, min, max);
  const arcColor = getStatusColor(arcPercent);

  return (
    <div
      ref={ref}
      className="relative bg-white rounded-xl shadow-md p-5 flex items-center gap-4 min-h-[88px]
                 transition-shadow duration-200 hover:shadow-xl cursor-pointer"
      onMouseEnter={() => !isTouch && setOpenKey(metricKey)}
      onMouseLeave={() => !isTouch && setOpenKey(null)}
    >
      {/* =========================
          METRIC ICON (with color theme depending on metric type)
         ========================= */}
      <div
        className={`rounded-md p-3 bg-gradient-to-tr ${
          metricKey === "temp"
            ? "from-red-500 to-orange-300"
            : metricKey === "hum"
            ? "from-sky-400 to-blue-600"
            : metricKey === "pres"
            ? "from-yellow-300 to-yellow-500"
            : metricKey === "heat"
            ? "from-red-600 to-orange-500"
            : metricKey === "dew"
            ? "from-teal-400 to-emerald-500"
            : "from-gray-500 to-gray-700"
        } shadow`}
      >
        <div className="text-white">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* =========================
          LABEL and METRIC VALUE
         ========================= */}
      <div className="flex-1">
        <div className="text-sm text-gray-600 font-medium flex items-center justify-between">
          <span>{label}</span>
        </div>

        <div className="text-2xl font-bold text-gray-900">
          {value}
          {unit && unit}
        </div>
      </div>

      {/* =========================
          POPOVER: Extended description
          Appears above/below card depending on metric type.
         ========================= */}
      {isOpen && (
        <div
          className={`absolute w-56 z-20 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-4
                      shadow-[0_8px_30px_rgb(0_0_0/0.12)] text-sm text-gray-800 cursor-pointer
                      animate-fadeInScale transition-all duration-200 ease-out
                      hover:bg-white/70 hover:shadow-[0_12px_35px_rgb(0_0_0/0.16)]
                      ${
                        isBottomMetric
                          ? "right-4 bottom-full mb-3" // Popover above card
                          : "right-4 top-full mt-3" // Popover below card
                      }`}
        >
          {description}
        </div>
      )}

      {/* =========================
          ARC INDICATOR
          Visualization of value vs. min/max
         ========================= */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <svg width="52" height="52">
          <circle
            cx="26"
            cy="26"
            r="22"
            strokeWidth="6"
            stroke={arcColor}
            strokeDasharray={`${arcPercent * 138} 138`} // 138 ≈ circumference
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 26 26)" // start arc at top instead of right
          />
        </svg>
      </div>
    </div>
  );
});

export default MetricCard;
