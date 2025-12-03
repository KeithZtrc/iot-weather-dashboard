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
      if (!client || !client.connected) return;

      client.publish(topic, String(message));
    },
    [client]
  );

  return { publish };
}
