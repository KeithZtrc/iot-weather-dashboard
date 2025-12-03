import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";

export default function ManualSimulationSection({
  temperature,
  setTemperature,
  humidity,
  setHumidity,
  pressure,
  setPressure,
  weather,
}) {
  const handleGenerateValues = () => {
    const newTemp = +(20 + Math.random() * 15).toFixed(1);
    const newHum = Math.round(40 + Math.random() * 60);
    const newPres = +(100 + Math.random() * 5).toFixed(1);

    setTemperature(newTemp);
    setHumidity(newHum);
    setPressure(newPres);
  };

  /* -----------------------------------------------------------
     Color guides based on value ranges
     Reflects real-world weather impact
  ----------------------------------------------------------- */
  const getTempColor = () => {
    if (temperature < 0) return "from-blue-600 to-cyan-500";
    if (temperature < 10) return "from-blue-500 to-cyan-400";
    if (temperature < 20) return "from-cyan-400 to-green-400";
    if (temperature < 25) return "from-green-400 to-yellow-400";
    if (temperature < 30) return "from-yellow-400 to-orange-400";
    return "from-orange-500 to-red-600";
  };

  const getHumidityColor = () => {
    if (humidity < 20) return "from-orange-500 to-red-500";
    if (humidity < 40) return "from-yellow-400 to-orange-400";
    if (humidity < 60) return "from-green-400 to-blue-400";
    if (humidity < 80) return "from-blue-400 to-cyan-400";
    return "from-cyan-500 to-purple-500";
  };

  const getPressureColor = () => {
    if (pressure < 100) return "from-red-500 to-orange-500";
    if (pressure < 101) return "from-orange-400 to-yellow-400";
    if (pressure < 102) return "from-green-400 to-cyan-400";
    if (pressure < 103) return "from-cyan-400 to-blue-400";
    return "from-blue-500 to-purple-500";
  };

  const getTempLabel = () => {
    if (temperature < 0) return "Freezing";
    if (temperature < 10) return "Cold";
    if (temperature < 20) return "Cool";
    if (temperature < 25) return "Mild";
    if (temperature < 30) return "Warm";
    return "Hot";
  };

  const getHumidityLabel = () => {
    if (humidity < 20) return "Very Dry";
    if (humidity < 40) return "Dry";
    if (humidity < 60) return "Comfortable";
    if (humidity < 80) return "Humid";
    return "Very Humid";
  };

  const getPressureLabel = () => {
    if (pressure < 100) return "Low (Storm)";
    if (pressure < 101) return "Low";
    if (pressure < 102) return "Normal";
    if (pressure < 103) return "High";
    return "Very High";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        max-w-7xl mx-auto rounded-3xl p-8
        bg-white/30 backdrop-blur-2xl
        border border-white/30 shadow-lg overflow-hidden mb-10
      "
    >
      <SectionHeader
        title="Manual Simulation Control"
        subtitle="Adjust sensor values to test different atmospheric conditions in real-time"
        icon={<span className="text-6xl cursor-pointer">🎮</span>}
      />

      {/* Current Values Display with Color Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            rounded-2xl p-6
            bg-gradient-to-br ${getTempColor()}
            backdrop-blur-xl border border-white/30 shadow-lg
            text-white
          `}
        >
          <p className="text-sm font-semibold text-white/80 mb-2">
            Temperature
          </p>
          <p className="text-5xl font-bold">{temperature}°C</p>
          <p className="text-xs text-white/70 mt-2">{getTempLabel()}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            rounded-2xl p-6
            bg-gradient-to-br ${getHumidityColor()}
            backdrop-blur-xl border border-white/30 shadow-lg
            text-white
          `}
        >
          <p className="text-sm font-semibold text-white/80 mb-2">Humidity</p>
          <p className="text-5xl font-bold">{humidity}%</p>
          <p className="text-xs text-white/70 mt-2">{getHumidityLabel()}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`
            rounded-2xl p-6
            bg-gradient-to-br ${getPressureColor()}
            backdrop-blur-xl border border-white/30 shadow-lg
            text-white
          `}
        >
          <p className="text-sm font-semibold text-white/80 mb-2">Pressure</p>
          <p className="text-5xl font-bold">{pressure}</p>
          <p className="text-xs text-white/70 mt-2">{getPressureLabel()}</p>
        </motion.div>
      </div>

      {/* Large Sliders */}
      {/* Large Sliders - Maximized Layout */}
      <div className="space-y-12 mb-12">
        {/* Temperature Slider */}
        <div className="rounded-2xl p-10 bg-white/20 backdrop-blur-xl border border-white/30">
          <div className="flex justify-between items-end mb-6">
            <div>
              <label className="text-lg font-bold text-gray-800 block mb-2">
                Temperature
              </label>
              <p className="text-sm text-gray-600">0°C to 50°C</p>
            </div>
            <span className="text-4xl font-bold text-gray-900">
              {temperature}°C
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg appearance-none cursor-pointer"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
          <style>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
              border: 2px solid #1f2937;
              transition: transform 0.2s;
            }
            input[type='range']::-webkit-slider-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            input[type='range']::-moz-range-thumb {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
              border: 2px solid #1f2937;
              transition: transform 0.2s;
            }
            input[type='range']::-moz-range-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
          `}</style>
          <div className="flex justify-between text-sm text-gray-600 mt-3 px-2 font-medium">
            <span>0°C</span>
            <span>25°C</span>
            <span>50°C</span>
          </div>
        </div>

        {/* Humidity Slider */}
        <div className="rounded-2xl p-10 bg-white/20 backdrop-blur-xl border border-white/30">
          <div className="flex justify-between items-end mb-6">
            <div>
              <label className="text-lg font-bold text-gray-800 block mb-2">
                Humidity
              </label>
              <p className="text-sm text-gray-600">0% to 100%</p>
            </div>
            <span className="text-4xl font-bold text-gray-900">
              {humidity}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={humidity}
            onChange={(e) => setHumidity(parseInt(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg appearance-none cursor-pointer"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
          <style>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
              border: 2px solid #1f2937;
              transition: transform 0.2s;
            }
            input[type='range']::-webkit-slider-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            input[type='range']::-moz-range-thumb {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
              border: 2px solid #1f2937;
              transition: transform 0.2s;
            }
            input[type='range']::-moz-range-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
          `}</style>
          <div className="flex justify-between text-sm text-gray-600 mt-3 px-2 font-medium">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Pressure Slider */}
        <div className="rounded-2xl p-10 bg-white/20 backdrop-blur-xl border border-white/30">
          <div className="flex justify-between items-end mb-6">
            <div>
              <label className="text-lg font-bold text-gray-800 block mb-2">
                Pressure
              </label>
              <p className="text-sm text-gray-600">95 kPa to 110 kPa</p>
            </div>
            <span className="text-4xl font-bold text-gray-900">{pressure}</span>
          </div>
          <input
            type="range"
            min="95"
            max="110"
            step="0.1"
            value={pressure}
            onChange={(e) => setPressure(parseFloat(e.target.value))}
            className="w-full h-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg appearance-none cursor-pointer"
            style={{
              WebkitAppearance: "none",
              appearance: "none",
            }}
          />
          <style>{`
            input[type='range']::-webkit-slider-thumb {
              appearance: none;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
              border: 2px solid #1f2937;
              transition: transform 0.2s;
            }
            input[type='range']::-webkit-slider-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
            input[type='range']::-moz-range-thumb {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: white;
              cursor: pointer;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
              border: 2px solid #1f2937;
              transition: transform 0.2s;
            }
            input[type='range']::-moz-range-thumb:hover {
              transform: scale(1.15);
              box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
            }
          `}</style>
          <div className="flex justify-between text-sm text-gray-600 mt-3 px-2 font-medium">
            <span>95 kPa</span>
            <span>102.5 kPa</span>
            <span>110 kPa</span>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <motion.button
        onClick={handleGenerateValues}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        className="
          w-full px-8 py-4
          bg-gradient-to-r from-slate-700 to-slate-900
          text-white font-bold text-lg rounded-2xl
          shadow-lg hover:shadow-xl transition-all duration-200
          border border-white/10
        "
      >
        Generate Random Values
      </motion.button>
    </motion.div>
  );
}
