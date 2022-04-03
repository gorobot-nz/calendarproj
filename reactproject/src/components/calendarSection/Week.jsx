import React from "react";
import Day from './Day'

const Week = ({ days }) => {
    return (
        <tr className="day-values__week">
            {days.map((day, index) => (
                <Day key={index} dayModel={day} />
            ))}
        </tr>
    )
}

export default Week