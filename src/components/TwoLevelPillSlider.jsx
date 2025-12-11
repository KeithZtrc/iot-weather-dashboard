import { motion } from "framer-motion";

/* ---------------------------------------------------------------------
   TWO-LEVEL PILL SLIDER
   ----------------------------------------------------------------------
   Purpose:
   - Provides a simple 2-step selector (Off → On)
   - Ideal for your servo (0° / 90°)
   - Visually consistent with ThreeLevelPillSlider
---------------------------------------------------------------------- */

export default function TwoLevelPillSlider({
  label,
  description,
  value, // 0 or 1
  onChange,
  colors = {},
  steps = ["Off", "On"], // Default labels
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="
        relative rounded-2xl p-6
        bg-white/30 backdrop-blur-2xl
        border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        overflow-hidden
      "
    >
      {/* Floating glows (same style as ThreeLevelPillSlider) */}
      <motion.div
        animate={{ x: [0, 6, -6, 0], y: [0, -5, 4, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-teal-400/20 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -4, 4, 0], y: [0, 4, -3, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 rounded-full bg-blue-300/20 blur-2xl"
      />

      {/* Label + description */}
      <div className="mb-5">
        <p className="text-gray-900/90 font-semibold tracking-wide text-sm">
          {label}
        </p>
        {description && (
          <p className="text-xs text-gray-600/80 leading-relaxed mt-1">
            {description}
          </p>
        )}
      </div>

      {/* Pill track */}
      <div className="relative flex rounded-full p-2 h-14 bg-white/40 backdrop-blur-xl border border-white/50 shadow-inner">
        {/* Animated selection indicator */}
        <motion.div
          layout
          className="absolute top-2 bottom-2 rounded-full"
          style={{
            left: `${value * 50}%`, // Two steps → 0% or 50%
            width: "50%",
            background: colors.active,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        />

        {/* Buttons */}
        {steps.map((step, i) => (
          <motion.button
            key={step}
            onClick={() => onChange(i)}
            whileTap={{ scale: 0.92 }}
            className={`
              z-10 flex-1 flex items-center justify-center
              font-semibold text-sm tracking-wide
              transition-colors duration-200
              ${
                value === i
                  ? "text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
                  : "text-gray-700 hover:text-gray-900"
              }
            `}
          >
            {step}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
