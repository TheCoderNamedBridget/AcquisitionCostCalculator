import React from 'react';
import './LabelledInput.css'

type LabelledInputProps = {
    labelText: string,
    value: number,
    setValue: (newValue: number) => void,
}

const LabelledInput = (props: LabelledInputProps) => {
    return (
        <div className="row">
            <label>
                {props.labelText}
            </label>
            <input
                type="number"
                value={props.value}
                onChange={(e) => props.setValue(Number(e.target.value))}
            />
        </div>
    )
}

export default LabelledInput;