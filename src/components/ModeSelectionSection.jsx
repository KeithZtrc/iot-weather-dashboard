import SectionHeader from "./SectionHeader.jsx";

/* ---------------------------------------------------------------------
   MODE SELECTOR COMPONENT
   ----------------------------------------------------------------------
   Purpose:
   - Lets the user switch between:
       • Manual Simulation (UI-driven dummy data)
       • Sensor Mode (live ESP32 telemetry)
   - Visually highlights active mode
   - Shows device status (online / offline / manual)
---------------------------------------------------------------------- */

export default function ModeSelector({ mode, setMode, deviceOnline }) {
  return (
    <div className="max-w-7xl mx-auto mb-10">
      <div
        className="
          relative rounded-2xl p-6
          bg-white/40 backdrop-blur-xl border border-white/20
          shadow-[0_8px_25px_rgba(0,0,0,0.08)]
          overflow-hidden
        "
      >
        {/* -----------------------------------------------------------------
           BACKGROUND FLOATING GLOW ELEMENTS
           - Decorative, subtle depth lighting
           ----------------------------------------------------------------- */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-300/20 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300/20 blur-2xl rounded-full pointer-events-none" />

        {/* -----------------------------------------------------------------
           SECTION HEADER
           - Title, subtitle, and icon representing data mode selection
           ----------------------------------------------------------------- */}
        <SectionHeader
          title="Data Source Mode"
          subtitle="Use live ESP32 sensor telemetry or switch to manual simulation mode"
          icon={<span className="text-6xl cursor-pointer">⚙️</span>}
        />

        {/* -----------------------------------------------------------------
           MODE SELECTION GRID
           - Two selectable cards side by side
           ----------------------------------------------------------------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* -----------------------------------------------------------------
             MANUAL SIMULATION MODE CARD
             - For UI/UX testing without hardware
             ----------------------------------------------------------------- */}
          <button
            onClick={() => setMode("manual-simulation")}
            className={`
              group relative p-6 rounded-2xl text-left transition-all
              bg-white/50 backdrop-blur-xl border shadow-sm
              hover:shadow-xl hover:-translate-y-1
              ${
                mode === "manual-simulation"
                  ? "border-teal-500/40 shadow-[0_0_25px_rgba(20,184,166,0.3)]"
                  : "border-white/30"
              }
            `}
          >
            {/* Highlight glow when selected */}
            {mode === "manual-simulation" && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-300/30 to-blue-300/10 blur-xl opacity-60" />
            )}

            {/* Card content */}
            <div className="relative z-10 flex items-center gap-4">
              <div className="text-5xl">🎮</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Manual Simulation
                </h3>
                <p className="text-sm text-gray-700/80">
                  User-controlled sliders for UI testing.
                </p>
              </div>
            </div>
          </button>

          {/* -----------------------------------------------------------------
             SENSOR MODE CARD
             - Pulls real-time telemetry from ESP32 via MQTT
             ----------------------------------------------------------------- */}
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
            {/* Highlight glow when selected */}
            {mode === "sensor" && (
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-cyan-300/10 blur-xl opacity-60" />
            )}

            {/* Card content */}
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

        {/* -----------------------------------------------------------------
           DEVICE / MODE STATUS BADGE
           Shows:
             - Manual Simulation Active
             - Device Online
             - Device Offline
           ----------------------------------------------------------------- */}
        <div className="mt-8">
          <span
            className={`
              px-4 py-2 rounded-full text-sm font-semibold tracking-wide
              backdrop-blur-xl border transition-all shadow-lg
              ${
                mode === "manual-simulation"
                  ? "bg-gray-300/50 text-gray-900 border-gray-200/40"
                  : deviceOnline
                  ? "bg-green-500/90 text-white border-green-400/40 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                  : "bg-red-500/90 text-white border-red-400/40 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
              }
            `}
          >
            {mode === "manual-simulation"
              ? "Manual Simulation Active"
              : deviceOnline
              ? "Device Online"
              : "Device Offline"}
          </span>
        </div>
      </div>
    </div>
  );
}
