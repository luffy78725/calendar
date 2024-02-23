import { ICalendarInfo, MonthDay } from "../../types";

export const isCurrentDay = ( day: MonthDay, calendarState: ICalendarInfo) => {
return calendarState.days.isCurrentDate(
    new Date(
      calendarState.year,
      calendarState.currentMonth.value,
      day.day as number
    )
  ) && day.sameMonth;
}