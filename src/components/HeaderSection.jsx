import Lottie from "lottie-react";

export default function HeaderSection({ weather }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Main glass-morphism container */}
      <div className="relative rounded-2xl -mx-6 p-6 bg-white/40 backdrop-blur-xl shadow-md border border-white/20">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Left section: Title + Lottie weather animation */}
          <div className="flex items-center gap-6 flex-1">
            {/* App title and subtitle */}
            <div>
              <h1
                className="text-4xl md:text-5xl font-extrabold tracking-tight
                           text-transparent bg-clip-text
                           bg-gradient-to-r from-blue-600 to-teal-500"
              >
                LIVE WEATHER INSIGHTS
              </h1>

              {/* Short informational tagline */}
              <p className="mt-1 text-sm text-gray-700/80">
                Real-time atmospheric metrics and trends
              </p>
            </div>

            {/* Weather animation (Lottie) */}
            <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 cursor-pointer">
              <Lottie animationData={weather.lottie} loop />
            </div>
          </div>

          {/* Right section: Weather description + date/time */}
          <div className="flex flex-col items-start md:items-end space-y-2">
            {/* Current weather description (e.g., "Cloudy", "Clear sky") */}
            <div
              className="px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl
                         shadow-lg border border-white/50
                         text-sm font-semibold text-gray-900 cursor-pointer"
            >
              {weather.desc}
            </div>

            {/* Date and time (auto-updating on re-render) */}
            <div className="text-[11px] text-gray-600 font-medium tracking-wide text-right leading-tight space-y-[1px]">
              {/* Human-readable full date */}
              <div>
                {new Date().toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              {/* Local time in AM/PM format */}
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
