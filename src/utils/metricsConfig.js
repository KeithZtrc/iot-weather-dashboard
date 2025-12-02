import metricInfo from "../constants/metricInfo.js";
import {
  TempIcon,
  HumIcon,
  PresIcon,
  HeatIcon,
  DewIcon,
  AbsHumIcon,
} from "../icons/weatherIcons.jsx";

/* ------------------------------------------------------------
   Utility: Formats numeric values safely & consistently
------------------------------------------------------------ */
function formatValue(value, decimals = 1) {
  return Number.isFinite(value) ? Number(value.toFixed(decimals)) : 0;
}

/* ------------------------------------------------------------
   Shared builder for metric descriptors
------------------------------------------------------------ */
function createMetric({
  key,
  label,
  value,
  decimals = 1,
  unit,
  Icon,
  min,
  max,
  description,
}) {
  return {
    key,
    label,
    value: formatValue(value, decimals),
    unit,
    Icon,
    min,
    max,
    description,
  };
}

/* ------------------------------------------------------------
   PRIMARY METRICS (Direct Sensor Readings)
------------------------------------------------------------ */
export function getMetricsPrimary(temperature, humidity, pressure) {
  return [
    createMetric({
      key: "temp",
      label: "Temperature",
      value: temperature,
      unit: "°C",
      Icon: TempIcon,
      min: 0,
      max: 40,
      description: metricInfo.temp,
    }),

    createMetric({
      key: "hum",
      label: "Humidity",
      value: humidity,
      decimals: 0,
      unit: "%",
      Icon: HumIcon,
      min: 0,
      max: 100,
      description: metricInfo.hum,
    }),

    createMetric({
      key: "pres",
      label: "Pressure",
      value: pressure,
      decimals: 1,
      unit: " kPa",
      Icon: PresIcon,
      min: 95,
      max: 105,
      description: metricInfo.pres,
    }),
  ];
}

/* ------------------------------------------------------------
   DERIVED METRICS (Calculated Data)
------------------------------------------------------------ */
export function getMetricsDerived(heatIndex, dewPoint, absHumidity) {
  return [
    createMetric({
      key: "heat",
      label: "Heat Index",
      value: heatIndex,
      unit: "°C",
      Icon: HeatIcon,
      min: 10,
      max: 45,
      description: metricInfo.heat,
    }),

    createMetric({
      key: "dew",
      label: "Dew Point",
      value: dewPoint,
      unit: "°C",
      Icon: DewIcon,
      min: 0,
      max: 25,
      description: metricInfo.dew,
    }),

    createMetric({
      key: "abs",
      label: "Absolute Humidity",
      value: absHumidity,
      decimals: 1,
      unit: " g/m³",
      Icon: AbsHumIcon,
      min: 0,
      max: 25,
      description: metricInfo.abs,
    }),
  ];
}
