import React from "react";
import Challenge from "../challenges/Challenge";
import { useSelector } from "react-redux";

const CurrentDayChallengesContainer = () => {
    const currentDayChallenges = useSelector(state => state.calendarReducer.currentDayChallenges)
    console.log(currentDayChallenges)

    return (
        <div className="user-container__user-challenges-container">
            <div id="user-challenges-container"
                className="user-container__user-challenges-container__user-chalenges shadow">
                {currentDayChallenges.map(challenge => (
                    <Challenge key={challenge.id} title={challenge.title} type={challenge.type} />
                ))}
            </div>
        </div>
    )
}

export default CurrentDayChallengesContainer