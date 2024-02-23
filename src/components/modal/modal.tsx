import { createPortal } from "react-dom";
import styles from "./modal.module.css";
import { monthMapping } from "../../constants";
import React, { useContext, useState } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import { MonthType } from "../../types";
import useYearMonthModal from "../../hooks/useYearMonthModal";
import MonthYearsGridView from "./month-year-grid-view";
import { ModalProps, ModalView } from "./types";

function classNames(...args: string[]) {
  return args.join(" ");
}

export default function Modal({
  show,
  handleClose,
}: ModalProps): JSX.Element | null {
  const { calendarState, populateDays } = useContext(CalendarContext);
  const { months, years, selectedDate, setSelectedDate } =
    useYearMonthModal(calendarState);
  const [modalView, setModalView] = useState<ModalView>(ModalView.MONTH);
  const isMonthView = modalView === ModalView.MONTH;

  const title = isMonthView
    ? selectedDate.year
    : monthMapping[selectedDate.month as number];

  function closeModal(shouldReset: boolean) {
    return () => {
      setModalView(ModalView.MONTH);
      shouldReset &&
        setSelectedDate({
          year: calendarState.year,
          month: calendarState.currentMonth.value,
        });
      handleClose();
    };
  }

  function handleSelect() {
    let date = new Date(Number(selectedDate.year), Number(selectedDate.month));
    populateDays(MonthType.CURRENT, date);
    closeModal(false)();
  }

  return show
    ? createPortal(
        <>
          <div className={classNames(styles.backdrop)}></div>
          <div className={classNames(styles.modal, styles.positionCenter)}>
            <div className={styles.modalTitle}>
              <span
                className={styles.view}
                onClick={(e) =>
                  setModalView(isMonthView ? ModalView.YEAR : ModalView.MONTH)
                }
              >
                {title}
              </span>
            </div>
            <section className={classNames(styles.monthsGrid)}>
              <MonthYearsGridView
                {...{
                  selectedDate,
                  years,
                  months,
                  setSelectedDate,
                  calendarState,
                  isMonthView,
                }}
              />
            </section>

            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <button className={styles.btn} onClick={closeModal(true)}>
                Close
              </button>
              <button className={styles.btn} onClick={handleSelect}>
                Select
              </button>
            </div>
          </div>
        </>,
        document.body
      )
    : null;
}
