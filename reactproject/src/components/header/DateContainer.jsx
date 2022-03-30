import React from "react";

const DateContainer = () => {
    return (
        
        <div className="header__date-container">
            <button id="prev-month-button" className="round-btn shadow">
                <ion-icon class="button-content" name="arrow-back-outline"></ion-icon>
            </button>
            <div id="currnet-month-container" className="header__date-container__month-container shadow">
                <p>Prev</p>
            </div>
            <button id="next-month-button" className="round-btn shadow">
                <ion-icon class="button-content" name="arrow-forward-outline"></ion-icon>
            </button>
        </div>
    )
}

export default DateContainer