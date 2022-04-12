import React from "react";
import { useNavigate } from 'react-router-dom'


const SettingsContainer = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/settings')
    }

    return (
        <div className="header__settings-container">
            <label className="switch">
                <input type="checkbox" />
                <span id="theme-switch-toggle" className="slider round"></span>
            </label>
            <div className="settings">
                <button id="settings-button" className="round-btn shadow" onClick={handleClick}>
                    <ion-icon class="button-content" name="settings-outline"></ion-icon>
                </button>
            </div>
        </div>

    )
}

export default SettingsContainer