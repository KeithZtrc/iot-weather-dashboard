import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import ThreeLevelPillSlider from "./ThreeLevelPillSlider.jsx";
import WeatherControlSection from "./WeatherControlSection.jsx";
import { MQTT_TOPICS } from "../constants/mqttConfig.js";

/* ---------------------------------------------------------------------
   SMART CONTROLS — INTERNAL WRAPPER (Placeholder)
   ----------------------------------------------------------------------
   Purpose:
   - Reserved for future “auto intelligence” control logic
   - Currently not used but structurally preserved for expansion
---------------------------------------------------------------------- */

export function SmartControls({
  brightness,
  speed,
  onBrightnessChange,
  onSpeedChange,
  onPublish,
  brightnessLevels,
  speedLevels,
}) {
  return (
    <div className="smart-controls">
      <h3>Smart Controls</h3>
      {/* Future smart logic will be implemented here */}
    </div>
  );
}

/* ---------------------------------------------------------------------
   SMART CONTROLS SECTION
   ----------------------------------------------------------------------
   Purpose:
   - Provides UI to adjust smart-device parameters:
       • LED brightness (3-step)
       • Animation speed (3-step)
       • Weather mode (Sunny, Rainy, Foggy, etc.)
   - Publishes changes via MQTT to the ESP32
   - Wrapped in a glassy, animated section container
---------------------------------------------------------------------- */

export default function SmartControlsSection({
  brightness,
  setBrightness,
  speed,
  setSpeed,
  currentWeather,
  setCurrentWeather,
  publish,
}) {
  // Predefined discrete levels used by sliders
  const brightnessLevels = [50, 128, 255];
  const speedLevels = [100, 50, 20];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        max-w-7xl mx-auto rounded-3xl p-8 mb-10
        bg-white/30 backdrop-blur-2xl
        border border-white/30 shadow-lg overflow-hidden
      "
    >
      {/* -----------------------------------------------------------------
         SECTION HEADER — Title, subtitle, and icon
         ----------------------------------------------------------------- */}
      <SectionHeader
        title="Smart Controls"
        subtitle="Interact with connected systems and adjust environmental responses"
        icon={<span className="text-6xl cursor-pointer">🎛️</span>}
      />

      {/* -----------------------------------------------------------------
         SLIDERS — Brightness + Animation Speed
         -----------------------------------------------------------------
         • Both use a three-level pill-style selector
         • Immediately publish MQTT packets on user interaction
         ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Brightness control */}
        <ThreeLevelPillSlider
          label="Brightness"
          description="Controls overall luminosity of the LED matrix."
          value={brightness}
          onChange={(i) => {
            setBrightness(i);
            publish(MQTT_TOPICS.ledBrightness, brightnessLevels[i]);
          }}
          colors={{ active: "linear-gradient(135deg, #ffbb55, #ff8855)" }}
        />

        {/* Animation speed control */}
        <ThreeLevelPillSlider
          label="Animation Speed"
          description="Adjusts the tempo at which LED animations play."
          value={speed}
          onChange={(i) => {
            setSpeed(i);
            publish(MQTT_TOPICS.ledSpeed, speedLevels[i]);
          }}
          colors={{ active: "linear-gradient(135deg, #4f8ef7, #3ac0f8)" }}
        />
      </div>

      {/* -----------------------------------------------------------------
         WEATHER MODE CONTROL — Sets simulated conditions on ESP32
         -----------------------------------------------------------------
         • Sunny, Rainy, Stormy, Clear, Mist, etc.
         • Not slider-based; uses pill buttons / icons
         • Also publishes via MQTT
         ----------------------------------------------------------------- */}
      <WeatherControlSection
        currentWeather={currentWeather}
        onWeatherChange={setCurrentWeather}
        publish={publish}
      />
    </motion.div>
  );
}
