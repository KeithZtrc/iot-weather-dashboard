import React, { useState } from "react";

import { useMqttPublisher } from "./hooks/useMqttPublisher.js";
import { useSimulation } from "./hooks/useSimulation.js";
import { useMqttSensor } from "./hooks/useMqttSensor.js";

import { getMetricsPrimary, getMetricsDerived } from "./utils/metricsConfig.js";
import { getWeatherStatus } from "./utils/weatherUtils.js";

import { INITIAL_STATE } from "./constants/initialState.js";

import WeatherLayer from "./components/WeatherLayer.jsx";
import HeaderSection from "./components/HeaderSection.jsx";
import ModeSelectionSection from "./components/ModeSelectionSection.jsx";
import SensorReadingsSection from "./components/SensorReadingsSection.jsx";
import HistoryDataSection from "./components/HistoryDataSection.jsx";
import InterpretationGuideSection from "./components/InterpretationGuideSection.jsx";
import SmartControlsSection from "./components/SmartControlsSection.jsx";

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
     CORE MODE + DEVICE STATUS
  ----------------------------------------------------------- */
  const [mode, setMode] = useState(INITIAL_STATE.mode);
  const [deviceOnline, setDeviceOnline] = useState(INITIAL_STATE.deviceOnline);

  /* MQTT client instance */
  const [mqttClient, setMqttClient] = useState(null);
  const { publish } = useMqttPublisher(mqttClient);

  /* -----------------------------------------------------------
     SENSOR METRICS (Primary + Derived)
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

  const [openKey, setOpenKey] = useState(INITIAL_STATE.openKey);

  /* Chart: sparkline of last N readings */
  const [chartData, setChartData] = useState(INITIAL_STATE.chartData);

  /* -----------------------------------------------------------
     MODE-DEPENDENT DATA PIPELINES
  ----------------------------------------------------------- */

  // SIMULATION MODE (synthetic data)
  useSimulation(
    mode,
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
  const weather = getWeatherStatus(temperature, humidity);
  const metricsPrimary = getMetricsPrimary(temperature, humidity, pressure);
  const metricsDerived = getMetricsDerived(heatIndex, dewPoint, absHumidity);

  /* -----------------------------------------------------------
     RENDER
  ----------------------------------------------------------- */
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: weather.bg }}
    >
      {/* Dynamic gradient/atmospheric overlay */}
      <WeatherLayer effect={weather.effect} />

      <HeaderSection weather={weather} />

      <ModeSelectionSection
        mode={mode}
        setMode={setMode}
        deviceOnline={deviceOnline}
      />

      <SensorReadingsSection
        metricsPrimary={metricsPrimary}
        metricsDerived={metricsDerived}
        openKey={openKey}
        setOpenKey={setOpenKey}
      />

      <HistoryDataSection chartData={chartData} />

      <InterpretationGuideSection />

      <SmartControlsSection
        brightness={brightness}
        setBrightness={setBrightness}
        speed={speed}
        setSpeed={setSpeed}
        publish={publish}
      />
    </div>
  );
}
