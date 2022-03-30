import React from "react";

const UserSection = () => {
    return (
        <section className="user-container">
            <div id="user-avatar-container" className="user-container__avatar-container">
                <img className="shadow" id="user-avatar" src="./img/c46888f9135c3b440f5d9060a345b35e.png" alt="No image yet" />
            </div>
            <div id="current-day-container" className="user-container__selected-day-container">
                <p>Select day</p>
            </div>
            <div className="user-container__user-challenges-container">
                <div id="user-challenges-container"
                    className="user-container__user-challenges-container__user-chalenges shadow">
                </div>
            </div>
            <div className="user-container__button-container">
                <button id="add-challenge-button" className="wide-btn shadow">
                    <ion-icon class="button-content" name="add-outline"></ion-icon>
                </button>
            </div>
        </section>
    )
}

export default UserSection