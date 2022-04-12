import React from "react";

const FormSelect = ({ handler, name, labelName, val }) => {
    return (
        <div className="form-group">
            <label>{labelName}
                <select name={name} onChange={handler} value={val}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </label>
        </div>
    )
}

export default FormSelect