import React from "react";
import DateContainer from "./DateContainer";
import LogoContainer from "./LogoContainer";
import SettingsContainer from "./SettingsContainer";
import SwitchButtonContainer from "./SwitchButtonContainer";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <SwitchButtonContainer />
                <LogoContainer />
                <DateContainer />
                <SettingsContainer />
            </div>
        </header>
    )
}

export default Header