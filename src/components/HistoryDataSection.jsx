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

export default function HistoryDataSection({ chartData }) {
  return (
    <div
      className="max-w-7xl mx-auto rounded-2xl px-6 py-8
             bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
    >
      {/* Section header: Title, subtitle + icon */}
      <SectionHeader
        title="History Data Graphs"
        subtitle="Trend visualization for temperature, humidity and pressure"
        icon={<span className="text-6xl cursor-pointer">📈</span>}
      />

      {/* GRID OF CHARTS (3 charts: temp, humidity, pressure) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { key: "temp", label: "Temperature (°C)", color: "#0f62fe" },
          { key: "hum", label: "Humidity (%)", color: "#006943" },
          { key: "pres", label: "Pressure (kPa)", color: "#f39c12" },
        ].map((c) => {
          // Custom y-axis scaling for pressure (kPa varies within small ranges)
          // Temperature & humidity use auto-scaling.
          const yDomain =
            c.key === "pres"
              ? [(dataMin) => dataMin - 0.05, (dataMax) => dataMax + 0.05]
              : ["auto", "auto"];

          return (
            <div
              key={c.key}
              className="bg-white rounded-xl shadow-md p-4
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
            >
              {/* Chart label (title for each metric) */}
              <div className="text-sm text-gray-700 mb-2">{c.label}</div>

              {/* Recharts container for responsive scaling */}
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  {/* Line chart for the selected metric */}
                  <LineChart data={chartData}>
                    {/* Light grid for readability */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />

                    {/* X-axis uses the 'time' field from chartData */}
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

                    {/* Y-axis dynamically scaled depending on metric */}
                    <YAxis
                      stroke="#333"
                      domain={yDomain}
                      tickFormatter={(value) => value.toFixed(2)}
                    />

                    {/* Tooltip shows the hovered value */}
                    <Tooltip />

                    {/* Line series: smooth monotone curve, no data-point dots */}
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
