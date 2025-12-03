import SectionHeader from "./SectionHeader.jsx";

export default function WeatherStatusGuideSection() {
  return (
    <div
      className="max-w-7xl mx-auto rounded-2xl px-6 py-8
         bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
    >
      {/* Header */}
      <SectionHeader
        title="Weather Status Interpretation"
        subtitle="Understand what each detected condition implies for the environment"
        icon={<span className="text-6xl cursor-pointer">⛅</span>}
      />

      {/* 3-column grid: 6 cards → arranged 3 per row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* ===================================
              SUNNY STATUS
        ==================================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-yellow-50/60 to-amber-100/60
                      backdrop-blur-xl border border-white/30 shadow-lg
                      transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">☀️</span>
            <h3 className="text-lg font-bold text-gray-900">Sunny</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Clear skies, high visibility</strong>
              <br />
              Ideal outdoor conditions with minimal moisture in the air.
            </div>
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>High pressure & low humidity influence</strong>
              <br />
              Stable weather patterns, little chance of precipitation.
            </div>
          </div>
        </div>

        {/* ===================================
              CLOUDY STATUS
        ==================================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-gray-100/60 to-slate-200/60
                      backdrop-blur-xl border border-white/30 shadow-lg
                      transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">☁️</span>
            <h3 className="text-lg font-bold text-gray-900">Cloudy</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Moderate to high moisture</strong>
              <br />
              Visible cloud layers form as humidity rises.
            </div>
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Slightly lower pressure</strong>
              <br />
              Indicates possible transitions toward rain or clearing skies.
            </div>
          </div>
        </div>

        {/* ===================================
              RAINY STATUS
        ==================================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-blue-50/60 to-indigo-100/60
                      backdrop-blur-xl border border-white/30 shadow-lg
                      transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌧️</span>
            <h3 className="text-lg font-bold text-gray-900">Rainy</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>High humidity & lower pressure</strong>
              <br />
              Air becomes saturated, leading to droplets forming and falling.
            </div>
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Reduced visibility</strong>
              <br />
              Road surfaces become slippery — caution is advised.
            </div>
          </div>
        </div>

        {/* ===================================
              STORMY STATUS
        ==================================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-indigo-100/60 to-purple-200/60
                      backdrop-blur-xl border border-white/30 shadow-lg
                      transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⛈️</span>
            <h3 className="text-lg font-bold text-gray-900">Stormy</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Very low pressure with heavy moisture</strong>
              <br />
              Signals unstable air and strong updrafts, creating storms.
            </div>
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Potential hazards</strong>
              <br />
              Strong winds, lightning, and sudden rainfall may occur.
            </div>
          </div>
        </div>

        {/* ===================================
              HOT STATUS
        ==================================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-orange-50/60 to-red-100/60
                      backdrop-blur-xl border border-white/30 shadow-lg
                      transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🔥</span>
            <h3 className="text-lg font-bold text-gray-900">Hot</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Elevated temperature levels</strong>
              <br />
              Heat buildup increases fatigue and dehydration risk.
            </div>
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Low to moderate humidity</strong>
              <br />
              Hot conditions often feel even harsher with dry air.
            </div>
          </div>
        </div>

        {/* ===================================
              COLD STATUS
        ==================================== */}
        <div
          className="rounded-2xl p-6 bg-gradient-to-br from-cyan-50/60 to-blue-100/60
                      backdrop-blur-xl border border-white/30 shadow-lg
                      transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">❄️</span>
            <h3 className="text-lg font-bold text-gray-900">Cold</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Low temperature conditions</strong>
              <br />
              The air feels brisk, and body heat escapes more rapidly.
            </div>
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer">
              <strong>Often linked with high-pressure systems</strong>
              <br />
              Clear, cold nights can intensify chill and frost formation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
