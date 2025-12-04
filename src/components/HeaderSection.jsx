import Lottie from "lottie-react";

/* ---------------------------------------------------------------------
   HEADER SECTION
   ----------------------------------------------------------------------
   Purpose:
   - Displays the app's main header area including:
       • Title + subtitle
       • Weather animation (Lottie)
       • Weather description
       • Live local date + time
   - The header updates automatically when `weather` changes.
------------------------------------------------------------------------ */

export default function HeaderSection({ weather }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* -----------------------------------------------------------------
          GLASS-MORPHIC HEADER WRAPPER
         ----------------------------------------------------------------- */}
      <div className="relative rounded-2xl -mx-6 p-6 bg-white/40 backdrop-blur-xl shadow-md border border-white/20">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* ---------------------------------------------------------------
              LEFT COLUMN — Title + Weather Lottie Animation
             --------------------------------------------------------------- */}
          <div className="flex items-center gap-6 flex-1">
            {/* App Title + Tagline */}
            <div>
              <h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight
                           text-transparent bg-clip-text
                           bg-gradient-to-r from-blue-600 to-teal-500"
              >
                LIVE WEATHER INSIGHTS
              </h1>

              <p className="mt-1 text-sm text-gray-700/80">
                Real-time atmospheric metrics and trends
              </p>
            </div>

            {/* Weather Animation */}
            <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 cursor-pointer">
              <Lottie animationData={weather.lottie} loop />
            </div>
          </div>

          {/* ---------------------------------------------------------------
              RIGHT COLUMN — Weather Description + Date/Time
             --------------------------------------------------------------- */}
          <div className="flex flex-col items-start md:items-end space-y-2">
            {/* Weather State Label */}
            <div
              className="px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl
                         shadow-lg border border-white/50
                         text-sm font-semibold text-gray-900 cursor-pointer"
            >
              {weather.desc}
            </div>

            {/* Auto-updating Date + Time display */}
            <div className="text-[11px] text-gray-600 font-medium tracking-wide text-right leading-tight space-y-[1px]">
              {/* Human-readable date example: "Tuesday, April 4" */}
              <div>
                {new Date().toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Time example: "5:42 PM" */}
              <div className="text-[10px] opacity-80">
                {new Date().toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
