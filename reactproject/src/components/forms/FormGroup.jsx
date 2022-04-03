import React from "react";

const FormGroup = ({ inputType, handler, name, labelName }) => {
    return (
        <div className="form-group">
            <label>{labelName}
                {
                    inputType === 'textarea' ?
                        <textarea type={inputType} name={name} onChange={handler} />
                        :
                        <input type={inputType} name={name} onChange={handler} />
                }
            </label>
        </div>
    )
}

export default FormGroup