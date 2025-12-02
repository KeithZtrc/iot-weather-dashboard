import SectionHeader from "./SectionHeader.jsx";
import MetricCard from "./MetricCard.jsx";

export default function SensorReadingsSection({
  metricsPrimary,
  metricsDerived,
  openKey,
  setOpenKey,
}) {
  return (
    <div
      className="max-w-7xl mx-auto rounded-2xl px-6 py-8
                 bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
    >
      {/* ============================
          Section Header
          Title, subtitle, and icon for the readings module
         ============================ */}
      <SectionHeader
        title="Sensor Readings"
        subtitle="Live atmospheric parameters updating every 3 seconds"
        icon={<span className="text-6xl cursor-pointer">📡</span>}
      />

      {/* ============================
          Primary Metric Group
          Temperature, humidity, pressure, etc.
         ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {metricsPrimary.map((metric) => (
          <MetricCard
            key={metric.key}
            metricKey={metric.key}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            Icon={metric.Icon}
            min={metric.min}
            max={metric.max}
            description={metric.description}
            openKey={openKey}
            setOpenKey={setOpenKey}
          />
        ))}
      </div>

      {/* ============================
          Derived Metric Group
          Heat index, dew point, absolute humidity, etc.
         ============================ */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        {metricsDerived.map((metric) => (
          <MetricCard
            key={metric.key}
            metricKey={metric.key}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            Icon={metric.Icon}
            min={metric.min}
            max={metric.max}
            description={metric.description}
            openKey={openKey}
            setOpenKey={setOpenKey}
          />
        ))}
      </div>
    </div>
  );
}
