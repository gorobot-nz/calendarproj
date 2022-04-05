import React from "react";

const Challenge = ({ title, type }) => {
    return (
        <div className={`challenge ${type} shadow`}>
            <div className="challenge__inner">
                {title}
            </div>
        </div>
    )
}

export default Challenge