import React from "react";

const SwitchButtonContainer = () => {
    return (
        <div className="header__button-container">
            <button id="switch-user-menu-button" className="btn shadow" onClick={() => console.log('click')}>
                <ion-icon class="button-content" name="menu-outline"></ion-icon>
            </button>
        </div>
    )
}

export default SwitchButtonContainer