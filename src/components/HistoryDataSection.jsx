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
                  <LineChart data={chartData}>
                    {/* Background grid for better readability */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

                    {/* ----------------- X-AXIS -----------------
                        Expects `time` in HH:MM:SS (24h) format.
                        Converts to readable 12-hour time.
                    ------------------------------------------------ */}
                    <XAxis
                      dataKey="time"
                      stroke="#333"
                      tickFormatter={(time) => {
                        const date = new Date(`2025-12-03T${time}`);
                        return date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        });
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
                    <Tooltip />

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
