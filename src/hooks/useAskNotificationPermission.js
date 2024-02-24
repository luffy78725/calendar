import { useEffect } from "react";

export default function useAskNotificationPermission() {
  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      new Notification("Hi there!");
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log(permission);
          new Notification("Hi there!", { body: "Permission granted" });
        }
      });
    }
  }, []);
}
