import { Days, Calendar, CalendarClass } from "./calendar";

export type PopulateMonthDaysParam = Parameters<
  typeof CalendarClass.populateMonthDays
>;

export interface ICalendar {
  populateMonthDays: (...params: PopulateMonthDaysParam) => Calendar;
}

export enum MonthType {
  NEXT = "next",
  PREVIOUS = "previous",
  CURRENT = "current",
}

export type MonthDay = {
  day: number | string;
  sameMonth: boolean;
};

export type MonthInfo = {
  name: string;
  value: number;
};
export interface ICalendarInfo {
  currentMonth: MonthInfo;
  previousMonth: MonthInfo;
  year: number;
  days: Days;
}

export type MonthYearTuple = [number, number];

export type FillDaysGridParam = {
  totalDays: number;
  previousMonthtTotalDays: number;
  monthStartDay: number;
};

export type Meeting = {
  title: string;
};
