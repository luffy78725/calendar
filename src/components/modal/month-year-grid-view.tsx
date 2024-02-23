import React from 'react'
import styles from "./modal.module.css";
import useScrollIntoView from "../../hooks/useScrollIntoVIew";
import { IMonthYearGridView } from "./types";
import { getMonthClass, getYearStyles } from "./styles";

function classNames(...args: string[]) {
  return args.join(" ");
}

export default function MonthYearsGridView({
  years,
  months,
  calendarState,
  selectedDate,
  setSelectedDate,
  isMonthView,
}: IMonthYearGridView) {
  let element = document.getElementById(calendarState.year.toString());
  useScrollIntoView(element, [calendarState.year, isMonthView]);

  return (
    <>
      {months.map((month, index) => (
        <div
          className={classNames(
            styles.monthsGridItem,
            getMonthClass(
              selectedDate.month,
              month[0],
              calendarState.currentMonth
            )
          )}
          style={{ display: isMonthView ? "block" : "none" }}
          tabIndex={index}
          key={month[0]}
          onClick={() => setSelectedDate({ month: month[0] })}
        >
          {month[1]}
        </div>
      ))}
      {years.map((year) => (
        <div
          className={classNames(
            styles.monthsGridItem,
            getYearStyles(year, calendarState.year, selectedDate.year)
          )}
          style={{
            display: isMonthView ? "none" : "block",
          }}
          tabIndex={year}
          key={year}
          id={year.toString()}
          onClick={() => setSelectedDate({ year })}
        >
          {year}
        </div>
      ))}
    </>
  );
}
