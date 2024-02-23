import { useMemo, useRef, useState } from "react";
import { Calendar } from "../calendar";
import { ICalendarInfo, MonthType, PopulateMonthDaysParam } from "../types";

interface ICalendarParams {
  year?: number;
  month?: number;
}

export type UseCalendar = (props: ICalendarParams) => {
  calendarState: ICalendarInfo;
  populateDays: (...params: PopulateMonthDaysParam) => void;
};

const useCalendar: UseCalendar = ({ year, month }) => {
  const [rerender, setRerender] = useState(1);

  let calendarRef = useRef<null | Calendar>(null);
  calendarRef.current = useMemo(() => {
    return new Calendar(year, month);
  }, [year, month]);

  let calendarState = calendarRef.current.getCalendarState();

  function populateDays(monthType: MonthType, date?: Date) {
    calendarRef.current
      ?.populateMonthDays(monthType, date)
      .getCalendarState()
      .days.getDays();
    setRerender(rerender + 1);
  }

  return { calendarState, populateDays };
};

export default useCalendar;
