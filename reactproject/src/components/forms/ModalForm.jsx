import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import FormSelect from "./FormSelext";
import { useDispatch } from "react-redux";
import { SetIsVisibleAction } from "../../redux/modal/actionCreators";
import { Context } from "../../index";
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc } from 'firebase/firestore'

const REMINDER = 'reminder'
const TASK = 'task'

const ModalForm = ({ type }) => {
    const dispatch = useDispatch()
    const isEdit = useSelector(state => state.modalReducer.isEdit)
    const { selectedDay, selectedMonth } = useSelector(state => state.calendarReducer)
    const [challenge, setChallenge] = useState({ type: type })
    const { db, auth } = useContext(Context)
    const [user] = useAuthState(auth)
    const challengesCollectionRef = collection(db, 'challenges')

    const handleChange = (event) => {
        setChallenge(challenge => ({ ...challenge, [event.target.name]: event.target.value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await addDoc(challengesCollectionRef, { ...challenge, userId: user.uid, day: selectedDay, month: selectedMonth })
        dispatch(SetIsVisibleAction(false))
    }

    const fields = [<FormGroup key={1} inputType='text' handler={handleChange} name='title' labelName='Title' />]
    if (type !== REMINDER) {
        fields.push(<FormGroup key={2} inputType='textarea' handler={handleChange} name='description' labelName='Description' />)
        if (type !== TASK) {
            fields.push(<FormSelect key={3} handler={handleChange} name='period' labelName='Period' />)
        }
    }

    return (
        <form className="modal-form" onSubmit={handleSubmit}>
            {fields}
            <input className="wide-btn" type={'submit'} value='Save' />
            {
                isEdit ?
                    <input className="wide-btn" type={'submit'} value='Delete' />
                    :
                    <></>
            }
        </form>
    )
}

export default ModalForm