import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetIsVisibleAction, SetIsEditAction } from "../../redux/modal/actionCreators";

const ButtonContainer = () => {

    const dispatch = useDispatch()
    const selectedDay = useSelector(state => state.calendarReducer.selectedDay)

    const handleClick = () => {
        if (selectedDay) {
            dispatch(SetIsVisibleAction(true))
        } else {
            alert('bruh')
        }
    }

    return (
        <div className="user-container__button-container">
            <button className="wide-btn shadow" onClick={handleClick}>
                <ion-icon class="button-content" name="add-outline"></ion-icon>
            </button>
        </div>
    )
}

export default ButtonContainer