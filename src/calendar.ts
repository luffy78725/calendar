import {
  arrayToGrid,
  generateDays,
  generateOtherCalendarStateValues,
  getNextDate,
  getPreviousDate,
} from "./calendarUtils";
import {
  ICalendar,
  ICalendarInfo,
  MonthDay,
  MonthInfo,
  MonthType,
} from "./types";

export class Days {
  private _days: MonthDay[] = [];
  constructor(days: MonthDay[]) {
    this._days = days;
  }

  isCurrentDate(date: Date) {
    return date.toDateString() === new Date().toDateString();
  }

  setDays(days: MonthDay[]) {
    this._days = days;
  }

  getDays() {
    return this._days;
  }

  formatDaysAsGrid() {
    return arrayToGrid(this._days);
  }
}
class Calendar implements ICalendar {
  private _initDate: Date = new Date();
  private _currentDisplayDate = new Date();
  private _days = new Days([]);
  private _calendarInfo: ICalendarInfo = {
    currentMonth: {} as MonthInfo,
    previousMonth: {} as MonthInfo,
    year: 0,
    days: this._days,
  };

  constructor(year?: number, month?: number, day: number = 1) {
    if (year && month) {
      this._initDate = new Date(year, month, day);
      this._currentDisplayDate = new Date(year, month, day);
    }
    this._init();
  }

  private _init() {
    this.populateMonthDays(MonthType.CURRENT, this._initDate);
  }

  private _setCalendarInfo(calendarInfo: ICalendarInfo) {
    this._calendarInfo = calendarInfo;
  }

  populateMonthDays(monthType: MonthType, date?: Date) {
    let newDate = date || this._currentDisplayDate;
    if (monthType === MonthType.NEXT) {
      newDate = getNextDate(newDate);
    }
    if (monthType === MonthType.PREVIOUS) {
      newDate = getPreviousDate(newDate);
    }

    this._currentDisplayDate = newDate;
    this._days.setDays(generateDays(newDate));
    let additionalCalendarStateValues =
      generateOtherCalendarStateValues(newDate);
    this._setCalendarInfo({
      ...this._calendarInfo,
      ...additionalCalendarStateValues,
    });

    return this;
  }

  getCalendarState() {
    return this._calendarInfo;
  }

  printCalendar() {
    console.log("\nSu  Mo  Tu  We  Th  Fr  Sa");
    let daysGrid = this._days.formatDaysAsGrid();
    for (var i = 0; i < daysGrid.length; i++) {
      console.log(
        daysGrid[i].map((day) => String(day.day).padStart(2, "0")).join("  ")
      );
    }
  }
}

const CalendarClass = new Calendar();

export { Calendar, CalendarClass };
// export class Month {
//   private _days: Day[] = [];
//   private _month = {
//     value: 0,
//     name: "",
//     year: 0,
//   };

//   constructor(days: Day[]) {
//     this._days = days;
//   }

//   setDays(days: Day[]) {
//     this._days = days;
//   }

//   getDays() {
//     return this._days;
//   }
// }
// export class Day {
//   private _day: MonthDay;
//   constructor(day: MonthDay) {
//     this._day = day;
//   }

//   isCurrentDate(date: Date) {
//     return date.toDateString() === new Date().toDateString();
//   }

//   setDay(day: MonthDay) {
//     this._day = day;
//   }

//   getDay() {
//     return this._day;
//   }
// }
