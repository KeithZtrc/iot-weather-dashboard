import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import ThreeLevelPillSlider from "./ThreeLevelPillSlider.jsx";
import { MQTT_TOPICS } from "../constants/mqttConfig.js";

/* ================================
   Smart Controls — Internal Wrapper
   (simple placeholder, future-expandable)
================================ */
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
      {/* Future controls can be added here */}
    </div>
  );
}

/* ================================
   Smart Controls Section
   Controls for LED brightness + animation speed
================================ */
export default function SmartControlsSection({
  brightness,
  setBrightness,
  speed,
  setSpeed,
  publish,
}) {
  const brightnessLevels = [50, 128, 255];
  const speedLevels = [100, 50, 20];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        max-w-7xl mx-auto rounded-2xl px-6 py-8
        bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10
        relative overflow-hidden
      "
    >
      {/* Soft floating glow (transform-only animation for performance) */}
      <motion.div
        animate={{ x: [0, 10, -10, 0], y: [0, -8, 6, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl"
      />

      {/* Section Header */}
      <SectionHeader
        title="Smart Controls"
        subtitle="Interact with connected systems and adjust environmental responses"
        icon={<span className="text-6xl cursor-pointer">🎛️</span>}
      />

      {/* ============================
          2-Column Control Grid
      ============================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {/* Brightness Control */}
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

        {/* Animation Speed Control */}
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
    </motion.div>
  );
}
