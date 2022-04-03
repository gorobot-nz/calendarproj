import React, { useState } from "react";
import { useSelector } from "react-redux";
import FormGroup from "./FormGroup";
import FormSelect from "./FormSelext";

const REMINDER = 'r'
const TASK = 't'
const EVENT = 'e'

const ModalForm = ({ type }) => {
    const isEdit = useSelector(state => state.modalReducer.isEdit)
    const [challenge, setChallenge] = useState({})

    const handleChange = (event) => {
        setChallenge(challenge => ({ ...challenge, [event.target.name]: event.target.value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(challenge)
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