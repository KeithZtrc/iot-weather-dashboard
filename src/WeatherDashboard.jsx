import React, { useState, useEffect } from "react";

import { useMqttPublisher } from "./hooks/useMqttPublisher.js";
import { useSimulation } from "./hooks/useSimulation.js";
import { useMqttSensor } from "./hooks/useMqttSensor.js";

import { getMetricsPrimary, getMetricsDerived } from "./utils/metricsConfig.js";
import { getWeatherStatus, computeDerived } from "./utils/weatherUtils.js";

import { INITIAL_STATE } from "./constants/initialState.js";

import WeatherLayer from "./components/WeatherLayer.jsx";
import HeaderSection from "./components/HeaderSection.jsx";
import ModeSelectionSection from "./components/ModeSelectionSection.jsx";
import SensorReadingsSection from "./components/SensorReadingsSection.jsx";
import HistoryDataSection from "./components/HistoryDataSection.jsx";
import InterpretationGuideSection from "./components/InterpretationGuideSection.jsx";
import WeatherStatusGuideSection from "./components/WeatherStatusGuideSection.jsx";
import SmartControlsSection from "./components/SmartControlsSection.jsx";
import ManualSimulationSection from "./components/ManualSimulationSection.jsx";

/* ---------------------------------------------------------------------
   WEATHER DASHBOARD ROOT COMPONENT
   ---------------------------------------------------------------------
   Acts as the central controller for the entire application.

   Responsibilities:
   ✓ Maintains environmental state (temperature, humidity, pressure, etc.)
   ✓ Chooses between SENSOR mode and SIMULATION mode
   ✓ Subscribes to MQTT topics for live sensor data
   ✓ Runs synthetic data stream in manual simulation mode
   ✓ Calculates derived environmental metrics
   ✓ Passes all UI-ready data to presentation components
------------------------------------------------------------------------ */

export default function WeatherDashboard() {
  /* -----------------------------------------------------------
     GLOBAL MODE & DEVICE STATUS
     -----------------------------------------------------------
     mode          → "sensor" | "manual-simulation"
     deviceOnline  → tracks if MQTT-connected device is reachable
  ----------------------------------------------------------- */
  const [mode, setMode] = useState(INITIAL_STATE.mode);
  const [deviceOnline, setDeviceOnline] = useState(INITIAL_STATE.deviceOnline);

  /* MQTT client instance + publishing hook */
  const [mqttClient, setMqttClient] = useState(null);
  const { publish } = useMqttPublisher(mqttClient);

  /* -----------------------------------------------------------
     PRIMARY SENSOR METRICS
     -----------------------------------------------------------
     These values come from either:
       • MQTT sensor data (sensor mode), or
       • Simulation generator (manual simulation mode)
  ----------------------------------------------------------- */
  const [temperature, setTemperature] = useState(INITIAL_STATE.temperature);
  const [humidity, setHumidity] = useState(INITIAL_STATE.humidity);
  const [pressure, setPressure] = useState(INITIAL_STATE.pressure);

  /* -----------------------------------------------------------
     DERIVED METRICS (calculated automatically)
     -----------------------------------------------------------
     Derived from primary metrics on each update via utils
  ----------------------------------------------------------- */
  const [heatIndex, setHeatIndex] = useState(INITIAL_STATE.heatIndex);
  const [dewPoint, setDewPoint] = useState(INITIAL_STATE.dewPoint);
  const [absHumidity, setAbsHumidity] = useState(INITIAL_STATE.absHumidity);

  /* -----------------------------------------------------------
     UI STATE (smart controls, accordion, etc.)
  ----------------------------------------------------------- */
  const [brightness, setBrightness] = useState(INITIAL_STATE.brightness);
  const [speed, setSpeed] = useState(INITIAL_STATE.speed);
  const [currentWeather, setCurrentWeather] = useState(INITIAL_STATE.weather);

  const [openKey, setOpenKey] = useState(INITIAL_STATE.openKey);

  /* Sparkline chart history (last N readings) */
  const [chartData, setChartData] = useState(INITIAL_STATE.chartData);

  /* -----------------------------------------------------------
     DERIVED METRIC SYNC + CHART UPDATES
     -----------------------------------------------------------
     Whenever primary metrics change:
       → recompute derived values
       → append entry to sparkline history
  ----------------------------------------------------------- */
  useEffect(() => {
    // Update derived metrics based on latest sensor values
    const derived = computeDerived(temperature, humidity, pressure);
    setHeatIndex(derived.heatIndex);
    setDewPoint(derived.dewPoint);
    setAbsHumidity(derived.absHumidity);

    // Append new data point (hh:mm) and keep last 20 entries
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

  /* -----------------------------------------------------------
     DATA INPUT PIPELINES
     -----------------------------------------------------------
     Pipeline depends on active mode:
     • manual-simulation → synthetic data stream via useSimulation
     • sensor           → MQTT live data via useMqttSensor
  ----------------------------------------------------------- */

  // Simulation mode: generate continuous synthetic data
  useSimulation(
    mode === "manual-simulation" ? "simulation" : null,
    setTemperature,
    setHumidity,
    setPressure,
    setHeatIndex,
    setDewPoint,
    setAbsHumidity,
    setChartData
  );

  // Sensor mode: subscribe to MQTT and update metrics on messages
  useMqttSensor(
    mode,
    setMqttClient,
    setDeviceOnline,
    setTemperature,
    setHumidity,
    setPressure,
    setHeatIndex,
    setDewPoint,
    setAbsHumidity,
    setChartData
  );

  /* -----------------------------------------------------------
     COMPUTED VISUAL DATA
     -----------------------------------------------------------
     Prepares human-readable summaries for UI panels
  ----------------------------------------------------------- */
  const weather = getWeatherStatus(temperature, humidity, pressure);
  const metricsPrimary = getMetricsPrimary(temperature, humidity, pressure);
  const metricsDerived = getMetricsDerived(heatIndex, dewPoint, absHumidity);

  /* -----------------------------------------------------------
     RENDER LAYOUT
     -----------------------------------------------------------
     Page is composed of modular UI sections, conditionally
     displayed depending on active mode.
  ----------------------------------------------------------- */
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic atmospheric background layer */}
      <WeatherLayer effect={weather.effect} />

      <HeaderSection weather={weather} />

      <ModeSelectionSection
        mode={mode}
        setMode={setMode}
        deviceOnline={deviceOnline}
      />

      {/* Manual Simulation Tools (only in simulation mode) */}
      {mode === "manual-simulation" && (
        <ManualSimulationSection
          temperature={temperature}
          setTemperature={setTemperature}
          humidity={humidity}
          setHumidity={setHumidity}
          pressure={pressure}
          setPressure={setPressure}
          weather={weather}
        />
      )}

      {/* Realtime Sensor Readings (only in sensor mode) */}
      {mode === "sensor" && (
        <SensorReadingsSection
          metricsPrimary={metricsPrimary}
          metricsDerived={metricsDerived}
          openKey={openKey}
          setOpenKey={setOpenKey}
          isVisible={mode === "sensor"}
        />
      )}

      {/* Historic chart (sensor mode only) */}
      {mode === "sensor" && <HistoryDataSection chartData={chartData} />}

      {/* Interpretation & weather status guides (simulation only) */}
      {mode === "manual-simulation" && <InterpretationGuideSection />}
      {mode === "manual-simulation" && <WeatherStatusGuideSection />}

      {/* MQTT Smart Controls (sensor mode only) */}
      {mode === "sensor" && (
        <SmartControlsSection
          brightness={brightness}
          setBrightness={setBrightness}
          speed={speed}
          setSpeed={setSpeed}
          currentWeather={currentWeather}
          setCurrentWeather={setCurrentWeather}
          publish={publish}
        />
      )}
    </div>
  );
}
