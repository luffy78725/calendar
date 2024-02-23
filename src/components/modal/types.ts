import { UseYearMonthModal } from "../../hooks/useYearMonthModal";
import { ICalendarInfo } from "../../types";

export type UseYearMonthModalReturns = ReturnType<UseYearMonthModal>;
export type StringOrNumber = number | string;

export interface IMonthYearGridView {
  years: UseYearMonthModalReturns["years"];
  months: UseYearMonthModalReturns["months"];
  selectedDate: UseYearMonthModalReturns["selectedDate"];
  setSelectedDate: UseYearMonthModalReturns["setSelectedDate"];
  isMonthView: boolean;
  calendarState: ICalendarInfo;
}

export type ModalProps = {
  show: boolean;
  handleClose: () => void;
};

export enum ModalView {
  MONTH = "month",
  YEAR = "year",
}
