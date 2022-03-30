import React from "react";

const SettingsContainer = () => {
    return (
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
        
    )
}

export default SettingsContainer