import React from 'react'
import { useDispatch } from 'react-redux'
import { SetCurrentDayChallengesAction, SetDayAction } from '../../redux/calendar/actionCreators'
import ChallengeCounter from '../challenges/ChallengeCounter'

const Day = ({ dayModel }) => {
    let cls = 'day-values__week__day'
    if (dayModel.addStyle !== '') {
        cls = cls.concat(' ', dayModel.addStyle)
    }

    const dispatch = useDispatch()
    const handleClick = () => {
        dispatch(SetDayAction(`${dayModel.month}-${dayModel.day}-${dayModel.year}`))
        dispatch(SetCurrentDayChallengesAction(dayModel.challenges))
    }

    const challengeTypesCount = dayModel.challenges.reduce((map, obj) => {
        map[obj.type] = map[obj.type] + 1
        return map
    }, { 'reminder': 0, 'event': 0, 'task': 0 })

    const renderObjs = []
    Object.keys(challengeTypesCount).forEach(key => {
        if (challengeTypesCount[key] !== 0) {
            renderObjs.push(<ChallengeCounter key={key} count={challengeTypesCount[key]} type={key} />)
        }
    })

    console.log(challengeTypesCount)

    return (
        <td className={cls} onClick={handleClick}>
            <div className="day-values__week__day__day-info__day-num">
                <p>{dayModel.day}</p>
            </div>
            <div className="day-values__week__day__day-info__day-tasks">
                {renderObjs}
            </div>
        </td>
    )
}

export default Day