import { monthMapping } from "./constants";
import { FillDaysGridParam, MonthDay, MonthYearTuple } from "./types";

export function generateOtherCalendarStateValues(date: Date) {
  const [, previousMonth] = getMonthAndYear(getPreviousDate(date));
  const [, nextMonth] = getMonthAndYear(getNextDate(date));
  return {
    year: date.getFullYear(),
    currentMonth: {
      name: monthMapping[date.getMonth()],
      value: date.getMonth(),
    },
    previousMonth: { name: monthMapping[previousMonth], value: previousMonth },
    nextMonth: { name: monthMapping[nextMonth], value: nextMonth },
  };
}

export function getPreviousDate(date: Date) {
  let [year, month] = getMonthAndYear(date);
  month = month > 0 ? month - 1 : 11;
  year = month === 11 ? year - 1 : year;
  return new Date(year, month);
}

export function getNextDate(date: Date) {
  let [year, month] = getMonthAndYear(date);
  month = month === 11 ? 0 : month + 1;
  year = month === 0 ? year + 1 : year;
  return new Date(year, month);
}

function getMonthAndYear(date: Date): MonthYearTuple {
  return [date.getFullYear(), date.getMonth()];
}

export function getTotalDaysOfMonths(date: Date): number {
  const [year, month] = getMonthAndYear(date);
  return new Date(year, month + 1, 0).getDate();
}

export function generateDays(date: Date) {
  let totalDays = getTotalDaysOfMonths(date);
  let previousMonthtTotalDays = getTotalDaysOfMonths(getPreviousDate(date));
  const monthStartDay = new Date(...getMonthAndYear(date), 1).getDay();

  return fillDaysGrid({ totalDays, previousMonthtTotalDays, monthStartDay });
}

export type FillDaysGrid = ({
  totalDays,
  previousMonthtTotalDays,
  monthStartDay,
}: FillDaysGridParam) => MonthDay[];

const fillDaysGrid: FillDaysGrid = ({
  totalDays,
  previousMonthtTotalDays,
  monthStartDay,
}) => {
  const GRID_LENGTH = 42;
  const STEP = 1;
  let previousMonthDays, currentMonthDays, nextMonthDays;

  previousMonthDays = generateRange(
    previousMonthtTotalDays - monthStartDay + 1,
    previousMonthtTotalDays,
    STEP,
    customValueFn(false)
  );
  currentMonthDays = generateRange(1, totalDays, STEP, customValueFn(true));
  nextMonthDays = generateRange(
    1,
    GRID_LENGTH - (totalDays + previousMonthDays.length),
    STEP,
    customValueFn(false)
  );

  return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
};

export function arrayToGrid(daysArray: MonthDay[]): MonthDay[][] {
  let iteration = 0;
  let index = 0;
  let daysGrid = [];
  while (iteration < 6) {
    daysGrid.push(
      daysArray?.slice(index, index + 7).map((day: MonthDay) => {
        return { ...day, day: String(day.day).padStart(2, "0") };
      })
    );
    index += 7;
    iteration++;
  }
  return daysGrid;
}

var customValueFn =
  (sameMonth: boolean): CustomValueGenerator =>
  (i, start, step) => {
    return { day: start + i * step, sameMonth };
  };

type CustomValueGenerator = (i: number, start: number, step: number) => any;

export function generateRange(
  start: number,
  end: number,
  step: number,
  customValueGenerator?: CustomValueGenerator
) {
  return Array.from(
    { length: (end - start) / step + 1 },
    (_, i) => customValueGenerator?.(i, start, step) || start + i * step
  );
}
