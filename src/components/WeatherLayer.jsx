import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ==========================================================
   WeatherLayer
   - Visual ambient gradient layer behind UI components
   - Fades smoothly when the weather "effect" changes
   - Uses CSS custom properties for dynamic gradients
========================================================== */

const WeatherLayer = React.memo(({ effect }) => {
  // Weather-based gradient presets
  const gradients = {
    sunny: "linear-gradient(135deg, #FFD93D, #FF6B35)",
    // #fddb92, #d1fdff
    rain: "linear-gradient(135deg, #4A90E2, #1C3F5C)",
    snow: "linear-gradient(135deg, #E0F7FA, #80DEEA)",
    clouds: "linear-gradient(135deg, #B0BEC5, #546E7A)",
    // #89f7fe, #66a6ff
    heat: "linear-gradient(135deg, #FF512F, #DD2476)",
    storm: "linear-gradient(135deg, #536976, #292E49)",
  };

  return (
    <>
      {/* ------------------------------------------------------
          Inline CSS block
          - Defines the animated backdrop class
          - Gradient pans horizontally over time
      ------------------------------------------------------- */}
      <style>{`
        .WeatherLayer {
          background: var(--gradient);
          background-size: 200% 200%;
          animation: gradientPan 20s linear infinite;
        }

        @keyframes gradientPan {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      {/* ------------------------------------------------------
          Animated presence
          - Smooth fade between gradient layers when "effect" changes
      ------------------------------------------------------- */}
      <AnimatePresence>
        {effect && (
          <motion.div
            key={effect}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-0 WeatherLayer"
            style={{ "--gradient": gradients[effect] }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

export default WeatherLayer;
