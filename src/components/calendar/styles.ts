import { ICalendarInfo, MonthDay } from "../../types";

export function getStyles(day: MonthDay, index: number) {
  return {
    background: !day.sameMonth ? "#f3f0f0" : "inherit",
    color: !day.sameMonth ? "grey" : "inherit",
    gridArea: `day${index}`,
  };
}

export const getDayStyles = (day: MonthDay, calendarState: ICalendarInfo) => {
  let isCurrentDate =
    calendarState.days.isCurrentDate(
      new Date(
        calendarState.year,
        calendarState.currentMonth.value,
        day.day as number
      )
    ) && day.sameMonth;

  return {
    borderRadius: "50%",
    background: isCurrentDate ? "rgba(0, 137, 255, 1)" : "inherit",
    color: isCurrentDate ? "white" : "inherit",
    fontWeight: isCurrentDate ? "bold" : "inherit",
    display: "inline-block",
    width: "1.5rem",
    height: "1.5rem",
    lineHeight: "1.5rem",
    textAlign: "center" as "center",
    margin: "0.2rem 0.2rem 0 0.2rem",
  };
};

