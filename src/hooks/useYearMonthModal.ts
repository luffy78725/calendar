import { useMemo, useReducer } from "react";
import { generateRange } from "../calendarUtils";
import { monthMapping } from "../constants";
import { ICalendarInfo } from "../types";

type SelectedDate = {
  month: number | string;
  year: number;
};

export type UseYearMonthModal = (calendarState: ICalendarInfo) => {
  months: [string, string][];
  years: number[];
  selectedDate: SelectedDate;
  setSelectedDate: React.Dispatch<Partial<SelectedDate>>;
};

const useYearMonthModal: UseYearMonthModal = (calendarState: ICalendarInfo) => {
  const [selectedDate, setSelectedDate] = useReducer(
    (prevVal: SelectedDate, newVal: Partial<SelectedDate>) => ({
      ...prevVal,
      ...newVal,
    }),
    {
      month: calendarState.currentMonth.value,
      year: calendarState.year,
    }
  );

  const months = useMemo(() => {
    return Object.entries(monthMapping);
  }, []);

  const years = useMemo(() => {
    return generateRange(1900, 2100, 1);
  }, []);

  return { months, years, selectedDate, setSelectedDate };
};

export default useYearMonthModal;
