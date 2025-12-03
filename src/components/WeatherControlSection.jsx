import { motion } from "framer-motion";
import { MQTT_TOPICS } from "../constants/mqttConfig.js";

/* ==========================================================
   Weather Control Section (Option A: Ultra-Light Animations)
   - Sliding selector pill
   - Only active weather icon subtly animates
   - Zero layout thrashing, transform-only animations
========================================================== */

export default function WeatherControlSection({
  currentWeather,
  onWeatherChange,
  publish,
}) {
  const weatherOptions = [
    {
      id: "sunny",
      text: "Sunny",
      gradient: "linear-gradient(135deg, #FFC857, #FF9E44)",
    },
    {
      id: "rain",
      text: "Rainy",
      gradient: "linear-gradient(135deg, #3A7BD5, #00D2FF)",
    },
    {
      id: "snow",
      text: "Chilly",
      gradient: "linear-gradient(135deg, #7F9EB3, #B6D0E2)",
    },
    {
      id: "clouds",
      text: "Cloudy",
      gradient: "linear-gradient(135deg, #6D7C8A, #A1AAB3)",
    },
    {
      id: "hot",
      text: "Hot",
      gradient: "linear-gradient(135deg, #F12711, #F5AF19)",
    },
    {
      id: "storm",
      text: "Stormy",
      gradient: "linear-gradient(135deg, #232526, #414345)",
    },
  ];

  const activeIndex = weatherOptions.findIndex((w) => w.id === currentWeather);

  return (
    <motion.div
      whileHover={{ scale: 1.015 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="
        relative rounded-2xl p-6 mt-8
        bg-white/30 backdrop-blur-2xl
        border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="mb-5">
        <p className="text-gray-900/90 font-semibold tracking-wide text-sm font-bold">
          Weather Override
        </p>
        <p className="text-xs text-gray-600/80 leading-relaxed mt-1">
          Select weather conditions manually or use automatic detection.
        </p>
      </div>

      {/* Outer pill */}
      <div
        className="
          relative flex rounded-full p-2 h-14
          bg-white/40 backdrop-blur-xl border border-white/50
          shadow-inner overflow-hidden
        "
      >
        {/* Highlight pill */}
        <motion.div
          layout
          className="absolute top-2 bottom-2 rounded-full z-0"
          style={{
            width: `${100 / weatherOptions.length}%`,
            left: `${(100 / weatherOptions.length) * activeIndex}%`,
            background: weatherOptions[activeIndex]?.gradient,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 18 }}
        />

        {/* Weather Buttons */}
        {weatherOptions.map((weather) => {
          const isActive = weather.id === currentWeather;

          return (
            <motion.button
              key={weather.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                onWeatherChange(weather.id);
                publish(MQTT_TOPICS.ledWeather, weather.id);
              }}
              className="
                relative z-10 flex-1 flex items-center justify-center
                px-2
              "
            >
              {/* Label only – centered, larger, crisp */}
              <span
                className={`
                  text-sm font-semibold tracking-wide
                  transition-colors duration-200
                  ${
                    isActive
                      ? "text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
                      : "text-gray-700"
                  }
                `}
              >
                {weather.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
