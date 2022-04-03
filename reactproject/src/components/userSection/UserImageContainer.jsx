import React, { useContext } from "react";
import { Context } from "../../index";

const UserImageContainer = () => {
    const { auth } = useContext(Context)

    const handleSignout = async () => {
        await auth.signOut()
    }

    return (
        <div id="user-avatar-container" className="user-container__avatar-container">
            <img className="shadow" id="user-avatar" src="./img/c46888f9135c3b440f5d9060a345b35e.png" alt="No image yet" onClick={handleSignout} />
        </div>
    )
}

export default UserImageContainer