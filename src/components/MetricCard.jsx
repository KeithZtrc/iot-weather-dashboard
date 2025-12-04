import React, { useEffect } from "react";
import { normalize, getStatusColor } from "../utils/weatherUtils.js";

/* ---------------------------------------------------------------------
   METRIC CARD COMPONENT
   ----------------------------------------------------------------------
   Purpose:
   - Displays one metric (temp, humidity, pressure, heat index, etc.)
   - Includes:
       • Icon + label + formatted value
       • Animated arc indicator showing value between min/max
       • Hover/click popover with extended explanation
   - Memoized to prevent unnecessary re-renders
---------------------------------------------------------------------- */

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

  /* -------------------------------------------------------------------
     DETECT TOUCH DEVICE
     - Touch devices don't have hover interaction → use click-only popovers
  -------------------------------------------------------------------- */
  const isTouch =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  /* -------------------------------------------------------------------
     CLOSE POPOVER WHEN CLICKING OUTSIDE THE CARD
     - Active only when the popover is open
     - Improves UX for touch and desktop
  -------------------------------------------------------------------- */
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenKey(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [setOpenKey]);

  // Whether this card’s popover is open
  const isOpen = openKey === metricKey;

  // Determines whether the popover is positioned above or below the card
  const isBottomMetric = ["heat", "dew", "abs"].includes(metricKey);

  /* -------------------------------------------------------------------
     ARC INDICATOR COMPUTATION
     - normalize(value, min, max) → 0..1
     - getStatusColor(percent) → color theme based on threshold
  -------------------------------------------------------------------- */
  const arcPercent = normalize(value, min, max);
  const arcColor = getStatusColor(arcPercent);

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
      {/* -----------------------------------------------------------------
         ICON BOX — Color theme depends on metricKey
         ----------------------------------------------------------------- */}
      <div
        className={`
          rounded-md p-3 bg-gradient-to-tr shadow
          ${
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
          }
        `}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* -----------------------------------------------------------------
         LABEL + VALUE DISPLAY
         ----------------------------------------------------------------- */}
      <div className="flex-1">
        <div className="text-sm text-gray-600 font-medium">{label}</div>

        <div className="text-2xl font-bold text-gray-900">
          {value}
          {unit && unit}
        </div>
      </div>

      {/* -----------------------------------------------------------------
         POPOVER — Extended explanation of this metric
         Appears above/below depending on metric grouping
         ----------------------------------------------------------------- */}
      {isOpen && (
        <div
          className={`
            absolute w-56 z-20 bg-white/60 backdrop-blur-xl
            border border-white/40 rounded-xl p-4
            text-sm text-gray-800 shadow-[0_8px_30px_rgb(0_0_0/0.12)]
            animate-fadeInScale transition-all duration-200 ease-out
            hover:bg-white/70 hover:shadow-[0_12px_35px_rgb(0_0_0/0.16)]
            ${
              isBottomMetric
                ? "right-4 bottom-full mb-3" // Popover above card
                : "right-4 top-full mt-3" // Popover below card
            }
          `}
        >
          {description}
        </div>
      )}

      {/* -----------------------------------------------------------------
         ARC INDICATOR — Circular progress-like value visualization
         ----------------------------------------------------------------- */}
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
            style={{
              transition:
                "stroke-dasharray 0.6s ease-out, stroke 0.3s ease-out",
            }}
          />
        </svg>
      </div>
    </div>
  );
});

export default MetricCard;
