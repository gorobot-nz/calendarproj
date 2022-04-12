import React from "react";
import ButtonContainer from "./ButtonContainer";
import CurrentDayChallengesContainer from "./CurrentDayChallengesContainer";
import CurrentDayContainer from "./CurrentDayContainer";
import UserImageContainer from "./UserImageContainer";

const UserSection = () => {
    return (
        <section className="user-container">
            <UserImageContainer />
            <CurrentDayContainer />
            <CurrentDayChallengesContainer />
            <ButtonContainer />
        </section>
    )
}

export default UserSection