import React, { useState } from "react";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const DateContainer = () => {
    const [date, setDate] = useState(new Date());

    const setNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1))
    }

    const setPrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1))
    }

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