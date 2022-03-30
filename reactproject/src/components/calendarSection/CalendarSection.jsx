import React from "react";

const CalendarSection = () => {
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
                </tbody>
            </table>
        </section>
    )
}

export default CalendarSection