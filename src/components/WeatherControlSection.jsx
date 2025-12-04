import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MQTT_TOPICS } from "../constants/mqttConfig.js";

/* ---------------------------------------------------------------------
   WEATHER CONTROL SECTION
   ---------------------------------------------------------------------
   Purpose:
   - Allows the user to manually override the “currentWeather”
   - Publishes chosen weather mode to MQTT (LED/weather controller)
   - Automatically resets to Auto mode (-1) after a period of inactivity
------------------------------------------------------------------------ */

export default function WeatherControlSection({
  currentWeather,
  onWeatherChange,
  publish,
}) {
  /* -----------------------------------------------------------
     INACTIVITY AUTO-RESET
     -----------------------------------------------------------
     When the user selects a manual weather override:
     - Start a timer
     - If no new interactions occur for 15 seconds:
         → publish Auto mode ("-1")
         → update UI state to Auto
  ----------------------------------------------------------- */
  const inactivityTimer = useRef(null);
  const INACTIVITY_DELAY = 15000; // 15 seconds

  const resetInactivityTimer = () => {
    // Clear previous scheduled auto-reset
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }

    // Begin new auto-reset countdown
    inactivityTimer.current = setTimeout(() => {
      publish(MQTT_TOPICS.ledWeather, "-1");
      onWeatherChange("-1");
    }, INACTIVITY_DELAY);
  };

  /* -----------------------------------------------------------
     WEATHER OPTIONS (manual override buttons)
     -----------------------------------------------------------
     These represent fixed visual states.
     • NOTE: “Auto mode” exists internally (-1) but is not shown.
  ----------------------------------------------------------- */
  const weatherOptions = [
    {
      id: "0",
      text: "Sunny",
      gradient: "linear-gradient(135deg, #FFC857, #FF9E44)",
    },
    {
      id: "1",
      text: "Rainy",
      gradient: "linear-gradient(135deg, #3A7BD5, #00D2FF)",
    },
    {
      id: "4",
      text: "Chilly",
      gradient: "linear-gradient(135deg, #7F9EB3, #B6D0E2)",
    },
    {
      id: "2",
      text: "Cloudy",
      gradient: "linear-gradient(135deg, #6D7C8A, #A1AAB3)",
    },
    {
      id: "5",
      text: "Hot",
      gradient: "linear-gradient(135deg, #F12711, #F5AF19)",
    },
    {
      id: "3",
      text: "Stormy",
      gradient: "linear-gradient(135deg, #232526, #414345)",
    },
  ];

  // Find active button location for sliding highlight
  const activeIndex = weatherOptions.findIndex((w) => w.id === currentWeather);

  /* -----------------------------------------------------------
     RENDER
     -----------------------------------------------------------
     Layout:
     • Title + description
     • Interactive sliding-pill selector
     • Animated highlight that follows selected weather
  ----------------------------------------------------------- */
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
      {/* Section Header */}
      <div className="mb-5">
        <p className="text-gray-900/90 font-semibold tracking-wide text-sm font-bold">
          Weather Override
        </p>
        <p className="text-xs text-gray-600/80 leading-relaxed mt-1">
          Select weather conditions manually or use automatic detection.
        </p>
      </div>

      {/* Pill container for weather buttons */}
      <div
        className="
          relative flex rounded-full p-2 h-14
          bg-white/40 backdrop-blur-xl border border-white/50
          shadow-inner overflow-hidden
        "
      >
        {/* Animated sliding highlight under the active weather */}
        <AnimatePresence>
          {activeIndex !== -1 && (
            <motion.div
              key="highlight-pill"
              layout
              className="absolute top-2 bottom-2 rounded-full z-0"
              style={{
                width: `${100 / weatherOptions.length}%`,
                left: `${(100 / weatherOptions.length) * activeIndex}%`,
                background: weatherOptions[activeIndex]?.gradient,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                filter: "blur(6px)",
                transition: { duration: 0.35, ease: "easeOut" },
              }}
            />
          )}
        </AnimatePresence>

        {/* Individual Weather Buttons */}
        {weatherOptions.map((weather) => {
          const isActive = weather.id === currentWeather;

          return (
            <motion.button
              key={weather.id}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                // Update UI + publish to device
                onWeatherChange(weather.id);
                console.log(
                  "[MQTT → Publish]",
                  MQTT_TOPICS.ledWeather,
                  weather.id
                );
                publish(MQTT_TOPICS.ledWeather, weather.id);

                // Restart the inactivity timer
                resetInactivityTimer();
              }}
              className="
                relative z-10 flex-1 flex items-center justify-center
                px-2
              "
            >
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
