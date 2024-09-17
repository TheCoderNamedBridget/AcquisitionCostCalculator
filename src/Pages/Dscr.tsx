import { useEffect, useState } from "react";
import LabelledInput from "../components/LabelledInput";
import DebtSection from "../components/DebtSection";
import { DebtItem, defaultBankDebtItem, defaultInvestorDebtItem, defaultSellerDebtItem } from "../types";
import { formatNum } from "../utilities";
import DraggablePieChart from "../components/draggable-pie-chart/DraggablePieChart";

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

    const [bankAmount, setBankAmount] = useState(0)
    const [investorAmount, setInvestorAmount] = useState(0)
    const [sellerAmount, setSellerAmount] = useState(0)

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
    }, [purchasePrice, downPayment, sde, debts]);

    useEffect(() => {
        setDebts([defaultInvestorDebtItem, defaultBankDebtItem, defaultSellerDebtItem]);

        const canvas = document.getElementById('customCanvas') as HTMLCanvasElement;
        if (canvas) {
            canvas.width = 600;
            canvas.height = 400;
            var proportions = [
                { proportion: 50, format: { color: "#4CAF50", label: 'Seller' } },
                { proportion: 20, format: { color: "#0073e6", label: 'Investor' } },
                { proportion: 30, format: { color: "#B0BEC5", label: 'Bank' } },];
            const piechart = new DraggablePieChart({
                canvas: canvas,
                proportions: proportions,
                onchange: onPieChartChange
            });
            piechart.draw();
        }
    }, []);

    function onPieChartChange(piechart: DraggablePieChart) {
        var percentages = piechart.getAllSliceSizePercentages();

        setSellerAmount(formatNum(percentages[0]) / 100);
        setInvestorAmount(formatNum(percentages[1]) / 100);
        setBankAmount(formatNum(percentages[2]) / 100);
    }


    return (
        <div >
            <h2 className="header">Dscr</h2>
            <div className="display">
                <div className="inputs">
                    <br />
                    <LabelledInput labelText={"Purchase Price"} value={purchasePrice} setValue={setPurchasePrice} />
                    <LabelledInput labelText={"Down Payment"} value={downPayment} setValue={setDownPayment} />
                    <LabelledInput labelText={"SDE"} value={sde} setValue={setSde} />
                    <br />
                    <br />
                    <canvas id="customCanvas" />
                </div>
                <div className="outputs">
                    <DebtSection
                        totalDebt={purchasePrice - downPayment}
                        debts={debts}
                        setDebts={setDebts}
                        dscr={dscr}
                        bankAmount={bankAmount}
                        setBankAmount={setBankAmount}
                        investorAmount={investorAmount}
                        setInvestorAmount={setInvestorAmount}
                        sellerAmount={sellerAmount}
                        setSellerAmount={setSellerAmount}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dscr;