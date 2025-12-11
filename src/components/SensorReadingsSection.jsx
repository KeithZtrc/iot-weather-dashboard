import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import MetricCard from "./MetricCard.jsx";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function SensorReadingsSection({
  metricsPrimary,
  metricsDerived,
  openKey,
  setOpenKey,
}) {
  const primaryRow1 = metricsPrimary.slice(0, 3);
  const primaryRow2 = metricsPrimary.slice(3, 7);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="
        max-w-7xl mx-auto rounded-2xl px-6 py-8 mb-10
        bg-white/40 backdrop-blur-xl
        shadow-md border border-white/20
      "
    >
      <SectionHeader
        title="Sensor Readings"
        subtitle="Live atmospheric parameters updating every 3 seconds"
        icon={<span className="text-6xl cursor-pointer">📡</span>}
      />

      {/* Row 1 */}
      {primaryRow1.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
        >
          {primaryRow1.map((metric) => (
            <motion.div key={metric.key} variants={item}>
              <MetricCard
                {...metric}
                metricKey={metric.key}
                openKey={openKey}
                setOpenKey={setOpenKey}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Row 2 */}
      {primaryRow2.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4"
        >
          {primaryRow2.map((metric) => (
            <motion.div key={metric.key} variants={item}>
              <MetricCard
                {...metric}
                metricKey={metric.key}
                openKey={openKey}
                setOpenKey={setOpenKey}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Derived metrics */}
      {metricsDerived.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
        >
          {metricsDerived.map((metric) => (
            <motion.div key={metric.key} variants={item}>
              <MetricCard
                {...metric}
                metricKey={metric.key}
                openKey={openKey}
                setOpenKey={setOpenKey}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
