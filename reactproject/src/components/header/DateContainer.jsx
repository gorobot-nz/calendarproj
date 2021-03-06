import React, { useEffect, useState, useContext } from "react"
import { Context } from '../../index'
import { useDispatch } from "react-redux"
import { SetCurrentDayChallengesAction, SetDayAction, SetDaysAction, SetMonthAction } from '../../redux/calendar/actionCreators'
import { MONTHS, computeDays } from '../../utils/utils'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, } from 'firebase/firestore'
import { fetchChallenges } from '../../redux/calendar/actionCreators'

const DateContainer = () => {
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date());
    date.setDate(1)
    const { db, auth } = useContext(Context)
    const [user] = useAuthState(auth)
    const challengesCollectionRef = collection(db, 'challenges')

    const setNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1))
    }

    const setPrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1))
    }

    useEffect(() => {
        dispatch(SetMonthAction(`${MONTHS[date.getMonth()]}-${date.getFullYear()}`))
        dispatch(SetDayAction(null))
        dispatch(SetCurrentDayChallengesAction([]))
        dispatch(fetchChallenges(challengesCollectionRef, user.uid, `${MONTHS[date.getMonth()]}-${date.getFullYear()}`))
        dispatch(SetMonthAction(`${MONTHS[date.getMonth()]}-${date.getFullYear()}`))
        const days = computeDays(date)
        dispatch(SetDaysAction(days))
    }, [date])

    return (
        <div className="header__date-container">
            <button className="round-btn shadow" onClick={setPrevMonth}>
                <ion-icon class="button-content" name="arrow-back-outline"></ion-icon>
            </button>
            <div className="header__date-container__month-container shadow">
                <p>{MONTHS[date.getMonth()]}, {date.getFullYear()}</p>
            </div>
            <button className="round-btn shadow" onClick={setNextMonth}>
                <ion-icon class="button-content" name="arrow-forward-outline"></ion-icon>
            </button>
        </div>
    )
}

export default DateContainer