import React from "react";
import Actions from "./actions";
import { FunctionComponent, ReactElement, ReactNode, useContext } from "react";
import { CalendarContext } from "../../context/CalendarContext";
import { weekDayMapping } from "../../constants";
import { getDayStyles, getStyles } from "./styles";
import "../../App.css";
import { isCurrentDay } from "./helper";
// import { FloationIcon } from "../floating-icon";

function CustomCalendar() {
  const { calendarState, populateDays } = useContext(CalendarContext);

  // console.log(calendarState);
  return (
    <>
      <div className="grid">
        <Actions calendarState={calendarState} populateDays={populateDays} />
        <div className="grid-item days-header">
          {Object.values(weekDayMapping).map((day) => (
            <div className="days-header__item">{day}</div>
          ))}
        </div>
        {calendarState.days.getDays().map((day, index) => (
          <div style={getStyles(day, index)} className="grid-item days">
            <p style={getDayStyles(day, calendarState)}>{day.day}</p>
            {isCurrentDay(day, calendarState) && (
              <Events
                events={[
                  { title: "One" },
                  { title: "two" },
                  { title: "three" },
                ]}
              />
            )}
          </div>
        ))}
      </div>
      {/* <FloationIcon position="dfsj" /> */}
    </>
  );
}

export default CustomCalendar;

interface EventsProps {
  events: { title: string }[];
}

const Events = ({ events }: EventsProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        marginTop: "0.4rem",
        height: "calc(100% - 40px))",
      }}
    >
      {events.length > 2 ? (
        <>
          <Event event={events[0]} />
          <Event event={events[1]} />
          <div>
            <span
              style={{
                fontSize: "0.8rem",
                background: "rgba(0, 137, 255, 0.1)",
              }}
            >
              {events.length - 1} more...
            </span>
          </div>
        </>
      ) : (
        events.map((item) => <Event event={item} />)
      )}
    </div>
  );
};

function Event({ event }: { event: { title: string } }) {
  return <div className={"event"}>{event.title}</div>;
}
