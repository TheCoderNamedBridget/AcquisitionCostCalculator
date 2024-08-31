import { useEffect, useState } from "react";
import LabelledInput from "./LabelledInput";
import { DebtItem } from "../types";
import "./DebtEntry.css"
import { formatNum } from "../utilities";

type DebtEntryProps = {
    debtItem: DebtItem;
    purchasePrice: number;
    onChange: (index: number, newDebtItem: DebtItem) => void;
}

const DebtEntry = (props: DebtEntryProps) => {
    const [id, setId] = useState(0);
    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);


    useEffect(() => {
        setId(props.debtItem.id);
        setPrincipal(props.debtItem.principal);
        setRate(props.debtItem.interestRate);
        setLoanTerm(props.debtItem.loanTerm);
    }, [])

    useEffect(() => {
        handleChange()
    }, [id, principal, rate, loanTerm])


    function handleChange() {
        props.onChange(id, {
            id: id,
            principal: principal,
            interestRate: rate,
            loanTerm: loanTerm,
        })
    }

    /**
     * Gets ratio of loan amount to total purchase price
     * @param principalLoanAmount 
     * @returns loan percentage of purchase price
     */
    function getLoanPercentageOfPurchasePrice(principalLoanAmount: number) {
        return (principalLoanAmount / props.purchasePrice) * 100
    }

    return (
        <div className="debt-entry">
            <LabelledInput labelText={"Amount"} value={principal} setValue={setPrincipal} />
            <LabelledInput labelText={"Rate %"} value={rate} setValue={setRate} disabled={true} />
            <LabelledInput labelText={"Loan Term"} value={loanTerm} setValue={setLoanTerm} disabled={true} />
            {formatNum(getLoanPercentageOfPurchasePrice(principal))} %
        </div>
    )
}

export default DebtEntry;