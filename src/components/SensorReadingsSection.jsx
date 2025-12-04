import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader.jsx";
import MetricCard from "./MetricCard.jsx";

/* ---------------------------------------------------------------------
   ANIMATION VARIANTS
   ----------------------------------------------------------------------
   Purpose:
   - Define staggered fade/slide animations for metric card grids
   - Used by Framer Motion parent + child motion.div elements
---------------------------------------------------------------------- */

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/* ---------------------------------------------------------------------
   SENSOR READINGS SECTION
   ----------------------------------------------------------------------
   Purpose:
   - Displays two groups of weather metrics:
       • Primary metrics: temperature, humidity, pressure
       • Derived metrics: heat index, dew point, absolute humidity
   - Each metric is shown using MetricCard (with popovers & arc visuals)
   - Section includes animated grid transitions and a glassy container
---------------------------------------------------------------------- */

export default function SensorReadingsSection({
  metricsPrimary,
  metricsDerived,
  openKey,
  setOpenKey,
}) {
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
      {/* -----------------------------------------------------------------
         SECTION HEADER — Title, subtitle, and icon
         ----------------------------------------------------------------- */}
      <SectionHeader
        title="Sensor Readings"
        subtitle="Live atmospheric parameters updating every 3 seconds"
        icon={<span className="text-6xl cursor-pointer">📡</span>}
      />

      {/* -----------------------------------------------------------------
         PRIMARY METRIC GROUP
         - Temperature, humidity, pressure
         - Uses staggered child animations
         ----------------------------------------------------------------- */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {metricsPrimary.map((metric) => (
          <motion.div key={metric.key} variants={item}>
            <MetricCard
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
          </motion.div>
        ))}
      </motion.div>

      {/* -----------------------------------------------------------------
         DERIVED METRIC GROUP
         - Heat index, dew point, absolute humidity, etc.
         - Slight delay to create layered reveal effect
         ----------------------------------------------------------------- */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{
          staggerChildren: 0.08,
          delayChildren: 0.4,
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
      >
        {metricsDerived.map((metric) => (
          <motion.div key={metric.key} variants={item}>
            <MetricCard
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
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
