import SectionHeader from "./SectionHeader.jsx";

export default function InterpretationGuideSection() {
  return (
    <div
      className="max-w-7xl mx-auto rounded-2xl px-6 py-8
         bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
    >
      {/* Header introducing the interpretation guide section */}
      <SectionHeader
        title="Atmospheric Interpretation Guide"
        subtitle="Quick understanding of what each reading means for comfort, safety, and environment"
        icon={<span className="text-6xl cursor-pointer">🧭</span>}
      />

      {/* 3-column grid: Temperature, Humidity, and Pressure interpretation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* =========================
            TEMPERATURE INTERPRETATION
           ========================= */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-red-50/60 to-orange-100/60
                    backdrop-blur-xl border border-white/30 shadow-lg
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          {/* Card Header: Icon + Title */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌡️</span>
            <h3 className="text-lg font-bold text-gray-900">Temperature</h3>
          </div>

          {/* Temperature ranges and their effects */}
          <div className="space-y-3 text-sm text-gray-700">
            {/* Cool zone */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>Below 18°C — Cool Zone</strong>
              <br />
              Air feels crisp; may require light layering for comfort.
            </div>

            {/* Ideal comfort zone */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>18°C – 26°C — Comfort Zone</strong>
              <br />
              Ideal indoor & outdoor conditions for most people.
            </div>

            {/* Heat risk */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <strong>Above 30°C — Heat Stress Risk</strong>
              <br />
              Prolonged exposure may cause fatigue; ensure hydration.
            </div>
          </div>
        </div>

        {/* ======================
            HUMIDITY INTERPRETATION
           ====================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-blue-50/60 to-teal-100/60
                    backdrop-blur-xl border border-white/30 shadow-lg
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">💧</span>
            <h3 className="text-lg font-bold text-gray-900">Humidity</h3>
          </div>

          {/* Humidity ranges and health/comfort effects */}
          <div className="space-y-3 text-sm text-gray-700">
            {/* Dry air */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>Below 30% — Dry Air</strong>
              <br />
              Can cause dry skin, static, and respiratory irritation.
            </div>

            {/* Ideal humidity */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>30% – 60% — Ideal Humidity</strong>
              <br />
              Optimal for comfort, productivity, and indoor plants.
            </div>

            {/* High moisture */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>Above 70% — High Moisture</strong>
              <br />
              Increases mold growth, heat perception, and stickiness.
            </div>
          </div>
        </div>

        {/* ======================
            PRESSURE INTERPRETATION
           ====================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-purple-50/60 to-indigo-100/60
                    backdrop-blur-xl border border-white/30 shadow-lg
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          {/* Card Header */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌀</span>
            <h3 className="text-lg font-bold text-gray-900">Pressure</h3>
          </div>

          {/* Atmospheric pressure explanations */}
          <div className="space-y-3 text-sm text-gray-700">
            {/* Low pressure */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>Below 100.0 kPa — Low Pressure</strong>
              <br />
              Often signals unstable weather or rain approaching.
            </div>

            {/* Normal pressure */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>100.0 – 103.0 kPa — Normal Range</strong>
              <br />
              Usually calm, stable atmospheric conditions.
            </div>

            {/* High pressure */}
            <div
              className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              <strong>Above 103.0 kPa — High Pressure</strong>
              <br />
              Clear skies but may contribute to dry air and headaches.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
