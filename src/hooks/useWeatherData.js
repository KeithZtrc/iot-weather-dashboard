import { useState, useEffect } from "react";
import { computeDerived } from "../utils/weatherUtils";

/* =====================================================================
   useWeatherData
   ---------------------------------------------------------------------
   Provides either:
   - Simulation weather (smooth live variation)
   - Static placeholder if mode !== "simulation"

   Derived metrics auto-update:
   - heatIndex
   - dewPoint
   - absHumidity

   Chart stores last 20 readings.
===================================================================== */

export function useWeatherData(mode) {
  // Base weather variables
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [pressure, setPressure] = useState(101.3);

  // Derived values
  const [heatIndex, setHeatIndex] = useState(26);
  const [dewPoint, setDewPoint] = useState(18);
  const [absHumidity, setAbsHumidity] = useState(14);

  // Chart (sparkline style)
  const [chartData, setChartData] = useState([
    { time: "00:00", temp: 25, hum: 60, pres: 101.3 },
  ]);

  /* =====================================================================
     SIMULATION LOOP
     Smoothly drifts values every 2 seconds.
  ====================================================================== */
  useEffect(() => {
    if (mode !== "simulation") return;

    const interval = setInterval(() => {
      // Slight temperature drift
      setTemperature((prev) => {
        const delta = (Math.random() - 0.5) * 2; // ±1°C
        return +Math.min(50, Math.max(0, prev + delta)).toFixed(1);
      });

      // Humidity drift
      setHumidity((prev) => {
        const delta = (Math.random() - 0.5) * 3; // ±1.5 %
        return Math.min(100, Math.max(0, Math.round(prev + delta)));
      });

      // Pressure drift
      setPressure((prev) => {
        const delta = (Math.random() - 0.5) * 0.5; // ±0.25 kPa
        return +Math.min(110, Math.max(95, prev + delta)).toFixed(2);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [mode]);

  /* =====================================================================
     DERIVED METRIC UPDATES
  ====================================================================== */
  useEffect(() => {
    const derived = computeDerived(temperature, humidity, pressure);
    setHeatIndex(derived.heatIndex);
    setDewPoint(derived.dewPoint);
    setAbsHumidity(derived.absHumidity);

    // Append chart point (keep last 20)
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    setChartData((prev) =>
      [
        ...prev,
        {
          time: timeStr,
          temp: temperature,
          hum: humidity,
          pres: pressure,
        },
      ].slice(-20)
    );
  }, [temperature, humidity, pressure]);

  /* =====================================================================
     Public API
  ====================================================================== */
  return {
    temperature,
    setTemperature,
    humidity,
    setHumidity,
    pressure,
    setPressure,
    heatIndex,
    dewPoint,
    absHumidity,
    chartData,
  };
}
