import SectionHeader from "./SectionHeader.jsx";

export default function ModeSelector({ mode, setMode, deviceOnline }) {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div
        className="
          relative rounded-2xl  p-6
          bg-white/40 backdrop-blur-xl
          shadow-[0_8px_25px_rgba(0,0,0,0.08)]
          border border-white/20
          overflow-hidden
        "
      >
        {/* ============================
            Ambient floating background glows
            Adds soft motionless depth to the card
           ============================ */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-300/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300/20 blur-2xl rounded-full pointer-events-none" />

        {/* ============================
            Section title + subtitle (shared UI component)
           ============================ */}
        <SectionHeader
          title="Data Source Mode"
          subtitle="Use live ESP32 sensor telemetry or switch to smooth simulation mode"
          icon={<span className="text-6xl cursor-pointer">⚙️</span>}
        />

        {/* ============================
            MODE SELECTION GRID
            Two selectable cards: Simulation vs Sensor
           ============================ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* ============================
              SIMULATION MODE CARD
              Used when user wants fake/smooth values for testing UI
             ============================ */}
          <button
            onClick={() => setMode("simulation")}
            className={`
              group relative p-6 rounded-2xl text-left transition-all
              bg-white/50 backdrop-blur-xl border shadow-sm
              hover:shadow-xl hover:-translate-y-1
              ${
                mode === "simulation"
                  ? "border-teal-500/40 shadow-[0_0_25px_rgba(20,184,166,0.3)]"
                  : "border-white/30"
              }
            `}
          >
            {/* Active glow effect when simulation is selected */}
            {mode === "simulation" && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-300/30 to-blue-300/10 blur-xl opacity-60" />
            )}

            {/* Icon and label block */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="text-5xl">🧪</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Simulation Mode
                </h3>
                <p className="text-sm text-gray-700/80">
                  Smooth synthetic readings for UI testing.
                </p>
              </div>
            </div>
          </button>

          {/* ============================
              SENSOR MODE CARD
              Pulls live data from ESP32 MQTT source
             ============================ */}
          <button
            onClick={() => setMode("sensor")}
            className={`
              group relative p-6 rounded-2xl text-left transition-all
              bg-white/50 backdrop-blur-xl border shadow-sm
              hover:shadow-xl hover:-translate-y-1
              ${
                mode === "sensor"
                  ? "border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
                  : "border-white/30"
              }
            `}
          >
            {/* Active glow effect when sensor mode is selected */}
            {mode === "sensor" && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-cyan-300/10 blur-xl opacity-60" />
            )}

            {/* Icon + label block */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="text-5xl">📡</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Sensor Mode</h3>
                <p className="text-sm text-gray-700/80">
                  Real-time ESP32 telemetry via MQTT.
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* ============================
            STATUS BADGE
            Shows device/simulation state:
              - Simulation Active
              - Device Online
              - Device Offline
           ============================ */}
        <div className="mt-8">
          <span
            className={`
              px-4 py-2 rounded-full text-sm font-semibold tracking-wide
              backdrop-blur-xl border transition-all shadow-lg
              ${
                mode === "simulation"
                  ? "bg-gray-300/50 text-gray-900 border-gray-200/40"
                  : deviceOnline
                  ? "bg-green-500/90 text-white border-green-400/40 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                  : "bg-red-500/90 text-white border-red-400/40 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
              }
            `}
          >
            {mode === "simulation"
              ? "Simulation Active"
              : deviceOnline
              ? "Device Online"
              : "Device Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}
