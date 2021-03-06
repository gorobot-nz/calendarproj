import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ModalForm from "../forms/ModalForm";
import { SetInputModelAction, SetIsEditAction, SetIsVisibleAction } from "../../redux/modal/actionCreators";

const REMINDER = 'reminder'
const TASK = 'task'
const EVENT = 'event'

const Modal = () => {
    const dispatch = useDispatch()
    const { isVisible, isEdit, inputModel } = useSelector(state => state.modalReducer)
    const [formType, setFormType] = useState(REMINDER)
    const layoutClass = isVisible ? 'modal-layout' : 'hidden-layout'
    const headerClass = isEdit ? 'hidden-layout' : 'modal-header'

    const handleClick = (type) => {
        setFormType(type)
    }

    const hideModal = (event) => {
        if (event.target.id === 'layout') {
            dispatch(SetIsVisibleAction(false))
            dispatch(SetIsEditAction(false))
            dispatch(SetInputModelAction({}))
            setFormType(REMINDER)
        }
    }

    return (
        <div id='layout' className={layoutClass} onClick={hideModal}>
            <div className="modal-layout__modal">
                <div className={headerClass}>
                    <button className="modal-btn" onClick={() => { handleClick(EVENT) }}>Event</button>
                    <button className="modal-btn" onClick={() => { handleClick(TASK) }}>Task</button>
                    <button className="modal-btn" onClick={() => { handleClick(REMINDER) }}>Reminder</button>
                </div>
                <div className="form-container">
                    <ModalForm formType={formType} isEdit={isEdit} inputModel={inputModel} />
                </div>
            </div>
        </div>
    )
}

export default Modal