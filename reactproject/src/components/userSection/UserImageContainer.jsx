import React, { useContext } from "react";
import { Context } from "../../index";

const UserImageContainer = () => {
    const { auth } = useContext(Context)

    return (
        <div id="user-avatar-container" className="user-container__avatar-container">
            <img className="shadow" id="user-avatar" src={auth.currentUser.photoURL} alt="No image yet" />
        </div>
    )
}

export default UserImageContainer