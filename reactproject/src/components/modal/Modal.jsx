import React, { useState } from "react";
import ModalForm from "../forms/ModalForm";

const REMINDER = 'r'
const TASK = 't'
const EVENT = 'e'

const Modal = ({ isVisible }) => {
    const cls = isVisible ? 'modal-layout' : 'hidden-layout'

    const [formType, setFormType] = useState(REMINDER)

    const handleClick = (type) => {
        setFormType(type)
    }

    return (
        <div className={cls}>
            <div className="modal-layout__modal">
                <div className="modal-header">
                    <button className="modal-btn" onClick={() => { handleClick(EVENT) }}>Event</button>
                    <button className="modal-btn" onClick={() => { handleClick(TASK) }}>Task</button>
                    <button className="modal-btn" onClick={() => { handleClick(REMINDER) }}>Reminder</button>
                </div>
                <div className="form-container">
                    <ModalForm type={formType} isEdit={false} />
                </div>
            </div>
        </div>
    )
}

export default Modal