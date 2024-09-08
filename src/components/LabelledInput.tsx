import React from 'react';
import './LabelledInput.css'

type LabelledInputProps = {
    labelText?: string,
    value: number,
    setValue: (newValue: number) => void,
    disabled?: boolean;
}

const LabelledInput = (props: LabelledInputProps) => {
    return (
        <div className="row">
            {
                props.labelText &&
                <label>
                    {props.labelText}
                </label>
            }
            <input
                placeholder={props.value.toString()}
                onChange={(e) => props.setValue(Number(e.target.value))}
                disabled={props.disabled}
            />
        </div>
    )
}

export default LabelledInput;