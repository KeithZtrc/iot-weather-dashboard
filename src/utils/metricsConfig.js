import metricInfo from "../constants/metricInfo.js";
import { directionToWords } from "./weatherUtils.js";
import {
  TempIcon,
  HumIcon,
  PresIcon,
  LuxIcon,
  RainIcon,
  WindIcon,
  DirIcon,
  HeatIcon,
  DewIcon,
  AbsHumIcon,
} from "../icons/weatherIcons.jsx";

/* ------------------------------------------------------------
   Utility: Formats numeric values safely & consistently
------------------------------------------------------------ */
function formatValue(value, decimals = 1) {
  if (typeof value === "string") return value; // ← the fix
  return Number.isFinite(value) ? Number(value.toFixed(decimals)) : 0;
}

/* ------------------------------------------------------------
   Shared builder for metric descriptors
------------------------------------------------------------ */
function createMetric({
  key,
  label,
  value,
  rawValue,
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
    value: formatValue(value, decimals), // display
    rawValue, // use for arc
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
export function getMetricsPrimary(
  temperature,
  humidity,
  pressure,
  luminosity,
  rainLevel,
  windSpeed,
  windDirection
) {
  return [
    createMetric({
      key: "temp",
      label: "Temperature",
      value: temperature,
      unit: "°C",
      Icon: TempIcon,
      min: 15,
      max: 50,
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
      max: 115,
      description: metricInfo.pres,
    }),

    createMetric({
      key: "lux",
      label: "Light Intensity",
      value: luminosity,
      decimals: 0,
      unit: " lux",
      Icon: LuxIcon,
      min: 0,
      max: 60000,
      description: metricInfo.lux,
    }),

    createMetric({
      key: "rain",
      label: "Rain Level",
      value: ((1023 - rainLevel) / 1023) * 100,
      rawValue: ((1023 - rainLevel) / 1023) * 100,
      decimals: 0,
      unit: "%",
      Icon: RainIcon,
      min: 0,
      max: 100,
      description: metricInfo.rain,
    }),

    createMetric({
      key: "wind",
      label: "Wind Speed",
      value: windSpeed,
      decimals: 1,
      unit: " km/h",
      Icon: WindIcon,
      min: 0,
      max: 60,
      description: metricInfo.wind,
    }),

    createMetric({
      key: "dir",
      label: "Wind Direction",
      value: directionToWords(windDirection),
      unit: "",
      Icon: DirIcon,
      description: metricInfo.dir,
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
      min: 15,
      max: 55,
      description: metricInfo.heat,
    }),

    createMetric({
      key: "dew",
      label: "Dew Point",
      value: dewPoint,
      unit: "°C",
      Icon: DewIcon,
      min: 0,
      max: 28,
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
      max: 30,
      description: metricInfo.abs,
    }),
  ];
}
