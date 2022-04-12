import React from "react";
import { useDispatch } from "react-redux";
import { SetInputModelAction, SetIsEditAction, SetIsVisibleAction } from "../../redux/modal/actionCreators";

const Challenge = ({ title, type, model }) => {
    const dispatch = useDispatch()

    const handleClick = (challenge) => {
        dispatch(SetInputModelAction(challenge))
        dispatch(SetIsEditAction(true))
        dispatch(SetIsVisibleAction(true))
    }

    return (
        <div className={`challenge ${type} shadow`} onClick={() => handleClick(model)}>
            <div className="challenge__inner">
                {title}
            </div>
        </div>
    )
}

export default Challenge