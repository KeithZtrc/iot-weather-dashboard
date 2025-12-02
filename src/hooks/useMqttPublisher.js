import { useCallback } from "react";

/* ==========================================================
   useMqttPublisher
   ----------------------------------------------------------
   A small utility hook that exposes a stable `publish`
   function for sending MQTT messages.

   - Ensures referential stability using useCallback
   - Prevents calls when the client is not connected
   - Centralizes MQTT publishing logic
========================================================== */

export function useMqttPublisher(client) {
  const publish = useCallback(
    (topic, message) => {
      // Ignore publish attempts if client isn't ready
      if (!client || !client.isConnected()) return;

      // QoS = 0, retain = false by default
      client.send(topic, message, 0, false);
    },
    [client]
  );

  return { publish };
}
