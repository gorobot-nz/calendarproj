import React from 'react'

const Day = ({ dayModel }) => {
    let cls = 'day-values__week__day'
    if (dayModel.addStyle != '') {
        cls = cls.concat(' ', dayModel.addStyle)
    }

    return (
        <td className={cls}>
            <div className="day-values__week__day__day-info__day-num">
                <p>{dayModel.day}</p>
            </div>
            <div className="day-values__week__day__day-info__day-tasks">

            </div>
        </td>
    )
}

export default Day