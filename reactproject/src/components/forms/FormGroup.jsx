import React from "react";

const FormGroup = ({ inputType, handler, name, labelName, val }) => {
    return (
        <div className="form-group">
            <label>{labelName}
                {
                    inputType === 'textarea' ?
                        <textarea type={inputType} name={name} onChange={handler} value={val} />
                        :
                        <input type={inputType} name={name} onChange={handler} value={val} />
                }
            </label>
        </div>
    )
}

export default FormGroup