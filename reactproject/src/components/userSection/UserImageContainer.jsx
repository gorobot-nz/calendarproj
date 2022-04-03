import React, { useContext } from "react";
import { Context } from "../../index";
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDispatch } from "react-redux";
import { SetDayAction, SetDaysAction, SetMonthAction } from "../../redux/calendar/actionCreators";

const UserImageContainer = () => {
    const dispatch = useDispatch()
    const { auth } = useContext(Context)
    const [user] = useAuthState(auth)

    const handleSignout = async () => {
        await auth.signOut()
        dispatch(SetDayAction(null))
        dispatch(SetMonthAction(''))
        dispatch(SetDaysAction([]))
    }

    return (
        <div id="user-avatar-container" className="user-container__avatar-container">
            <img className="shadow" id="user-avatar" src={user.photoURL} alt="No image yet" onClick={handleSignout} />
        </div>
    )
}

export default UserImageContainer