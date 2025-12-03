import {
  sunnyAnim,
  rainyAnim,
  cloudyAnim,
  stormyAnim,
  chillyAnim,
} from "../lottie/index.js";

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
export function getWeatherStatus(temp, hum, pres) {
  // Safety fallback
  if (!Number.isFinite(temp) || !Number.isFinite(hum)) {
    return {
      desc: "Loading",
      lottie: cloudyAnim,
      effect: "clouds",
    };
  }

  // Priority ordering:
  // 1) Storm conditions
  // 2) Rain conditions
  // 3) Chilly conditions
  // 4) Heat conditions
  // 5) Cloudy conditions
  // 6) Sunny default

  // ⛈ Stormy (low pressure and high humidity)
  if (pres < 99.5 && hum > 80 && temp >= 15) {
    return {
      desc: "Stormy",
      lottie: stormyAnim,
      effect: "storm",
    };
  }

  // 🌧 Rainy (very high humidity)
  if (pres < 100.5 && hum > 85) {
    return {
      desc: "Rainy",
      lottie: rainyAnim,
      effect: "rain",
    };
  }

  // ❄ Chilly
  if (temp <= 5 || (temp <= 10 && hum < 60 && pres > 102)) {
    return {
      desc: "Chilly",
      lottie: chillyAnim,
      effect: "snow",
    };
  }

  // 🔥 Heat wave
  if (temp >= 32 && hum < 60) {
    return {
      desc: "Hot",
      lottie: sunnyAnim,
      effect: "heat",
    };
  }

  // ☁ Cloudy (moderate humidity)
  if (hum >= 60 && pres <= 101.5) {
    return {
      desc: "Cloudy",
      lottie: cloudyAnim,
      effect: "clouds",
    };
  }

  // ☀ Default sunny
  return {
    desc: "Sunny",
    lottie: sunnyAnim,
    effect: "sunny",
  };
}
