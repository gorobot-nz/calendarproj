import React from "react";
import { useSelector } from "react-redux";
import Week from "./Week";

const CalendarSection = () => {
    const days = useSelector(state => state.calendarReducer.days)
    const weeksCount = days.length / 7
    const weeks = []

    for (let i = 0; i < weeksCount; i++) {
        weeks.push(<Week key={i} days={days.slice(i * 7, i * 7 + 7)} />)
    }

    return (
        <section className="calendar-container">
            <table className="calendar-container__days">
                <thead className="day-names">
                    <tr>
                        <th className="day-names__day">Sunday</th>
                        <th className="day-names__day">Monday</th>
                        <th className="day-names__day">Tuesday</th>
                        <th className="day-names__day">Wednesday</th>
                        <th className="day-names__day">Thursday</th>
                        <th className="day-names__day">Friday</th>
                        <th className="day-names__day">Saturday</th>
                    </tr>
                </thead>
                <tbody id="days-table" className="day-values">
                    {weeks}
                </tbody>
            </table>
        </section>
    )
}

export default CalendarSection