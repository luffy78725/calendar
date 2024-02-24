import React, { KeyboardEvent } from "react";
import { useState } from "react";
import { ICalendarInfo, MonthType } from "../../types";
import Modal from "../modal/modal";

type Props = {
  populateDays: (monthType: MonthType) => void;
  calendarState: ICalendarInfo;
};

export default function Actions({ populateDays, calendarState }: Props) {
  const [showModal, setShowModal] = useState(false);

  const handleKeyBoardMonthNavigation = (
    e: KeyboardEvent,
    monthType: MonthType
  ) => {
    if (e.code === "Enter") populateDays(monthType);
  };

  return (
    <div className="actions">
      <button
        tabIndex={1}
        aria-label="previous"
        className="grid-item actions__prev"
        onClick={() => populateDays(MonthType.PREVIOUS)}
        onKeyDown={(e) => handleKeyBoardMonthNavigation(e, MonthType.PREVIOUS)}
      >
        &#x3c; &#x3c;
      </button>
      <div
        className="grid-item actions__months"
        tabIndex={2}
        onClick={() => {
          setShowModal(!showModal);
        }}
      >
        {`${calendarState.currentMonth.name} ${calendarState.year}`}
      </div>
      <button
        tabIndex={3}
        aria-label="next"
        className="grid-item actions__next"
        onClick={() => populateDays(MonthType.NEXT)}
        onKeyDown={(e) => handleKeyBoardMonthNavigation(e, MonthType.NEXT)}
      >
        &#x3e; &#x3e;
      </button>
      <div style={{ marginLeft: "auto" }}>
        <button style={{ marginRight: "1rem" }}>Create Meeting</button>
        <button>Add Task</button>
      </div>
      <Modal
        show={showModal}
        handleClose={() => {
          setShowModal(!showModal);
        }}
      />
    </div>
  );
}
