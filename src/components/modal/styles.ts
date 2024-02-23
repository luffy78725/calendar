import { MonthInfo } from "../../types";
import { StringOrNumber } from "./types";
import styles from "./modal.module.css";

export function getYearStyles(
  year: StringOrNumber,
  currentYear: StringOrNumber,
  selectedYear: StringOrNumber
) {
  let isCurrentlySelected = year === selectedYear ?? year === currentYear;
  return isCurrentlySelected ? styles.activeYear : "";
}

export function getMonthClass(
  selectedMonth: StringOrNumber,
  month: string,
  currentMonth: MonthInfo
) {
  let isCurrentlySelected =
    selectedMonth.toString() === month ??
    month === currentMonth.value.toString();
  return isCurrentlySelected ? styles.activeMonth : "";
}
