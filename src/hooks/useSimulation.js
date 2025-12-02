import { useEffect } from "react";
import { computeDerived } from "../utils/weatherUtils.js";

/* =====================================================================
   useSimulation
   ---------------------------------------------------------------------
   Generates simulated sensor readings every 3 seconds.

   Temperature: 20–35 °C
   Humidity:    40–100 %
   Pressure:    100–105 kPa (aligned with real sensor scale)

   Computes:
   - heatIndex
   - dewPoint
   - absHumidity

   Also appends a trimmed dataset for charts (keeps last 15 entries).
===================================================================== */

export function useSimulation(
  mode,
  setTemperature,
  setHumidity,
  setPressure,
  setHeatIndex,
  setDewPoint,
  setAbsHumidity,
  setChartData
) {
  useEffect(() => {
    // Only run when simulation mode is active
    if (mode !== "simulation") return;

    // ----------------------------------------------------------------
    // Simulation Interval (every 3 seconds)
    // ----------------------------------------------------------------
    const interval = setInterval(() => {
      // Generate pseudo-realistic weather values
      const temp = +(20 + Math.random() * 15).toFixed(1); // °C
      const hum = +(40 + Math.random() * 60).toFixed(0); // %
      const pres = +(100 + Math.random() * 5).toFixed(1); // kPa

      // Derived metrics
      const derived = computeDerived(temp, hum, pres);

      // Push live values into state
      setTemperature(temp);
      setHumidity(hum);
      setPressure(pres);
      setHeatIndex(derived.heatIndex);
      setDewPoint(derived.dewPoint);
      setAbsHumidity(derived.absHumidity);

      // Push new chart point (keep last 15)
      setChartData((prev) => [
        ...prev.slice(-14),
        {
          time: new Date().toLocaleTimeString().slice(0, 5),
          temp,
          hum,
          pres,
        },
      ]);
    }, 3000);

    // Cleanup on mode change or component unmount
    return () => clearInterval(interval);
  }, [
    mode,
    setTemperature,
    setHumidity,
    setPressure,
    setHeatIndex,
    setDewPoint,
    setAbsHumidity,
    setChartData,
  ]);
}
