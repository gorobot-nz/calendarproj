import React, { useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import FormSelect from "./FormSelext";
import { useDispatch } from "react-redux";
import { SetInputModelAction, SetIsEditAction, SetIsVisibleAction } from "../../redux/modal/actionCreators";
import { Context } from "../../index";
import { useAuthState } from 'react-firebase-hooks/auth'
import { doc, collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { fetchChallenges, SetCurrentDayChallengesAction } from "../../redux/calendar/actionCreators";

const REMINDER = 'reminder'
const TASK = 'task'

const ModalForm = ({ formType, isEdit, inputModel }) => {
    const dispatch = useDispatch()
    const { selectedDay, selectedMonth } = useSelector(state => state.calendarReducer)
    const [challenge, setChallenge] = useState({})
    const { db, auth } = useContext(Context)
    const [user] = useAuthState(auth)
    const challengesCollectionRef = collection(db, 'challenges')

    const handleChange = (event) => {
        setChallenge(challenge => ({ ...challenge, [event.target.name]: event.target.value }))
    }

    const checkInput = (challenge) => {
        const keys = Object.keys(challenge) 
        if (keys.length === 0){
            return false
        }
        keys.forEach(key => {
            if (challenge[key] === ''){
                return false
            }
        })
        return true
    }

    const submitSave = async (event) => {
        event.preventDefault()
        if(! checkInput(challenge)){
            alert('Bruh dude')
            return
        }
        if (isEdit) {
            const challengeDoc = doc(db, "challenges", inputModel.id);
            await updateDoc(challengeDoc, challenge)
        } else {
            await addDoc(challengesCollectionRef, { ...challenge, type: formType, userId: user.uid, day: selectedDay, month: selectedMonth })
        }
        dispatch(SetIsVisibleAction(false))
        dispatch(SetIsEditAction(false))
        dispatch(fetchChallenges(challengesCollectionRef, user.uid, selectedMonth))
        dispatch(SetInputModelAction({}))
        dispatch(SetCurrentDayChallengesAction([]))
        setChallenge({})
    }

    const submitDelete = async (event) => {
        event.preventDefault()
        const challengeDoc = doc(db, "challenges", inputModel.id);
        await deleteDoc(challengeDoc)
        dispatch(SetIsVisibleAction(false))
        dispatch(SetIsEditAction(false))
        dispatch(fetchChallenges(challengesCollectionRef, user.uid, selectedMonth))
        dispatch(SetInputModelAction({}))
        dispatch(SetCurrentDayChallengesAction([]))
        setChallenge({})
    }

    const checkForm = inputModel.type ? inputModel.type : formType

    const fields = [<FormGroup key={1} inputType='text' handler={handleChange} name='title' labelName='Title' val={challenge.title ? challenge.title : ''} />]
    if (checkForm !== REMINDER) {
        fields.push(<FormGroup key={2} inputType='textarea' handler={handleChange} name='description' labelName='Description' val={challenge.description ? challenge.description : ''} />)
        if (checkForm !== TASK) {
            fields.push(<FormSelect key={3} handler={handleChange} name='period' labelName='Period' val={challenge.period ? challenge.period : false} />)
        }
    }

    useEffect(() => {
        setChallenge({ ...inputModel });
    }, [inputModel, formType]);

    return (
        <form className="modal-form">
            {fields}
            <input className="wide-btn" type={'submit'} value='Save' onClick={submitSave} />
            {
                isEdit ?
                    <input className="wide-btn" type={'submit'} value='Delete' onClick={submitDelete} />
                    :
                    <></>
            }
        </form>
    )
}

export default ModalForm