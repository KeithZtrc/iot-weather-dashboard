import { useEffect } from "react";
import { computeDerived } from "../utils/weatherUtils.js";

/* =====================================================================
   useSimulation
   ---------------------------------------------------------------------
   DEPRECATED: No longer auto-generates simulation data.

   In manual simulation mode, the user controls values via sliders.
   This hook is now a no-op but kept for compatibility.

   Chart updates happen via WeatherDashboard state setters when
   temperature/humidity/pressure change.
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
  // No longer needed for manual simulation
  // User controls values via ManualSimulationSection sliders
  return;
}
