import React from "react";

const FormSelect = ({ handler, name, labelName }) => {
    return (
        <div className="form-group">
            <label>{labelName}
                <select name={name} onChange={handler}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
            </label>
        </div>
    )
}

export default FormSelect