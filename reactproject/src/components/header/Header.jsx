import React from "react";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="header__button-container">
                    <button id="switch-user-menu-button" className="btn shadow" onClick={() => console.log('click')}>
                        <ion-icon class="button-content" name="menu-outline"></ion-icon>
                    </button>
                </div>
                <div className="header__logo-container">
                    <a className="logo">Calendar</a>
                </div>
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
                <div className="header__settings-container">
                    <label className="switch">
                        <input type="checkbox" />
                        <span id="theme-switch-toggle" className="slider round"></span>
                    </label>
                    <div className="settings">
                        <button id="settings-button" className="round-btn shadow">
                            <ion-icon class="button-content" name="settings-outline"></ion-icon>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header