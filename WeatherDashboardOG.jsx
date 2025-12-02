import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import sunnyAnim from "./lottie/sunny.json";
import rainyAnim from "./lottie/rainy.json";
import cloudyAnim from "./lottie/cloudy.json";
import fogAnim from "./lottie/fog.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import mqtt from "mqtt";
import WeatherLayer from "./weatherLayer.jsx";
import { useMqttPublisher } from "./hooks/useMqttPublisher";

// SVG Icons
const TempIcon = ({ className = "w-6 h-6", stroke = "currentColor" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 6V5C15 3.34315 13.6569 2 12 2C10.3431 2 9 3.34315 9 5V11.3477C9 11.6857 8.82505 11.9957 8.56141 12.2072C7.30465 13.2152 6.5 14.7636 6.5 16.5C6.5 19.5376 8.96243 22 12 22C15.0376 22 17.5 19.5376 17.5 16.5C17.5 14.7636 16.6954 13.2152 15.4386 12.2072C15.1749 11.9957 15 11.6857 15 11.3477V10"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M14.4998 16.5C14.4998 17.8807 13.3805 19 11.9998 19C10.619 19 9.49976 17.8807 9.49976 16.5C9.49976 15.1193 10.619 14 11.9998 14C13.3805 14 14.4998 15.1193 14.4998 16.5Z"
      stroke={stroke}
      strokeWidth="1.5"
    />
    <path
      d="M12 14V12M12 5V8"
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const HumIcon = ({ className = "w-6 h-6", stroke = "currentColor" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 14.5714C20 18.7526 16.3364 22 12 22C7.66359 22 4 18.7526 4 14.5714C4 12 5.30472 9.45232 6.71637 7.42349C8.1468 5.36767 9.79177 3.69743 10.6777 2.85537M20 14.5714L10.6777 2.85537M20 14.5714C20 12 18.6953 9.45232 17.2836 7.42349C15.8532 5.36767 14.2082 3.69743 13.3223 2.85537C12.5778 2.14778 11.4222 2.14778 10.6777 2.85537M20 14.5714L10.6777 2.85537"
      stroke={stroke}
      strokeWidth="2"
    />
    <path
      d="M12 18C11.4747 18 10.9546 17.8965 10.4693 17.6955C9.98396 17.4945 9.54301 17.1999 9.17157 16.8284C8.80014 16.457 8.5055 16.016 8.30448 15.5307C8.10346 15.0454 8 14.5253 8 14"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PresIcon = ({ className = "w-6 h-6", stroke = "currentColor" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.6933 17.3294C21.0506 15.9959 21.0964 14.5982 20.8271 13.2442C20.5577 11.8902 19.9806 10.6164 19.1402 9.52115C18.2998 8.42593 17.2187 7.53872 15.9806 6.92815C14.7425 6.31757 13.3805 6 12 6C10.6195 6 9.25752 6.31757 8.0194 6.92815C6.78128 7.53872 5.70021 8.42593 4.85982 9.52115C4.01943 10.6164 3.44225 11.8902 3.17293 13.2442C2.90361 14.5982 2.94937 15.9959 3.30667 17.3294"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M12.7657 15.5823C13.2532 16.2916 12.9104 17.3738 12 17.9994C11.0897 18.625 9.95652 18.5571 9.46906 17.8477C8.94955 17.0917 7.15616 12.8409 6.06713 10.2114C5.86203 9.71621 6.4677 9.3 6.85648 9.669C8.92077 11.6283 12.2462 14.8263 12.7657 15.5823Z"
      stroke={stroke}
      strokeWidth="2"
    />
    <path d="M12 6V8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M5.63599 8.63574L7.0502 10.05"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18.364 8.63574L16.9498 10.05"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20.6934 17.3291L18.7615 16.8115"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M3.30664 17.3291L5.23849 16.8115"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const HeatIcon = ({ className = "w-6 h-6" }) => (
  <svg
    viewBox="0 0 32 32"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.472 1.015c-16.746 15.010 14.885 14.399-5.385 29.548 9.012-15.187-20.731-17.718 5.385-29.548zM8.799 6.381c-6.122 10.362 10.36 11.45 3.81 22.899 2.7-9.438-14.683-14.474-3.81-22.899zM21.149 3.040c-5.661 9.675 13.886 12.748 1.921 22.484 6.583-9.698-13.416-13.912-1.921-22.484z" />
  </svg>
);

const DewIcon = ({ className = "w-6 h-6", fill = "currentColor" }) => (
  <svg
    viewBox="0 0 512 512"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
  >
    <path d="M20.44 20.26v64.66C130.8 72.49 291.4 112.6 370.5 191.6c-85.9-43.8-244.7-73.2-350.06-64v84.5C88.45 328.6 217.2 253.7 325.8 222c61-11.5 72.7 19.7 108.2 30.2-11.5-20.6-22.4-39.3-32.8-56.3 23.3-9.9 39.8-33 39.8-59.9 0-35.8-29.2-65-65-65-19.3 0-36.7 8.53-48.7 22-58.6-64.95-101.4-66.71-157.4-72.74H20.44zM373.8 88.08c5.7-.07 11.6.94 17.7 3.27-28.8 4.05-34.2 63.55 27 52.75 10.5-1.9-3.6 29.9-26.5 37.1-19.5-31-37.3-55.8-53.7-75.6 9.1-10.29 21.4-17.33 35.5-17.52zM432 286.5l-7.7 12.9s-12.3 20.4-24.5 46.8C387.6 372.7 375 405 375 432c0 14.7 7.7 28.4 18.2 38.8 10.4 10.5 24.1 18.2 38.8 18.2 14.7 0 28.4-7.7 38.8-18.2 10.5-10.4 18.2-24.1 18.2-38.8 0-27-12.6-59.3-24.8-85.8-12.2-26.4-24.5-46.8-24.5-46.8l-7.7-12.9zm-20.1 77c-16.6 49.1-12.6 99 58.7 72-2.7 26.2-43.6 56.9-71.5 15.4-12.1-18-12.7-50.1 12.8-87.4z" />
  </svg>
);

const AbsHumIcon = ({ className = "w-6 h-6", fill = "currentColor" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <path
      d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.28729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62883 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7286 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z"
      fill={fill}
    />
    <path
      d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7286 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62883 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5283 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.128 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2888 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.128 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5283 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0281 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0281 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
      fill={fill}
    />
    <path
      d="M14.1296 11.5308C14.8899 11.2847 15.4728 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62884 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7286 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z"
      fill={fill}
    />
  </svg>
);

export default function WeatherDashboard() {
  const [mode, setMode] = useState("simulation");
  const [deviceOnline, setDeviceOnline] = useState(false);
  const [mqttClient, setMqttClient] = useState(null);
  const { publish } = useMqttPublisher(mqttClient);

  // fundamental states
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [pressure, setPressure] = useState(101.3);
  const [heatIndex, setHeatIndex] = useState(26);
  const [dewPoint, setDewPoint] = useState(18);
  const [absHumidity, setAbsHumidity] = useState(14);

  // Smart control states
  const [brightness, setBrightness] = useState(1);
  const [speed, setSpeed] = useState(1);
  const brightnessLevels = [50, 128, 255];
  const speedLevels = [20, 50, 100];

  const [openKey, setOpenKey] = useState(null);

  // chart data
  const [chartData, setChartData] = useState([
    { time: "0:00", temp: 25, hum: 60, pres: 101.3 },
  ]);

  const metricInfo = {
    temp: "Temperature represents the ambient air temperature measured in °C.",
    hum: "Humidity represents the percentage of moisture present in the air.",
    pres: "Atmospheric pressure in kilopascals, indicating air compression.",
    heat: "Heat Index represents how hot it feels when humidity is factored in.",
    dew: "Dew point indicates the temperature at which moisture condenses.",
    abs: "Absolute humidity is the actual mass of water vapor per cubic meter of air.",
  };

  const SectionHeader = ({ title, subtitle, icon }) => {
    return (
      <div className="flex items-center gap-6 mb-8 mt-1">
        {/* Icon container */}
        <div
          className="
        p-4 rounded-2xl
        bg-white/20
        backdrop-blur-2xl
        shadow-lg
        border border-white/30
        ring-1 ring-black/5
        transition-all duration-300
      "
        >
          <div className="text-3xl drop-shadow-sm">{icon}</div>
        </div>

        {/* Title & subtitle */}
        <div className="flex flex-col">
          <h2
            className="
          text-3xl
          font-extrabold
          tracking-tight
          text-gray-900
          drop-shadow-sm
        "
          >
            {title}
          </h2>

          {subtitle && (
            <p
              className="
            text-base
            text-gray-700/80
            mt-2
            leading-snug
          "
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    );
  };

  // live update simulation
  useEffect(() => {
    if (mode !== "simulation") return;

    const interval = setInterval(() => {
      const temp = +(20 + Math.random() * 15).toFixed(1);
      const hum = +(40 + Math.random() * 60).toFixed(0);

      // PRESSURE NOW IN kPa (same scale as sensor)
      const pres = +(100 + Math.random() * 5).toFixed(1);

      const derived = computeDerived(temp, hum, pres);

      setTemperature(temp);
      setHumidity(hum);
      setPressure(pres);
      setHeatIndex(derived.heatIndex);
      setDewPoint(derived.dewPoint);
      setAbsHumidity(derived.absHumidity);

      setChartData((prev) => [
        ...prev.slice(-14),
        {
          time: new Date().toLocaleTimeString().slice(0, 5),
          temp,
          hum,
          pres,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, [mode]);

  useEffect(() => {
    if (mode !== "sensor") {
      setDeviceOnline(false);
      return;
    }

    console.log("Connecting to MQTT…");

    const client = mqtt.connect("wss://broker.hivemq.com:8884/mqtt", {
      reconnectPeriod: 2000,
      clean: true,
    });

    setMqttClient(client);

    // Track the time of the last message
    let lastMessageTime = Date.now();

    client.on("connect", () => {
      console.log("MQTT connected.");
      client.subscribe("nes/finalsproject/g1weatherstation/status");
      client.subscribe("nes/finalsproject/g1weatherstation/data");
    });

    client.on("message", (topic, message) => {
      let parsed;

      try {
        parsed = JSON.parse(message.toString());
      } catch {
        console.error("Invalid JSON:", message.toString());
        return;
      }

      const now = Date.now();
      lastMessageTime = now;

      // ----- STATUS -----
      if (topic.endsWith("/status") && typeof parsed.online === "boolean") {
        setDeviceOnline(parsed.online);
        return;
      }

      // ----- DATA -----
      if (topic.endsWith("/data")) {
        setDeviceOnline(true);

        const { temperature: temp, humidity: hum, pressure: pres } = parsed;

        if (temp != null) setTemperature(temp);
        if (hum != null) setHumidity(hum);
        if (pres != null) setPressure(pres);

        const derived = computeDerived(temp, hum, pres);
        setHeatIndex(derived.heatIndex);
        setDewPoint(derived.dewPoint);
        setAbsHumidity(derived.absHumidity);

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

    // ----- Watchdog -----
    const watchdog = setInterval(() => {
      if (Date.now() - lastMessageTime > 10000) {
        setDeviceOnline(false);
      }
    }, 2000);

    return () => {
      clearInterval(watchdog);
      client.end(true);
    };
  }, [mode]);

  function getStatusColor(percent) {
    if (percent < 0.25) return "#3b82f6";
    if (percent < 0.5) return "#10b981";
    if (percent < 0.75) return "#f59e0b";
    return "#ef4444";
  }

  function normalize(value, min, max) {
    const pct = (value - min) / (max - min);
    return Math.min(Math.max(pct, 0), 1);
  }

  function computeDerived(temp, hum, pres) {
    const heatIndex =
      -8.784695 +
      1.61139411 * temp +
      2.338549 * hum -
      0.14611605 * temp * hum -
      0.012308094 * temp * temp -
      0.016424828 * hum * hum +
      0.002211732 * temp * temp * hum +
      0.00072546 * temp * hum * hum -
      0.000003582 * temp * temp * hum * hum;

    const dewPoint = temp - (100 - hum) / 5;

    const absHumidity =
      (6.112 * Math.exp((17.67 * temp) / (temp + 243.5)) * hum * 2.1674) /
      (273.15 + temp);

    return {
      heatIndex: +heatIndex.toFixed(1),
      dewPoint: +dewPoint.toFixed(1),
      absHumidity: +absHumidity.toFixed(1),
    };
  }

  // determine weather status
  function getWeatherStatus(temp, hum) {
    if (hum > 85)
      return {
        desc: "Rainy",
        bg: "linear-gradient(135deg, #a0c4ff 0%, #3a7bd5 100%)",
        lottie: rainyAnim,
        effect: "rain",
      };
    if (temp > 35)
      return {
        desc: "Hot",
        bg: "linear-gradient(135deg, #ffe29f 0%, #ff7e5f 100%)",
        lottie: sunnyAnim,
        effect: "heat",
      };
    if (temp < 15)
      return {
        desc: "Cold",
        bg: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        lottie: fogAnim,
        effect: "snow",
      };
    if (hum > 60)
      return {
        desc: "Cloudy",
        bg: "linear-gradient(135deg, #d7d2cc 0%, #304352 100%)",
        lottie: cloudyAnim,
        effect: "clouds",
      };
    return {
      desc: "Sunny",
      bg: "linear-gradient(135deg, #fddb92 0%, #d1fdff 100%)",
      lottie: sunnyAnim,
      effect: "sunny",
    };
  }
  const weather = getWeatherStatus(temperature, humidity);

  const metricsTop = [
    {
      key: "temp",
      label: "Temperature",
      value: temperature,
      unit: "°C",
      Icon: TempIcon,
      min: 0,
      max: 40,
      description: metricInfo.temp,
    },
    {
      key: "hum",
      label: "Humidity",
      value: humidity,
      unit: "%",
      Icon: HumIcon,
      min: 0,
      max: 100,
      description: metricInfo.hum,
    },
    {
      key: "pres",
      label: "Pressure",
      value: pressure.toFixed(1),
      unit: " kPa",
      Icon: PresIcon,
      min: 95,
      max: 105,
      description: metricInfo.pres,
    },
  ];

  const metricsBottom = [
    {
      key: "heat",
      label: "Heat Index",
      value: heatIndex,
      unit: "°C",
      Icon: HeatIcon,
      min: 10,
      max: 45,
      description: metricInfo.heat,
    },
    {
      key: "dew",
      label: "Dew Point",
      value: dewPoint,
      unit: "°C",
      Icon: DewIcon,
      min: 0,
      max: 25,
      description: metricInfo.dew,
    },
    {
      key: "abs",
      label: "Absolute Humidity",
      value: absHumidity,
      unit: " g/m³",
      Icon: AbsHumIcon,
      min: 0,
      max: 25,
      description: metricInfo.abs,
    },
  ];

  const MetricCard = React.memo(function MetricCard({
    label,
    value,
    unit,
    Icon,
    min,
    max,
    description,
    openKey,
    setOpenKey,
    metricKey,
  }) {
    const ref = React.useRef(null);

    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    useEffect(() => {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          setOpenKey(null);
        }
      }
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [setOpenKey]);

    const isOpen = openKey === metricKey;
    const isBottomMetric = ["heat", "dew", "abs"].includes(metricKey);

    // Compute UI locally
    const arcPercent = normalize(value, min, max);
    const arcColor = getStatusColor(arcPercent);

    return (
      <div
        ref={ref}
        className="relative bg-white rounded-xl shadow-md p-5 flex items-center gap-4 min-h-[88px]
                 transition-shadow duration-200 hover:shadow-xl cursor-pointer"
        onMouseEnter={() => !isTouch && setOpenKey(metricKey)}
        onMouseLeave={() => !isTouch && setOpenKey(null)}
      >
        {/* Icon */}
        <div
          className={`rounded-md p-3 bg-gradient-to-tr ${
            metricKey === "temp"
              ? "from-red-500 to-orange-300"
              : metricKey === "hum"
              ? "from-sky-400 to-blue-600"
              : metricKey === "pres"
              ? "from-yellow-300 to-yellow-500"
              : metricKey === "heat"
              ? "from-red-600 to-orange-500"
              : metricKey === "dew"
              ? "from-teal-400 to-emerald-500"
              : "from-gray-500 to-gray-700"
          } shadow`}
        >
          <div className="text-white">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Label + Value */}
        <div className="flex-1">
          <div className="text-sm text-gray-600 font-medium flex items-center justify-between">
            <span>{label}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {value}
            {unit && unit}
          </div>
        </div>

        {/* Popover */}
        {isOpen && (
          <div
            className={`absolute w-56 z-20 bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-4
                      shadow-[0_8px_30px_rgb(0_0_0/0.12)] text-sm text-gray-800 cursor-pointer
                      animate-fadeInScale transition-all duration-200 ease-out
                      hover:bg-white/70 hover:shadow-[0_12px_35px_rgb(0_0_0/0.16)]
                      ${
                        isBottomMetric
                          ? "right-4 bottom-full mb-3"
                          : "right-4 top-full mt-3"
                      }`}
          >
            {description}
          </div>
        )}

        {/* Arc indicator */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
          <svg width="52" height="52">
            <circle
              cx="26"
              cy="26"
              r="22"
              strokeWidth="6"
              stroke={arcColor}
              strokeDasharray={`${arcPercent * 138} 138`}
              strokeLinecap="round"
              fill="none"
              transform="rotate(-90 26 26)"
            />
          </svg>
        </div>
      </div>
    );
  });

  const ThreeLevelPillSlider = ({
    label,
    description,
    value,
    onChange,
    colors = {},
  }) => {
    const levels = ["Low", "Medium", "High"];

    return (
      <motion.div
        whileHover={{ scale: 1.015 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="
        relative rounded-2xl p-6
        bg-white/30 backdrop-blur-2xl
        border border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]
        overflow-hidden
      "
      >
        {/* Decorative floating glows */}
        <motion.div
          animate={{ x: [0, 6, -6, 0], y: [0, -5, 4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-teal-400/20 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -4, 4, 0], y: [0, 4, -3, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 rounded-full bg-blue-300/20 blur-2xl"
        />

        {/* Label and Description */}
        <div className="mb-5">
          <p className="text-gray-900/90 font-semibold tracking-wide text-sm font-bold">
            {label}
          </p>

          {description && (
            <p className="text-xs text-gray-600/80 leading-relaxed mt-1">
              {description}
            </p>
          )}
        </div>

        {/* Outer pill */}
        <div
          className="
          relative flex rounded-full p-2 h-14
          bg-white/40 backdrop-blur-xl border border-white/50
          shadow-inner
        "
        >
          {/* Active selection indicator */}
          <motion.div
            layout
            className="absolute top-2 bottom-2 rounded-full"
            style={{
              left: `${value * 33.33}%`,
              width: "33.33%",
              background: colors.active,
            }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
          />

          {/* Buttons */}
          {levels.map((lvl, i) => (
            <motion.button
              key={lvl}
              onClick={() => onChange(i)}
              whileTap={{ scale: 0.92 }}
              className={`
              z-10 flex-1 flex items-center justify-center
              font-semibold text-sm tracking-wide
              transition-colors duration-200
              ${
                value === i
                  ? "text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
                  : "text-gray-700 hover:text-gray-900"
              }
            `}
            >
              {lvl}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: weather.bg }}
    >
      <WeatherLayer effect={weather.effect} />

      {/* HEADER */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="relative rounded-2xl -mx-6 p-6 bg-white/40 backdrop-blur-xl shadow-md border border-white/20">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="flex items-center gap-6 flex-1">
              <div>
                <h1
                  className="text-4xl md:text-5xl font-extrabold tracking-tight
                         text-transparent bg-clip-text
                         bg-gradient-to-r from-blue-600 to-teal-500"
                >
                  LIVE WEATHER INSIGHTS
                </h1>
                <p className="mt-1 text-sm text-gray-700/80">
                  Real-time atmospheric metrics and trends
                </p>
              </div>

              <div className="w-20 h-20 md:w-32 md:h-32 flex-shrink-0 cursor-pointer">
                <Lottie animationData={weather.lottie} loop />
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end space-y-2">
              <div
                className="px-4 py-2 bg-white/80 backdrop-blur-xl rounded-xl
               shadow-lg border border-white/50
               text-sm font-semibold text-gray-900 cursor-pointer"
              >
                {weather.desc}
              </div>

              <div className="text-[11px] text-gray-600 font-medium tracking-wide text-right leading-tight space-y-[1px]">
                <div>
                  {new Date().toLocaleDateString([], {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="text-[10px] opacity-80">
                  {new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODE SELECTION */}
      <div className="max-w-7xl mx-auto mb-10">
        <div
          className="
            relative rounded-2xl  p-6
            bg-white/40 backdrop-blur-xl
            shadow-[0_8px_25px_rgba(0,0,0,0.08)]
            border border-white/20
            overflow-hidden
          "
        >
          {/* Soft floating background glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-300/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-300/20 blur-2xl rounded-full pointer-events-none" />

          {/* Header */}
          <SectionHeader
            title="Data Source Mode"
            subtitle="Use live ESP32 sensor telemetry or switch to smooth simulation mode"
            icon={<span className="text-6xl cursor-pointer">⚙️</span>}
          />

          {/* MODE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            {/* SIMULATION CARD */}
            <button
              onClick={() => setMode("simulation")}
              className={`
          group relative p-6 rounded-2xl text-left transition-all
          bg-white/50 backdrop-blur-xl border shadow-sm
          hover:shadow-xl hover:-translate-y-1
          ${
            mode === "simulation"
              ? "border-teal-500/40 shadow-[0_0_25px_rgba(20,184,166,0.3)]"
              : "border-white/30"
          }
        `}
            >
              {/* Active glow */}
              {mode === "simulation" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-300/30 to-blue-300/10 blur-xl opacity-60" />
              )}

              <div className="relative z-10 flex items-center gap-4">
                <div className="text-5xl">🧪</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Simulation Mode
                  </h3>
                  <p className="text-sm text-gray-700/80">
                    Smooth synthetic readings for UI testing.
                  </p>
                </div>
              </div>
            </button>

            {/* SENSOR CARD */}
            <button
              onClick={() => setMode("sensor")}
              className={`
          group relative p-6 rounded-2xl text-left transition-all
          bg-white/50 backdrop-blur-xl border shadow-sm
          hover:shadow-xl hover:-translate-y-1
          ${
            mode === "sensor"
              ? "border-blue-500/40 shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              : "border-white/30"
          }
        `}
            >
              {/* Active glow */}
              {mode === "sensor" && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/30 to-cyan-300/10 blur-xl opacity-60" />
              )}

              <div className="relative z-10 flex items-center gap-4">
                <div className="text-5xl">📡</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Sensor Mode
                  </h3>
                  <p className="text-sm text-gray-700/80">
                    Real-time ESP32 telemetry via MQTT.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* STATUS SECTION */}
          <div className="mt-8">
            {/* Badge */}
            <span
              className={`
          px-4 py-2 rounded-full text-sm font-semibold tracking-wide
          backdrop-blur-xl border transition-all shadow-lg
          ${
            mode === "simulation"
              ? "bg-gray-300/50 text-gray-900 border-gray-200/40"
              : deviceOnline
              ? "bg-green-500/90 text-white border-green-400/40 shadow-[0_0_12px_rgba(34,197,94,0.6)]"
              : "bg-red-500/90 text-white border-red-400/40 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
          }
        `}
            >
              {mode === "simulation"
                ? "Simulation Active"
                : deviceOnline
                ? "Device Online"
                : "Device Offline"}
            </span>
          </div>
        </div>
      </div>

      {/* SENSOR READINGS SECTION */}
      <div
        className="max-w-7xl mx-auto rounded-2xl px-6 py-8
                bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
      >
        <SectionHeader
          title="Sensor Readings"
          subtitle="Live atmospheric parameters updating every 3 seconds"
          icon={<span className="text-6xl cursor-pointer">📡</span>}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metricsTop.map((metric) => (
            <MetricCard
              key={metric.key}
              metricKey={metric.key}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              Icon={metric.Icon}
              min={metric.min}
              max={metric.max}
              description={metric.description}
              openKey={openKey}
              setOpenKey={setOpenKey}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {metricsBottom.map((metric) => (
            <MetricCard
              key={metric.key}
              metricKey={metric.key}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              Icon={metric.Icon}
              min={metric.min}
              max={metric.max}
              description={metric.description}
              openKey={openKey}
              setOpenKey={setOpenKey}
            />
          ))}
        </div>
      </div>

      {/* HISTORY DATA SECTION */}
      <div
        className="max-w-7xl mx-auto rounded-2xl px-6 py-8
             bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
      >
        <SectionHeader
          title="History Data Graphs"
          subtitle="Trend visualization for temperature, humidity and pressure"
          icon={<span className="text-6xl cursor-pointer">📈</span>}
        />

        {/* CHART GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { key: "temp", label: "Temperature (°C)", color: "#0f62fe" },
            { key: "hum", label: "Humidity (%)", color: "#006943" },
            { key: "pres", label: "Pressure (kPa)", color: "#f39c12" },
          ].map((c) => {
            const yDomain =
              c.key === "pres"
                ? [(dataMin) => dataMin - 0.05, (dataMax) => dataMax + 0.05]
                : ["auto", "auto"];

            return (
              <div
                key={c.key}
                className="bg-white rounded-xl shadow-md p-4
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <div className="text-sm text-gray-700 mb-2">{c.label}</div>
                <div className="w-full h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="time" stroke="#333" />
                      <YAxis stroke="#333" domain={yDomain} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey={c.key}
                        stroke={c.color}
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERPRETATION SECTION */}
      <div
        className="max-w-7xl mx-auto rounded-2xl px-6 py-8
         bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10"
      >
        <SectionHeader
          title="Atmospheric Interpretation Guide"
          subtitle="Quick understanding of what each reading means for comfort, safety, and environment"
          icon={<span className="text-6xl cursor-pointer">🧭</span>}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* TEMPERATURE GUIDE */}
          <div
            className="rounded-2xl p-6 bg-gradient-to-br from-red-50/60 to-orange-100/60
                    backdrop-blur-xl border border-white/30 shadow-lg
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🌡️</span>
              <h3 className="text-lg font-bold text-gray-900">Temperature</h3>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>Below 18°C — Cool Zone</strong>
                <br />
                Air feels crisp; may require light layering for comfort.
              </div>
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>18°C – 26°C — Comfort Zone</strong>
                <br />
                Ideal indoor & outdoor conditions for most people.
              </div>
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <strong>Above 30°C — Heat Stress Risk</strong>
                <br />
                Prolonged exposure may cause fatigue; ensure hydration.
              </div>
            </div>
          </div>

          {/* HUMIDITY GUIDE */}
          <div
            className="rounded-2xl p-6 bg-gradient-to-br from-blue-50/60 to-teal-100/60
                    backdrop-blur-xl border border-white/30 shadow-lg
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💧</span>
              <h3 className="text-lg font-bold text-gray-900">Humidity</h3>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>Below 30% — Dry Air</strong>
                <br />
                Can cause dry skin, static, and respiratory irritation.
              </div>
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>30% – 60% — Ideal Humidity</strong>
                <br />
                Optimal for comfort, productivity, and indoor plants.
              </div>
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>Above 70% — High Moisture</strong>
                <br />
                Increases mold growth, heat perception, and stickiness.
              </div>
            </div>
          </div>

          {/* PRESSURE GUIDE */}
          <div
            className="rounded-2xl p-6 bg-gradient-to-br from-purple-50/60 to-indigo-100/60
                    backdrop-blur-xl border border-white/30 shadow-lg
                    transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🌀</span>
              <h3 className="text-lg font-bold text-gray-900">Pressure</h3>
            </div>

            <div className="space-y-3 text-sm text-gray-700">
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>Below 100.0 kPa — Low Pressure</strong>
                <br />
                Often signals unstable weather or rain approaching.
              </div>
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>100.0 – 103.0 kPa — Normal Range</strong>
                <br />
                Usually calm, stable atmospheric conditions.
              </div>
              <div
                className="p-3 bg-white/60 border border-white/40 rounded-xl shadow-sm
              transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              >
                <strong>Above 103.0 kPa — High Pressure</strong>
                <br />
                Clear skies but may contribute to dry air and headaches.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SMART CONTROLS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
    max-w-7xl mx-auto rounded-2xl px-6 py-8
    bg-white/40 backdrop-blur-xl shadow-md border border-white/20 mb-10
    relative overflow-hidden
  "
      >
        {/* Floating Glow (performance-safe: transform only) */}
        <motion.div
          animate={{ x: [0, 10, -10, 0], y: [0, -8, 6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-300/20 blur-3xl"
        />

        <SectionHeader
          title="Smart Controls"
          subtitle="Interact with connected systems and adjust environmental responses"
          icon={<span className="text-6xl cursor-pointer">🎛️</span>}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <ThreeLevelPillSlider
            label="Brightness"
            description="Controls overall luminosity of LED matrix."
            value={brightness}
            onChange={(i) => {
              setBrightness(i);
              publish(
                "nes/finalsproject/g1weatherstation/led/brightness",
                brightnessLevels[i]
              );
            }}
            colors={{ active: "linear-gradient(135deg, #ffbb55, #ff8855)" }}
          />

          <ThreeLevelPillSlider
            label="Animation Speed"
            description="Adjusts the tempo at which LED animations play."
            value={speed}
            onChange={(i) => {
              setSpeed(i);
              publish(
                "nes/finalsproject/g1weatherstation/led/speed",
                speedLevels[i]
              );
            }}
            colors={{ active: "linear-gradient(135deg, #4f8ef7, #3ac0f8)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
