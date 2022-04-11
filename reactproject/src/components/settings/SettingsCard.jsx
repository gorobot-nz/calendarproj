import React, { useContext, useState } from "react";
import { Context } from "../../index";
import { updateProfile } from "firebase/auth"
import { useDispatch } from "react-redux";
import { SetDayAction, SetDaysAction, SetMonthAction } from "../../redux/calendar/actionCreators";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const SettingsCard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState(null);
    const { auth, storage } = useContext(Context)

    const handleFileUpload = (event) => {
        if (event.target.files[0]) {
            setAvatar(event.target.files[0])
        }
    }

    const handleSave = async () => {
        if (!avatar) {
            alert('Maybe you wanna select your avatar, dude?')
            return
        }
        const fileRef = ref(storage, auth.currentUser.uid + '.png');
        await uploadBytes(fileRef, avatar);
        const photoURL = await getDownloadURL(fileRef);
        updateProfile(auth.currentUser, {
            photoURL: photoURL
        })
        alert('Your avatar will be changed after reload')
        navigate('/main')
    }

    const handleSignout = async () => {
        await auth.signOut()
        dispatch(SetDayAction(null))
        dispatch(SetMonthAction(''))
        dispatch(SetDaysAction([]))
    }

    return (
        <div className="settings-card">
            <div className="user-container__avatar-container">
                <img id="user-avatar" src={auth.currentUser.photoURL} alt="No image yet" />
                <label className="img-uploader">
                    <input type="file" accept=".jpg, .jpeg, .png" onChange={handleFileUpload} />
                    <p>{avatar ? avatar.name : 'Update avatar'}</p>
                </label>
            </div>
            <div className="settings-button-container">
                <button className="wide-btn" onClick={handleSave}><p>Save</p></button>
                <button className="wide-btn" onClick={handleSignout}><p>Leave</p></button>
            </div>
        </div>
    )
}

export default SettingsCard;