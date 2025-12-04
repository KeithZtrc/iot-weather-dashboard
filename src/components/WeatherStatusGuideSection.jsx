import SectionHeader from "./SectionHeader.jsx";

/* ---------------------------------------------------------------------
   WEATHER STATUS GUIDE SECTION
   ----------------------------------------------------------------------
   Purpose:
   - Provides a visual reference explaining what each detected
     weather condition implies (sunny, cloudy, rainy, stormy, hot, cold)
   - Each card includes:
       • Weather icon + title
       • Two informational sub-cards
   - Responsive: stacks into 1 column on mobile, 3 per row on desktop
---------------------------------------------------------------------- */

export default function WeatherStatusGuideSection() {
  return (
    <div
      className="
        max-w-7xl mx-auto rounded-2xl px-6 py-8
        bg-white/40 backdrop-blur-xl shadow-md border border-white/20
        mb-10
      "
    >
      {/* -----------------------------------------------------------------
         SECTION HEADER
         Title + subtitle + icon for the Weather Guide
         ----------------------------------------------------------------- */}
      <SectionHeader
        title="Weather Status Interpretation"
        subtitle="Understand what each detected condition implies for the environment"
        icon={<span className="text-6xl cursor-pointer">⛅</span>}
      />

      {/* -----------------------------------------------------------------
         3-COLUMN GRID
         - Contains 6 weather explanation cards
         - Automatically wraps into 1-column layout on small screens
         ----------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* ================================================================
           SUNNY CARD
           - High visibility, clear atmosphere, stable pattern
        ================================================================= */}
        <div
          className="
            rounded-2xl p-6 bg-gradient-to-br
            from-yellow-50/60 to-amber-100/60
            backdrop-blur-xl border border-white/30 shadow-lg
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
          "
        >
          {/* Icon + Title */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">☀️</span>
            <h3 className="text-lg font-bold text-gray-900">Sunny</h3>
          </div>

          {/* Info blocks */}
          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Clear skies, high visibility</strong>
              <br />
              Ideal outdoor conditions with minimal moisture in the air.
            </div>

            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>High pressure & low humidity influence</strong>
              <br />
              Stable weather patterns, little chance of precipitation.
            </div>
          </div>
        </div>

        {/* ================================================================
           CLOUDY CARD
        ================================================================= */}
        <div
          className="
            rounded-2xl p-6 bg-gradient-to-br
            from-gray-100/60 to-slate-200/60
            backdrop-blur-xl border border-white/30 shadow-lg
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">☁️</span>
            <h3 className="text-lg font-bold text-gray-900">Cloudy</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Moderate to high moisture</strong>
              <br />
              Visible cloud layers form as humidity rises.
            </div>

            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Slightly lower pressure</strong>
              <br />
              Indicates possible transitions toward rain or clearing skies.
            </div>
          </div>
        </div>

        {/* ================================================================
           RAINY CARD
        ================================================================= */}
        <div
          className="
            rounded-2xl p-6 bg-gradient-to-br
            from-blue-50/60 to-indigo-100/60
            backdrop-blur-xl border border-white/30 shadow-lg
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌧️</span>
            <h3 className="text-lg font-bold text-gray-900">Rainy</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>High humidity & lower pressure</strong>
              <br />
              Saturated air forms droplets that fall as rain.
            </div>

            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Reduced visibility</strong>
              <br />
              Surfaces become slippery — extra caution recommended.
            </div>
          </div>
        </div>

        {/* ================================================================
           STORMY CARD
        ================================================================= */}
        <div
          className="
            rounded-2xl p-6 bg-gradient-to-br
            from-indigo-100/60 to-purple-200/60
            backdrop-blur-xl border border-white/30 shadow-lg
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⛈️</span>
            <h3 className="text-lg font-bold text-gray-900">Stormy</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Very low pressure with heavy moisture</strong>
              <br />
              Unstable air and strong updrafts create storm activity.
            </div>

            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Potential hazards</strong>
              <br />
              Strong winds, lightning, and intense rainfall possible.
            </div>
          </div>
        </div>

        {/* ================================================================
           HOT CARD
        ================================================================= */}
        <div
          className="
            rounded-2xl p-6 bg-gradient-to-br
            from-orange-50/60 to-red-100/60
            backdrop-blur-xl border border-white/30 shadow-lg
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🔥</span>
            <h3 className="text-lg font-bold text-gray-900">Hot</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Elevated temperature levels</strong>
              <br />
              Increases fatigue and dehydration risk.
            </div>

            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Low to moderate humidity</strong>
              <br />
              Hot conditions often feel harsher with dry air.
            </div>
          </div>
        </div>

        {/* ================================================================
           COLD CARD
        ================================================================= */}
        <div
          className="
            rounded-2xl p-6 bg-gradient-to-br
            from-cyan-50/60 to-blue-100/60
            backdrop-blur-xl border border-white/30 shadow-lg
            transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl
            cursor-pointer
          "
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">❄️</span>
            <h3 className="text-lg font-bold text-gray-900">Cold</h3>
          </div>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Low temperature conditions</strong>
              <br />
              Body heat escapes rapidly, increasing chill.
            </div>

            <div className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-xl transition-transform duration-300">
              <strong>Linked with high-pressure systems</strong>
              <br />
              Clear nights can intensify cold and frost formation.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
