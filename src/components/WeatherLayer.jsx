import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------------------------------------------------------------------
   WEATHER LAYER
   ----------------------------------------------------------------------
   Purpose:
   - Provides an animated ambient gradient backdrop based on the
     active "weather effect" (sunny, rain, clouds, etc.)
   - Smoothly crossfades between gradients using <AnimatePresence>
   - Uses CSS custom property (--gradient) for dynamic background values
   - Background animates horizontally to create a slow moving glow effect
---------------------------------------------------------------------- */

const WeatherLayer = React.memo(({ effect }) => {
  /* -------------------------------------------------------------------
     GRADIENT PRESETS
     - Each weather effect maps to a unique linear gradient
     - Stored in an object for easy scaling or API-driven updates
  -------------------------------------------------------------------- */
  const gradients = {
    sunny: "linear-gradient(135deg, #FFD93D, #FF6B35)",
    rain: "linear-gradient(135deg, #4A90E2, #1C3F5C)",
    snow: "linear-gradient(135deg, #E0F7FA, #80DEEA)",
    clouds: "linear-gradient(135deg, #B0BEC5, #546E7A)",
    heat: "linear-gradient(135deg, #FF512F, #DD2476)",
    storm: "linear-gradient(135deg, #536976, #292E49)",
  };

  return (
    <>
      {/* -----------------------------------------------------------------
         INLINE ANIMATED BACKDROP STYLES
         - Defines the `.WeatherLayer` class
         - Uses background-size + keyframes for slow gradient panning
         ----------------------------------------------------------------- */}
      <style>{`
        .WeatherLayer {
          background: var(--gradient);
          background-size: 200% 200%;
          animation: gradientPan 20s linear infinite;
        }

        @keyframes gradientPan {
          0%   { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>

      {/* -----------------------------------------------------------------
         GRADIENT TRANSITION WRAPPER
         - AnimatePresence removes old gradient w/ fade-out
         - New gradient fades in with matching timing
         - Ensures seamless crossfades when `effect` changes
         ----------------------------------------------------------------- */}
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
