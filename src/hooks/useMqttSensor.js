import { useEffect } from "react";
import mqtt from "mqtt";
import { computeDerived } from "../utils/weatherUtils.js";
import {
  MQTT_BROKER,
  MQTT_TOPICS,
  MQTT_CONFIG,
  MQTT_WATCHDOG_TIMEOUT,
} from "../constants/mqttConfig.js";

/* =====================================================================
   useMqttSensor
   ---------------------------------------------------------------------
   Connects to the MQTT broker in "sensor" mode and listens to:

   - /status → updates online/offline indicator
   - /data   → updates environmental metrics and derived readings

   Includes:
   ✔ Watchdog that marks device offline if no messages arrive in time
   ✔ Graceful cleanup on unmount or mode change
   ✔ Chart history trimming to last 15 points
===================================================================== */

export function useMqttSensor(
  mode,
  setMqttClient,
  setDeviceOnline,
  setTemperature,
  setHumidity,
  setPressure,
  setLuminosity,
  setRainLevel,
  setWindSpeed,
  setWindDirection,
  setHeatIndex,
  setDewPoint,
  setAbsHumidity,
  setChartData
) {
  useEffect(() => {
    // If not in sensor mode, ensure UI reflects offline state
    if (mode !== "sensor") {
      setDeviceOnline(false);
      return;
    }

    console.log("Connecting to MQTT…");

    // ---------------------------------------------------------------
    // MQTT Connection
    // ---------------------------------------------------------------
    const client = mqtt.connect(MQTT_BROKER, MQTT_CONFIG);
    setMqttClient(client);

    // Tracks last received message for watchdog
    let lastMessageTime = Date.now();

    client.on("connect", () => {
      console.log("MQTT connected.");
      client.subscribe(MQTT_TOPICS.status);
      client.subscribe(MQTT_TOPICS.data);
    });

    // ---------------------------------------------------------------
    // MQTT Message Handler
    // ---------------------------------------------------------------
    client.on("message", (topic, rawMessage) => {
      let parsed;

      // Ensure valid JSON
      try {
        parsed = JSON.parse(rawMessage.toString());
      } catch {
        console.error("Invalid JSON:", rawMessage.toString());
        return;
      }

      lastMessageTime = Date.now();

      // ----- STATUS -------------------------------------------------
      if (topic.endsWith("/status") && typeof parsed.online === "boolean") {
        setDeviceOnline(parsed.online);
        return;
      }

      // ----- SENSOR DATA -------------------------------------------
      if (topic.endsWith("/data")) {
        setDeviceOnline(true);

        //const { temperature: temp, humidity: hum, pressure: pres } = parsed;

        const {
          temperature: temp,
          humidity: hum,
          pressure: pres,
          luminosity: lux,
          rainLevel: rain,
          windSpeed: wind,
          windDirection: dir,
        } = parsed;

        if (temp != null) setTemperature(temp);
        if (hum != null) setHumidity(hum);
        if (pres != null) setPressure(pres);
        if (lux != null) setLuminosity(lux);
        if (rain != null) setRainLevel(rain);
        if (wind != null) setWindSpeed(wind);
        if (dir != null) setWindDirection(dir);

        // Derive secondary metrics
        const derived = computeDerived(temp, hum, pres);
        setHeatIndex(derived.heatIndex);
        setDewPoint(derived.dewPoint);
        setAbsHumidity(derived.absHumidity);

        // Append new chart point, keep last 15 entries
        setChartData((prev) => [
          ...prev.slice(-14),
          {
            time: new Date().toLocaleTimeString().slice(0, 5),
            temp,
            hum,
            pres,
          },
        ]);
      }
    });

    // ---------------------------------------------------------------
    // Watchdog: declare device offline if no data for a while
    // ---------------------------------------------------------------
    const watchdog = setInterval(() => {
      if (Date.now() - lastMessageTime > MQTT_WATCHDOG_TIMEOUT) {
        setDeviceOnline(false);
      }
    }, 2000);

    // ---------------------------------------------------------------
    // Cleanup on mode change or unmount
    // ---------------------------------------------------------------
    return () => {
      clearInterval(watchdog);
      client.end(true);
    };
  }, [
    mode,
    setMqttClient,
    setDeviceOnline,
    setTemperature,
    setHumidity,
    setPressure,
    setLuminosity,
    setRainLevel,
    setWindSpeed,
    setWindDirection,
    setHeatIndex,
    setDewPoint,
    setAbsHumidity,
    setChartData,
  ]);
}
