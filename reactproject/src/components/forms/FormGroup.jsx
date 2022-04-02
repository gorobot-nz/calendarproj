import React from "react";

const FormGroup = ({ inputType, handler, name, labelName }) => {
    return (
        <div className="form-group">
            <label>{labelName}<input type={inputType} name={name} onChange={handler} /></label>
        </div>
    )
}

export default FormGroup