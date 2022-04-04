import React from "react";

const Challenge = ({ title, type }) => {
    return (
        <div className={`challenge ${type}`}>
            <div className="challenge__inner">
                {title}
            </div>
        </div>
    )
}

export default Challenge