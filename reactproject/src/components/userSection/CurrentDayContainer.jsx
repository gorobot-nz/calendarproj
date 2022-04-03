import React from "react";
import { useSelector } from 'react-redux'

const CurrentDayContainer = () => {
    const selectedDay = useSelector(state => state.calendarReducer.selectedDay)

    return (
        <div id="current-day-container" className="user-container__selected-day-container">
            <p>
                {selectedDay ? selectedDay : 'Select day'}
            </p>
        </div>
    )
}

export default CurrentDayContainer