import * as Slider from "@radix-ui/react-slider";
import { motion } from "framer-motion";

/* ---------------------------------------------------------------------
   PREMIUM SLIDER
   ----------------------------------------------------------------------
   Purpose:
   - High-end glassmorphic slider component using:
       • Radix Slider (for accessibility + logic)
       • Framer Motion (for hover/tap animations)
   - Suitable for controlling:
       • Temperature targets
       • Fan power
       • Light intensity
       • Any continuous numeric value
   - Features:
       • Numeric value display with unit
       • Custom gradient applied to filled track
       • Smooth animated thumb
---------------------------------------------------------------------- */

export default function PremiumSlider({
  label,
  sublabel,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  gradientClass, // Tailwind gradient utility applied to the filled portion
}) {
  return (
    <div
      className="
        rounded-2xl p-10
        bg-white/20 backdrop-blur-xl
        border border-white/30
        transition-transform duration-300
        hover:-translate-y-1 hover:shadow-xl
        cursor-pointer
      "
    >
      {/* -----------------------------------------------------------------
         HEADER
         - Label + sublabel
         - Right side shows the live numeric value
         ----------------------------------------------------------------- */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <label className="text-lg font-bold text-gray-800 block mb-2">
            {label}
          </label>
          <p className="text-sm text-gray-600">{sublabel}</p>
        </div>

        {/* Current selected value */}
        <span className="text-4xl font-bold text-gray-900">
          {value.toFixed(1)}
          {unit}
        </span>
      </div>

      {/* -----------------------------------------------------------------
         SLIDER CORE (Radix UI)
         - Root → Track → Range → Thumb
         - While Radix handles logic, we wrap the thumb with Motion
         ----------------------------------------------------------------- */}
      <Slider.Root
        className="relative flex items-center w-full h-8 select-none"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      >
        {/* Full track background */}
        <Slider.Track
          className="
            relative w-full h-3 rounded-lg
            bg-gray-300 overflow-hidden
          "
        >
          {/* Filled track (range) using parent-provided gradient */}
          <Slider.Range
            className={`
              absolute h-full rounded-lg
              bg-gradient-to-r ${gradientClass}
            `}
          />
        </Slider.Track>

        {/* Draggable thumb (Motion-enhanced for animations) */}
        <Slider.Thumb asChild>
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="
              w-[28px] h-[28px] rounded-full
              bg-white shadow-lg cursor-pointer
              transition-all
            "
          />
        </Slider.Thumb>
      </Slider.Root>

      {/* -----------------------------------------------------------------
         VALUE MARKERS (MIN / MIDPOINT / MAX)
         ----------------------------------------------------------------- */}
      <div className="flex justify-between text-sm text-gray-600 mt-3 px-2 font-medium">
        <span>
          {min}
          {unit}
        </span>
        <span>
          {((min + max) / 2).toFixed(1)}
          {unit}
        </span>
        <span>
          {max}
          {unit}
        </span>
      </div>
    </div>
  );
}
