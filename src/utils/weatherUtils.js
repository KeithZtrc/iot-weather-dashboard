import { sunnyAnim, rainyAnim, cloudyAnim, fogAnim } from "../lottie/index.js";

/* -------------------------------------------------------
   Color scale (used for progress, status bars, etc.)
------------------------------------------------------- */
export function getStatusColor(percent) {
  if (percent < 0.25) return "#3b82f6"; // blue
  if (percent < 0.5) return "#10b981"; // green
  if (percent < 0.75) return "#f59e0b"; // yellow
  return "#ef4444"; // red
}

/* -------------------------------------------------------
   Normalization helper (0–1 range)
------------------------------------------------------- */
export function normalize(value, min, max) {
  if (min === max) return 0;
  const pct = (value - min) / (max - min);
  return Math.min(Math.max(pct, 0), 1);
}

/* -------------------------------------------------------
   Derived Metrics: safer + scientifically improved
------------------------------------------------------- */
export function computeDerived(temp, hum, pres) {
  // Prevent invalid values from breaking calculations
  if (
    !Number.isFinite(temp) ||
    !Number.isFinite(hum) ||
    !Number.isFinite(pres)
  ) {
    return { heatIndex: 0, dewPoint: 0, absHumidity: 0 };
  }

  // Heat index (Bolton formula variant — more stable)
  const heatIndex =
    -8.784695 +
    1.61139411 * temp +
    2.338549 * hum -
    0.14611605 * temp * hum -
    0.012308094 * temp ** 2 -
    0.016424828 * hum ** 2 +
    0.002211732 * temp ** 2 * hum +
    0.00072546 * temp * hum ** 2 -
    0.000003582 * temp ** 2 * hum ** 2;

  // dew point (August–Roche–Magnus equation, more accurate)
  const a = 17.625;
  const b = 243.04;
  const alpha = Math.log(hum / 100) + (a * temp) / (b + temp);
  const dewPoint = (b * alpha) / (a - alpha);

  // Absolute humidity (g/m³)
  const absHumidity =
    (6.112 * Math.exp((17.67 * temp) / (temp + 243.5)) * hum * 2.1674) /
    (273.15 + temp);

  return {
    heatIndex: +heatIndex.toFixed(1),
    dewPoint: +dewPoint.toFixed(1),
    absHumidity: +absHumidity.toFixed(1),
  };
}

/* -------------------------------------------------------
   Weather status (Lottie, background, effects)
------------------------------------------------------- */
export function getWeatherStatus(temp, hum) {
  // Safety fallback
  if (!Number.isFinite(temp) || !Number.isFinite(hum)) {
    return {
      desc: "Loading",
      bg: "linear-gradient(135deg, #ddd, #bbb)",
      lottie: cloudyAnim,
      effect: "clouds",
    };
  }

  // Priority ordering:
  // 1) Rain conditions
  // 2) Cold → possibly snowy
  // 3) Heat
  // 4) Cloudy
  // 5) Sunny default

  // 🌧 Rainy (very high humidity)
  if (hum >= 85) {
    return {
      desc: "Rainy",
      bg: "linear-gradient(135deg, #a0c4ff 0%, #3a7bd5 100%)",
      lottie: rainyAnim,
      effect: "rain",
    };
  }

  // ❄ Cold / chilly
  if (temp < 15) {
    return {
      desc: "Cold",
      bg: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
      lottie: fogAnim,
      effect: "snow",
    };
  }

  // 🔥 Heat wave
  if (temp >= 35) {
    return {
      desc: "Hot",
      bg: "linear-gradient(135deg, #ffe29f 0%, #ff7e5f 100%)",
      lottie: sunnyAnim,
      effect: "heat",
    };
  }

  // ☁ Cloudy (moderate humidity)
  if (hum >= 60) {
    return {
      desc: "Cloudy",
      bg: "linear-gradient(135deg, #d7d2cc 0%, #304352 100%)",
      lottie: cloudyAnim,
      effect: "clouds",
    };
  }

  // ☀ Default sunny
  return {
    desc: "Sunny",
    bg: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
    lottie: sunnyAnim,
    effect: "sunny",
  };
}
