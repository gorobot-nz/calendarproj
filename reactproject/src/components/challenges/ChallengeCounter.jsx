import React from "react";

const ChallengeCounter = ({ count, type }) => {
    return (
        <div className={`challenge ${type}`}>
            <div className="challenge__inner">
                {count} {type}{count === 1 ? '' : 's'}
            </div>
        </div>
    )
}

export default ChallengeCounter