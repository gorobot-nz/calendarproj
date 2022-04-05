import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import FormSelect from "./FormSelext";
import { useDispatch } from "react-redux";
import { SetInputModelAction, SetIsVisibleAction } from "../../redux/modal/actionCreators";
import { Context } from "../../index";
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
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

    const submitSave = async (event) => {
        event.preventDefault()
        if (isEdit) {
            const challengeDoc = doc(db, "challenges", inputModel.id);
            await updateDoc(challengeDoc, challenge)
        } else {
            await addDoc(challengesCollectionRef, { ...challenge, userId: user.uid, day: selectedDay, month: selectedMonth })
        }
        dispatch(SetIsVisibleAction(false))
        dispatch(fetchChallenges(challengesCollectionRef, user.uid, selectedMonth))
        dispatch(SetInputModelAction({}))
        dispatch(SetCurrentDayChallengesAction([]))
    }

    const submitDelete = async (event) => {
        event.preventDefault()
        const challengeDoc = doc(db, "challenges", inputModel.id);
        await deleteDoc(challengeDoc)
        dispatch(SetIsVisibleAction(false))
        dispatch(fetchChallenges(challengesCollectionRef, user.uid, selectedMonth))
        dispatch(SetInputModelAction({}))
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
        setChallenge({ ...inputModel, type: type });
    }, [inputModel]);

    return (
        <form className="modal-form">
            {fields}
            <input id={isEdit ? 'update' : 'create'} className="wide-btn" type={'submit'} value='Save' onClick={submitSave} />
            {
                isEdit ?
                    <input id='delete' className="wide-btn" type={'submit'} value='Delete' onClick={submitDelete} />
                    :
                    <></>
            }
        </form>
    )
}

export default ModalForm