import { useEffect, useState } from "react";
import LabelledInput from "../components/LabelledInput";
import DebtSection from "../components/DebtSection";
import { DebtItem } from "../types";
import { formatNum } from "../utilities";

/**
 * Class for calculating the DSCR in a various year
 * 
 * Assumptions:
 * Debt payments start in year 0
 * Payments are made in equal amounts over the loan term
 * 
 */

const Dscr = () => {
    const [purchasePrice, setPurchasePrice] = useState(10);
    const [downPayment, setDownPayment] = useState(0); //inital buyer investment
    const [sde, setSde] = useState(1);

    const [debts, setDebts] = useState<DebtItem[]>([]);

    const [dscr, setDscr] = useState(0);

    /**
     * For a debt item calculate the payment in a given year, rounded to 2 decimal
     * annual payment = (r * pv) / (1 - (1 + r))^x
     * r = interestRate (assume the user will enter as % ex: 10% not 0.1)
     * pv = principalAmount
     * x = loanTerm
     * @param interestRate
     * @param principalAmount
     * @param loanTerm
     * @returns number
     */
    function calculateAnnualDebtPayment(interestRate: number, principalAmount: number, loanTerm: number) {
        const decimalInterestRate = interestRate / 100

        const numerator = (decimalInterestRate * principalAmount)
        const denominator = 1 - ((1 + decimalInterestRate) ** -loanTerm)
        let annualPayment = numerator / denominator

        return formatNum(annualPayment)
    }

    /**
     * This is a wrapper function that calculates the acculumated debt with interest
     * and the loanTerm - the number of years deferred
     * principal with interest = pv * (1 + r)^y
     * new loan term = x - y
     * y = num years deferred payments
     * @param interestRate
     * @param principalAmount
     * @param loanTerm
     * @param yearsDeferred when 0, payments start in year 1
     * @returns number
     */
    function calculateDeferredAnnualDebtPayment(interestRate: number, principalAmount: number, loanTerm: number, yearsDeferred: number) {
        let principalWithInterest = principalAmount * ((1 + interestRate) ** yearsDeferred);
        let newLoanTerm = loanTerm - yearsDeferred;

        return calculateAnnualDebtPayment(interestRate, principalWithInterest, newLoanTerm)
    }

    function calculateDscr(year: number = 1) {
        let debtPayments = debts.map((debt) => calculateDeferredAnnualDebtPayment(debt.interestRate, debt.principal, debt.loanTerm, 0))
        let summedPayment = debtPayments.length > 0 ? debtPayments.reduce((curSum, curVal) => curSum + curVal) : 0;
        let denominator = downPayment + summedPayment;

        let dscr = sde / (denominator)

        return dscr
    }

    useEffect(() => {
        setDscr(calculateDscr())
    }, [purchasePrice, downPayment, sde, debts])

    return (
        <div >
            <h2>Dscr</h2>
            <LabelledInput labelText={"Purchase Price"} value={purchasePrice} setValue={setPurchasePrice} />
            <LabelledInput labelText={"Down Payment"} value={downPayment} setValue={setDownPayment} />
            <LabelledInput labelText={"SDE"} value={sde} setValue={setSde} />
            <br />
            <DebtSection purchasePrice={purchasePrice} debts={debts} setDebts={setDebts} dscr={dscr} />
        </div>
    )
}

export default Dscr;