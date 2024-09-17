import { useEffect, useState } from "react";
import LabelledInput from "./LabelledInput";
import { DebtItem } from "../types";
import "./DebtEntry.css"
import { formatNum } from "../utilities";

type DebtEntryProps = {
    amount: number
    debtItem: DebtItem;
    purchasePrice: number;
    onChange: (index: number, newDebtItem: DebtItem) => void;
}

const DebtEntry = (props: DebtEntryProps) => {
    const [principal, setPrincipal] = useState(props.debtItem.principal);
    const [rate, setRate] = useState(props.debtItem.interestRate);
    const [loanTerm, setLoanTerm] = useState(props.debtItem.loanTerm);

    useEffect(() => {
        handleChange()
    }, [props.debtItem.id, principal, rate, loanTerm])


    useEffect(() => {
        setPrincipal(props.amount);
    }, [props.amount])


    function handleChange() {
        props.onChange(props.debtItem.id, {
            id: props.debtItem.id,
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
            <LabelledInput value={principal} setValue={setPrincipal} disabled />
            <LabelledInput value={rate} setValue={setRate} disabled />
            <LabelledInput value={loanTerm} setValue={setLoanTerm} disabled />
            {formatNum(getLoanPercentageOfPurchasePrice(principal), 0)}%
        </div>
    )
}

export default DebtEntry;