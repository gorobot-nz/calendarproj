import React from "react";

const Main = () => {
    return (
        <main class="main">
            <div class="container">
                <section class="user-container">
                    <div id="user-avatar-container" class="user-container__avatar-container">
                        <img class="shadow" id="user-avatar" src="./img/c46888f9135c3b440f5d9060a345b35e.png" alt="No image yet" />
                    </div>
                    <div id="current-day-container" class="user-container__selected-day-container">
                        <p>Select day</p>
                    </div>
                    <div class="user-container__user-challenges-container">
                        <div id="user-challenges-container"
                            class="user-container__user-challenges-container__user-chalenges shadow">
                        </div>
                    </div>
                    <div class="user-container__button-container">
                        <button id="add-challenge-button" class="wide-btn shadow">
                            <ion-icon class="button-content" name="add-outline"></ion-icon>
                        </button>
                    </div>
                </section>
                <section class="calendar-container">
                    <table class="calendar-container__days">
                        <thead class="day-names">
                            <tr>
                                <th class="day-names__day">Sunday</th>
                                <th class="day-names__day">Monday</th>
                                <th class="day-names__day">Tuesday</th>
                                <th class="day-names__day">Wenesday</th>
                                <th class="day-names__day">Thursday</th>
                                <th class="day-names__day">Friday</th>
                                <th class="day-names__day">Saturday</th>
                            </tr>
                        </thead>
                        <tbody id="days-table" class="day-values">
                        </tbody>
                    </table>
                </section>
            </div>
        </main>
    )
}

export default Main