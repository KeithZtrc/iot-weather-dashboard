import SectionHeader from "./SectionHeader.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ---------------------------------------------------------------------
   HISTORY DATA SECTION
   ----------------------------------------------------------------------
   Purpose:
   - Display 3 responsive line charts for:
       • Temperature (°C)
       • Humidity (%)
       • Pressure (kPa)
   - Uses Recharts for clean, responsive visualizations.
   - Automatically formats timestamps & scales Y-axis depending on metric.
------------------------------------------------------------------------ */

export default function HistoryDataSection({ chartData }) {
  // ---------------------------------------------------------------
  // TRANSFORM DATA FOR CONSISTENT X-AXIS
  // Converts HH:MM:SS string into total seconds for proper scaling
  // ---------------------------------------------------------------
  const transformedData = chartData.map((item) => {
    if (!item.time) return { ...item, timeSeconds: 0 };
    const parts = item.time.split(":").map(Number);
    const hours = parts[0] || 0;
    const minutes = parts[1] || 0;
    const seconds = parts[2] || 0;
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    return { ...item, timeSeconds: totalSeconds };
  });

  return (
    <div
      className="
        max-w-7xl mx-auto rounded-2xl px-6 py-8
        bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10
      "
    >
      {/* ---------------------------------------------------------------
          SECTION HEADER
          Title + subtitle + icon for visual grouping
         --------------------------------------------------------------- */}
      <SectionHeader
        title="History Data Graphs"
        subtitle="Trend visualization for temperature, humidity and pressure"
        icon={<span className="text-6xl cursor-pointer">📈</span>}
      />

      {/* ---------------------------------------------------------------
          GRID OF CHART CARDS (1×3 on desktop, stacked on mobile)
         --------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { key: "temp", label: "Temperature (°C)", color: "#0f62fe" },
          { key: "hum", label: "Humidity (%)", color: "#006943" },
          { key: "pres", label: "Pressure (kPa)", color: "#f39c12" },
        ].map((c) => {
          // -----------------------------------------------------------
          // Pressure varies in narrow ranges → custom y-scaling.
          // Temperature & humidity use automatic scaling.
          // -----------------------------------------------------------
          const yDomain =
            c.key === "pres"
              ? [(dataMin) => dataMin - 0.05, (dataMax) => dataMax + 0.05]
              : ["auto", "auto"];

          return (
            <div
              key={c.key}
              className="
                bg-white rounded-xl shadow-md p-4
                transition-transform duration-300
                hover:-translate-y-1 hover:shadow-xl cursor-pointer
              "
            >
              {/* Chart Title */}
              <div className="text-sm text-gray-700 mb-2">{c.label}</div>

              {/* -------------------------------------------------------
                  RESPONSIVE CHART CONTAINER
                  Ensures the line chart scales to parent width/height.
                 ------------------------------------------------------- */}
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transformedData}>
                    {/* Background grid for better readability */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

                    {/* ----------------- X-AXIS -----------------
                        Uses numeric time (seconds) for consistent spacing.
                        Tick labels formatted to 12-hour time with optional seconds.
                    ------------------------------------------------ */}
                    <XAxis
                      dataKey="timeSeconds"
                      stroke="#333"
                      tickFormatter={(seconds) => {
                        if (seconds == null) return "--:--";
                        let h = Math.floor(seconds / 3600);
                        let m = Math.floor((seconds % 3600) / 60);
                        let s = seconds % 60;

                        const ampm = h >= 12 ? "PM" : "AM";
                        h = h % 12;
                        if (h === 0) h = 12;

                        const minuteStr = m.toString().padStart(2, "0");
                        const secondStr = s.toString().padStart(2, "0");

                        return s > 0
                          ? `${h}:${minuteStr}:${secondStr} ${ampm}`
                          : `${h}:${minuteStr} ${ampm}`;
                      }}
                    />

                    {/* ----------------- Y-AXIS -----------------
                        Custom scaling for pressure; auto for others.
                        Formats all values to 2 decimal places.
                    ------------------------------------------------ */}
                    <YAxis
                      stroke="#333"
                      domain={yDomain}
                      tickFormatter={(value) => value.toFixed(2)}
                    />

                    {/* Hover tooltip with live values */}
                    <Tooltip
                      labelFormatter={(seconds) => {
                        if (seconds == null) return "--:--";
                        let h = Math.floor(seconds / 3600);
                        let m = Math.floor((seconds % 3600) / 60);
                        let s = seconds % 60;
                        const ampm = h >= 12 ? "PM" : "AM";
                        h = h % 12;
                        if (h === 0) h = 12;
                        const minuteStr = m.toString().padStart(2, "0");
                        const secondStr = s.toString().padStart(2, "0");
                        return s > 0
                          ? `${h}:${minuteStr}:${secondStr} ${ampm}`
                          : `${h}:${minuteStr} ${ampm}`;
                      }}
                    />

                    {/* ----------------- LINE SERIES -----------------
                        Smooth monotone curve
                        No dots to keep UI clean
                    ------------------------------------------------ */}
                    <Line
                      type="monotone"
                      dataKey={c.key}
                      stroke={c.color}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
