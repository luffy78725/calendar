import React, { FunctionComponent, PropsWithChildren, createContext } from "react";
import useCalendar, { UseCalendar } from "../hooks/useCalendar";
import { ICalendarInfo } from "../types";

export const CalendarContext = createContext<ReturnType<UseCalendar>>({
  calendarState: {} as ICalendarInfo,
  populateDays: () => {},
});

export const CalendarProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const calendarInfo = useCalendar({});

  return (
    <CalendarContext.Provider value={calendarInfo}>
      {children}
    </CalendarContext.Provider>
  );
};
