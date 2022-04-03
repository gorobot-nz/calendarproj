import React from 'react'

const Day = ({ dayModel }) => {
    return (
        <td className="day-values__week__day">
            <div className="day-values__week__day__day-info__day-num">
                <p>{dayModel.day}</p>
            </div>
            <div className="day-values__week__day__day-info__day-tasks">

            </div>
        </td>
    )
}

export default Day