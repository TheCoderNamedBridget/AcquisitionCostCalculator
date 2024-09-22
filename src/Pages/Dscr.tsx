import { useEffect, useState } from "react";
import LabelledInput from "../components/LabelledInput";
import DebtSection from "../components/DebtSection";
import { DebtItem, defaultBankDebtItem, defaultSellerDebtItem } from "../types";
import { calculateDscr, formatNum } from "../utilities";
import DraggablePieChart from "../components/draggable-pie-chart/DraggablePieChart";

/**
 * Class for calculating the DSCR in a various year
 * 
 * Assumptions:
 * Debt payments start in year 0
 * Payments are made in equal amounts over the loan term
 * 
 * DSCR notes: 
 * Big impact: 
 * - changing sde/noi
 * Small impact:
 * - changing the principal loan amount
 * - changing the debt source seller(8%) => investor(11.5%) 
 * 
 * TODO: consider adding FCCR in future (accounts for investor payments)
 * 
 */

const Dscr = () => {
    const [purchasePrice, setPurchasePrice] = useState(1000000);
    const [downPayment, setDownPayment] = useState(200000); //inital buyer investment
    const [sde, setSde] = useState(300000);
    const [debts, setDebts] = useState<DebtItem[]>([]);
    const [dscr, setDscr] = useState(0);

    const [bankAmount, setBankAmount] = useState(0);
    // The investor amount is not debt, you do not buy pay it down
    // they buy it and own it 
    const [investorAmount, setInvestorAmount] = useState(0);
    const [sellerAmount, setSellerAmount] = useState(0);

    const [stepUp, setStepUp] = useState("1.7");

    useEffect(() => {
        setDscr(calculateDscr(debts, sde))
    }, [purchasePrice, downPayment, sde, debts]);

    useEffect(() => {
        // investor payments are not included in dscr
        setDebts([defaultBankDebtItem, defaultSellerDebtItem]);

        const canvas = document.getElementById('customCanvas') as HTMLCanvasElement;
        if (canvas) {
            canvas.width = 300;
            canvas.height = 250;
            var proportions = [
                { proportion: 15, format: { color: "#4CAF50", label: 'Seller' } },
                { proportion: 5, format: { color: "#0073e6", label: 'Investor' } },
                { proportion: 80, format: { color: "#B0BEC5", label: 'Bank' } },];
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
                    {/* typical down payment for business is 10-30% of purchase price */}
                    <LabelledInput labelText={"Down Payment"} value={downPayment} setValue={setDownPayment} />
                    <LabelledInput labelText={"SDE"} value={sde} setValue={setSde} />
                    <div className="row">
                        <>Step up: {stepUp}</>
                        <input
                            type="range"
                            min="1"
                            max="3"
                            step="0.1"
                            value={stepUp}
                            onChange={(event) => setStepUp(event.target.value)}
                        />
                    </div>
                    <br />
                    <br />
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
                        stepUp={Number(stepUp)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dscr;