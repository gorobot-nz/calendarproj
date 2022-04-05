import React from 'react'
import { useDispatch } from 'react-redux'
import { SetCurrentDayChallengesAction, SetDayAction } from '../../redux/calendar/actionCreators'
import Challenge from '../challenges/Challenge'

const Day = ({ dayModel }) => {
    let cls = 'day-values__week__day'
    if (dayModel.addStyle != '') {
        cls = cls.concat(' ', dayModel.addStyle)
    }

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(SetDayAction(`${dayModel.month}-${dayModel.day}-${dayModel.year}`))
        dispatch(SetCurrentDayChallengesAction(dayModel.challenges))
    }

    return (
        <td className={cls} onClick={handleClick}>
            <div className="day-values__week__day__day-info__day-num">
                <p>{dayModel.day}</p>
            </div>
            <div className="day-values__week__day__day-info__day-tasks">
                {dayModel.challenges.map(challenge => (
                    <Challenge key={challenge.id} title={challenge.title} type={challenge.type} />
                ))}
            </div>
        </td>
    )
}

export default Day