import React, { useContext } from "react";
import { Context } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { SetDayAction, SetDaysAction, SetMonthAction } from "../../redux/calendar/actionCreators";
import UserImageContainer from "../../components/userSection/UserImageContainer";

const SettingsCard = () => {
    const dispatch = useDispatch()
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    console.log(user)

    const handleSignout = async () => {
        await auth.signOut()
        dispatch(SetDayAction(null))
        dispatch(SetMonthAction(''))
        dispatch(SetDaysAction([]))
    }

    return (
        <div className="settings-card">
            <div id="user-avatar-container" className="user-container__avatar-container">
                <img className="shadow" id="user-avatar" src={user.photoURL} alt="No image yet" />
            </div>
            <button className="wide-btn" onClick={handleSignout}><p>Click Me</p></button>
        </div>
    )
}

export default SettingsCard;