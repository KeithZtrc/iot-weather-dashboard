export const MQTT_BROKER = "wss://broker.hivemq.com:8884/mqtt";

export const MQTT_TOPICS = {
  status: "nes/finalsproject/g1weatherstation/status",
  data: "nes/finalsproject/g1weatherstation/data",
  ledBrightness: "nes/finalsproject/g1weatherstation/led/brightness",
  ledSpeed: "nes/finalsproject/g1weatherstation/led/speed",
  ledWeather: "nes/finalsproject/g1weatherstation/led/weather",
  servoPostion: "nes/finalsproject/g1weatherstation/servo/position",
  servoSpeed: "nes/finalsproject/g1weatherstation/servo/movement",
};

export const MQTT_CONFIG = {
  reconnectPeriod: 2000,
  clean: true,
};

export const MQTT_WATCHDOG_TIMEOUT = 10000;
