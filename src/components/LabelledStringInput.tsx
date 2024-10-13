import React from 'react';
import './LabelledInput.css'

type LabelledStringInputProps = {
    labelText?: string,
    value: string,
    setValue: (newValue: string) => void,
    disabled?: boolean;
}

const LabelledStringInput = (props: LabelledStringInputProps) => {
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
                onChange={(e) => props.setValue(e.target.value)}
                disabled={props.disabled}
            />
        </div>
    )
}

export default LabelledStringInput;