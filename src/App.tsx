import React, { useEffect } from "react";
import { Calendar } from "./components/calendar";
import { CalendarProvider } from "./context/CalendarContext";

function App() {

  useEffect(() => {

  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
   new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log(permission)
        new Notification("Hi there!", { body: "Permission granted"});
      }
    });

  }

    setTimeout(() => {
        console.log("inside setInterval")
        new Notification("Hi there!", { body: "Permission granted"});
    }, 1000)
}, [])


  return (
    <CalendarProvider>
      <Calendar />
    </CalendarProvider>
  );
}

export default App;
