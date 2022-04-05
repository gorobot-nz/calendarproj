import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import FormSelect from "./FormSelext";
import { useDispatch } from "react-redux";
import { SetIsVisibleAction } from "../../redux/modal/actionCreators";
import { Context } from "../../index";
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc } from 'firebase/firestore'
import { fetchChallenges, SetCurrentDayChallengesAction } from "../../redux/calendar/actionCreators";

const REMINDER = 'reminder'
const TASK = 'task'

const ModalForm = ({ type, isEdit, inputModel }) => {
    const dispatch = useDispatch()
    const { selectedDay, selectedMonth } = useSelector(state => state.calendarReducer)
    const [challenge, setChallenge] = useState({})
    console.log('model', inputModel)
    console.log('challenge', challenge)
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
        dispatch(fetchChallenges(challengesCollectionRef, user.uid, selectedMonth))
        dispatch(SetCurrentDayChallengesAction([]))
    }

    const fields = [<FormGroup key={1} inputType='text' handler={handleChange} name='title' labelName='Title' val={challenge.title} />]
    if (type !== REMINDER) {
        fields.push(<FormGroup key={2} inputType='textarea' handler={handleChange} name='description' labelName='Description' val={challenge.description} />)
        if (type !== TASK) {
            fields.push(<FormSelect key={3} handler={handleChange} name='period' labelName='Period' val={challenge.period} />)
        }
    }

    useEffect(() => {
        setChallenge({ ...inputModel });
    }, [inputModel]);

    return (
        <form className="modal-form" onSubmit={handleSubmit}>
            {fields}
            <input id={isEdit ? 'update' : 'create'} className="wide-btn" type={'submit'} value='Save' />
            {
                isEdit ?
                    <input id='delete' className="wide-btn" type={'submit'} value='Delete' />
                    :
                    <></>
            }
        </form>
    )
}

export default ModalForm