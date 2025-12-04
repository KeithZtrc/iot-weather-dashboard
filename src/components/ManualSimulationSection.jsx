import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import PremiumSlider from "./Slider.jsx";

/* ---------------------------------------------------------------------
   MANUAL SIMULATION CONTROL SECTION
   ---------------------------------------------------------------------
   Purpose:
   - Allows users to manually manipulate temperature, humidity, and pressure
     to test how the system responds to custom conditions.
   - Provides:
       ✓ Summary stat cards with color-coded gradients
       ✓ Three premium sliders (Temp / Humidity / Pressure)
       ✓ Random generator button for testing
   - Used only in: "manual-simulation" mode
------------------------------------------------------------------------ */

export default function ManualSimulationSection({
  temperature,
  setTemperature,
  humidity,
  setHumidity,
  pressure,
  setPressure,
  weather, // Currently unused, but may support contextual UI later
}) {
  /* -----------------------------------------------------------
     RANDOM VALUE GENERATOR
     -----------------------------------------------------------
     Used for quickly generating test conditions.
     Temperature: 20–35°C
     Humidity:    40–100%
     Pressure:    100–105 kPa
  ----------------------------------------------------------- */
  const handleGenerateValues = () => {
    const newTemp = +(20 + Math.random() * 15).toFixed(1);
    const newHum = Math.round(40 + Math.random() * 60);
    const newPres = +(100 + Math.random() * 5).toFixed(1);

    setTemperature(newTemp);
    setHumidity(newHum);
    setPressure(newPres);
  };

  /* -----------------------------------------------------------
     COLOR GRADIENT GENERATORS
     -----------------------------------------------------------
     Used to dynamically color:
       • Summary cards
       • Sliders (via gradientClass)
     Ranges chosen to visually reflect environmental severity.
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

  /* -----------------------------------------------------------
     LABEL GENERATORS (Human-Friendly Descriptions)
     -----------------------------------------------------------
     Used under summary cards to describe conditions.
  ----------------------------------------------------------- */

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

  /* -----------------------------------------------------------
     RENDER SECTION
     -----------------------------------------------------------
     Layout:
     • Header (title, subtitle, controller icon)
     • Three colored summary cards
     • Three premium sliders
     • Random value generator button
  ----------------------------------------------------------- */

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

      {/* ---------------------------------------------------------
          SUMMARY CARDS (Temperature / Humidity / Pressure)
         --------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 mb-8 cursor-pointer">
        {/* Temperature Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-6 bg-gradient-to-br ${getTempColor()} backdrop-blur-xl border border-white/30 shadow-lg text-white`}
        >
          <p className="text-sm font-semibold text-white/80 mb-2">
            Temperature
          </p>
          <p className="text-5xl font-bold">{temperature.toFixed(1)}°C</p>
          <p className="text-xs text-white/70 mt-2">{getTempLabel()}</p>
        </motion.div>

        {/* Humidity Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-6 bg-gradient-to-br ${getHumidityColor()} backdrop-blur-xl border border-white/30 shadow-lg text-white`}
        >
          <p className="text-sm font-semibold text-white/80 mb-2">Humidity</p>
          <p className="text-5xl font-bold">{humidity.toFixed(1)}%</p>
          <p className="text-xs text-white/70 mt-2">{getHumidityLabel()}</p>
        </motion.div>

        {/* Pressure Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`rounded-2xl p-6 bg-gradient-to-br ${getPressureColor()} backdrop-blur-xl border border-white/30 shadow-lg text-white`}
        >
          <p className="text-sm font-semibold text-white/80 mb-2">Pressure</p>
          <p className="text-5xl font-bold">{pressure.toFixed(1)} kPa</p>
          <p className="text-xs text-white/70 mt-2">{getPressureLabel()}</p>
        </motion.div>
      </div>

      {/* ---------------------------------------------------------
          PREMIUM SLIDERS (interactive simulation controls)
         --------------------------------------------------------- */}
      <div className="space-y-12 mb-12">
        <PremiumSlider
          label="Temperature"
          sublabel="0°C to 50°C"
          value={temperature}
          min={0}
          max={50}
          step={0.1}
          unit="°C"
          onChange={setTemperature}
          gradientClass={getTempColor()}
        />

        <PremiumSlider
          label="Humidity"
          sublabel="0% to 100%"
          value={humidity}
          min={0}
          max={100}
          step={1}
          unit="%"
          onChange={setHumidity}
          gradientClass={getHumidityColor()}
        />

        <PremiumSlider
          label="Pressure"
          sublabel="95 kPa to 110 kPa"
          value={pressure}
          min={95}
          max={110}
          step={0.1}
          unit=" kPa"
          onChange={setPressure}
          gradientClass={getPressureColor()}
        />
      </div>

      {/* ---------------------------------------------------------
          RANDOM VALUE BUTTON
         --------------------------------------------------------- */}
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
