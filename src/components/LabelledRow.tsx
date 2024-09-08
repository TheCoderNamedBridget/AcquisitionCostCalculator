import './LabelledInput.css'

type LabelledRowProps = {
    labelText: string[],
}

const LabelledRow = (props: LabelledRowProps) => {
    return (
        <div className="row">
            {props.labelText.map((label, index) => <label className="text" key={index}> {label}</label>)}
        </div>
    )
}

export default LabelledRow;