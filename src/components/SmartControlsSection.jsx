import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import ThreeLevelPillSlider from "./ThreeLevelPillSlider.jsx";
import TwoLevelPillSlider from "./TwoLevelPillSlider.jsx";
import WeatherControlSection from "./WeatherControlSection.jsx";
import { MQTT_TOPICS } from "../constants/mqttConfig.js";

export default function SmartControlsSection({
  brightness,
  setBrightness,
  speed,
  setSpeed,
  servoValue,
  setServoValue,
  servoSpeed,
  setServoSpeed,
  currentWeather,
  setCurrentWeather,
  publish,
}) {
  // Predefined discrete levels
  const brightnessLevels = [50, 128, 255];
  const speedLevels = [100, 50, 20]; // LED animation speed
  const servoSpeedLevels = [20, 50, 80]; // Servo speed mapping (low → high)

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
      {/* SECTION HEADER */}
      <SectionHeader
        title="Smart Controls"
        subtitle="Interact with connected systems and adjust environmental responses"
        icon={<span className="text-6xl cursor-pointer">🎛️</span>}
      />

      {/* SLIDERS GRID */}
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

        {/* Servo Position */}
        <TwoLevelPillSlider
          label="Servo Position"
          description="Toggle between 0° and 90° positions"
          value={servoValue}
          onChange={(i) => {
            setServoValue(i);
            publish(MQTT_TOPICS.servoPostion, i === 0 ? 0 : 90);
          }}
          colors={{ active: "linear-gradient(135deg, #6dd5ed, #2193b0)" }}
        />

        {/* Servo Speed */}
        <ThreeLevelPillSlider
          label="Servo Speed"
          description="Adjusts the speed of the servo movement"
          value={servoSpeed}
          onChange={(i) => {
            setServoSpeed(i);
            publish(MQTT_TOPICS.servoSpeed, servoSpeedLevels[i]);
          }}
          colors={{ active: "linear-gradient(135deg, #ffbb55, #ff8855)" }}
        />
      </div>

      {/* WEATHER CONTROL */}
      <WeatherControlSection
        currentWeather={currentWeather}
        onWeatherChange={setCurrentWeather}
        publish={publish}
      />
    </motion.div>
  );
}
