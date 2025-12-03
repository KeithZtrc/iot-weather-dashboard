import React, { useState, useEffect } from "react";

import { useMqttPublisher } from "./hooks/useMqttPublisher.js";
import { useSimulation } from "./hooks/useSimulation.js";
import { useMqttSensor } from "./hooks/useMqttSensor.js";

import { getMetricsPrimary, getMetricsDerived } from "./utils/metricsConfig.js";
import { getWeatherStatus } from "./utils/weatherUtils.js";
import { computeDerived } from "./utils/weatherUtils.js";

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
   WEATHER DASHBOARD ROOT
   ---------------------------------------------------------------------
   Central Orchestrator:
   - Maintains core environmental states
   - Chooses between SIMULATION and SENSOR mode
   - Passes computed values to visual/UI components
   - Delegates:
       • MQTT sensor input
       • Simulation generator
       • Derived calculations pipeline
------------------------------------------------------------------------ */

export default function WeatherDashboard() {
  /* -----------------------------------------------------------
     CORE MODE and DEVICE STATUS
  ----------------------------------------------------------- */
  const [mode, setMode] = useState(INITIAL_STATE.mode);
  const [deviceOnline, setDeviceOnline] = useState(INITIAL_STATE.deviceOnline);

  /* MQTT client instance */
  const [mqttClient, setMqttClient] = useState(null);
  const { publish } = useMqttPublisher(mqttClient);

  /* -----------------------------------------------------------
     SENSOR METRICS (Primary and Derived)
  ----------------------------------------------------------- */
  const [temperature, setTemperature] = useState(INITIAL_STATE.temperature);
  const [humidity, setHumidity] = useState(INITIAL_STATE.humidity);
  const [pressure, setPressure] = useState(INITIAL_STATE.pressure);

  const [heatIndex, setHeatIndex] = useState(INITIAL_STATE.heatIndex);
  const [dewPoint, setDewPoint] = useState(INITIAL_STATE.dewPoint);
  const [absHumidity, setAbsHumidity] = useState(INITIAL_STATE.absHumidity);

  /* -----------------------------------------------------------
     UI CONTROL STATES
  ----------------------------------------------------------- */
  const [brightness, setBrightness] = useState(INITIAL_STATE.brightness);
  const [speed, setSpeed] = useState(INITIAL_STATE.speed);
  const [currentWeather, setCurrentWeather] = useState(INITIAL_STATE.weather);

  const [openKey, setOpenKey] = useState(INITIAL_STATE.openKey);

  /* Chart: sparkline of last N readings */
  const [chartData, setChartData] = useState(INITIAL_STATE.chartData);

  /* -----------------------------------------------------------
     SYNC DERIVED METRICS & CHART DATA
     Whenever primary metrics change, update derived values
     and append to chart history
  ----------------------------------------------------------- */
  useEffect(() => {
    const derived = computeDerived(temperature, humidity, pressure);
    setHeatIndex(derived.heatIndex);
    setDewPoint(derived.dewPoint);
    setAbsHumidity(derived.absHumidity);

    // Append to chart (keep last 20)
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
     MODE-DEPENDENT DATA PIPELINES
  ----------------------------------------------------------- */

  // SIMULATION MODE (synthetic data)
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

  // SENSOR MODE (MQTT data input)
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
     DERIVED VISUAL DATA
  ----------------------------------------------------------- */
  const weather = getWeatherStatus(temperature, humidity, pressure);
  const metricsPrimary = getMetricsPrimary(temperature, humidity, pressure);
  const metricsDerived = getMetricsDerived(heatIndex, dewPoint, absHumidity);

  /* -----------------------------------------------------------
     RENDER
  ----------------------------------------------------------- */
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic gradient/atmospheric overlay */}
      <WeatherLayer effect={weather.effect} />

      <HeaderSection weather={weather} />

      <ModeSelectionSection
        mode={mode}
        setMode={setMode}
        deviceOnline={deviceOnline}
      />

      {/* Show Manual Simulation FIRST in simulation mode */}
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

      {/* Show Sensor Readings only in sensor mode */}
      {mode === "sensor" && (
        <SensorReadingsSection
          metricsPrimary={metricsPrimary}
          metricsDerived={metricsDerived}
          openKey={openKey}
          setOpenKey={setOpenKey}
          isVisible={mode === "sensor"}
        />
      )}

      {/* Hide chart in simulation mode */}
      {mode !== "manual-simulation" && (
        <HistoryDataSection chartData={chartData} />
      )}

      {/* Show interpretation & status guides ONLY in simulation mode */}
      {mode === "manual-simulation" && <InterpretationGuideSection />}

      {mode === "manual-simulation" && <WeatherStatusGuideSection />}

      {/* Show Smart Controls only in sensor mode */}
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
