import React, { useEffect, useState } from "react";
import { Calendar } from "./components/calendar";
import { CalendarProvider } from "./context/CalendarContext";
import axios, { AxiosResponse } from "axios";
import useAskNotificationPermission from "./hooks/useAskNotificationPermission";
import { Meeting } from "./types";

function App() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useAskNotificationPermission();

  useEffect(() => {
    axios
      .get<{ data: Meeting[] }>("http://localhost:8000/api/v1/meetings")
      .then((response: AxiosResponse<{ data: Meeting[] }>) => {
        setMeetings(response.data.data);
      });
  }, []);

  return (
    <CalendarProvider>
      <Calendar
        events={{
          meetings,
        }}
      />
    </CalendarProvider>
  );
}

export default App;
