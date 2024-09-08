import { useEffect, useState } from "react";
import { DebtItem, defaultBankDebtItem, defaultInvestorDebtItem, defaultSellerDebtItem } from "../types";
import DebtEntry from "./DebtEntry";
import './DebtSection.css'
import DraggablePieChart from "./draggable-pie-chart/DraggablePieChart";
import { formatNum } from "../utilities";
import LabelledRow from "./LabelledRow";
import StaticPieChart from "./static-pie-chart/StaticPieChart";

type DebtSectionProps = {
    purchasePrice: number;
    debts: DebtItem[],
    setDebts: (debt: DebtItem[]) => void
    dscr: number;
}

const DebtSection = (props: DebtSectionProps) => {
    const [bankAmount, setBankAmount] = useState(0)
    const [investorAmount, setInvestorAmount] = useState(0)
    const [sellerAmount, setSellerAmount] = useState(0)

    const [investorEquity, setInvestorEquity] = useState(0);
    useEffect(() => {
        props.setDebts([defaultInvestorDebtItem, defaultBankDebtItem, defaultSellerDebtItem]);

        const canvas = document.getElementById('customCanvas') as HTMLCanvasElement;
        if (canvas) {
            // canvas.width = 600;
            // canvas.height = 400;
            // TODO: finish linking the proportion to the input so that it can be changed bi-directionally?
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

    useEffect(() => {
        setInvestorEquity(formatNum(investorAmount * 1.7));
    }, [investorAmount])

    function onPieChartChange(piechart: DraggablePieChart) {
        var percentages = piechart.getAllSliceSizePercentages();

        setSellerAmount(formatNum(percentages[0]) / 100);
        setInvestorAmount(formatNum(percentages[1]) / 100);
        setBankAmount(formatNum(percentages[2]) / 100);
    }

    function updateDebtEntry(index: number, newDebtItem: DebtItem) {
        props.debts[index] = newDebtItem
        let newDebts = props.debts.map((debt) => debt.id === index ? newDebtItem : debt)

        props.setDebts(newDebts)
    }

    return (
        <div>
            <h2 className="header">Debt Section</h2>
            <div className="debts-section">
                <div className="inputs">
                    <canvas id="customCanvas" />
                </div>
                <div className="outputs">
                    <StaticPieChart title="Percentage Owned" labels={["investor", "buyer"]} data={[investorEquity, formatNum((1 - investorEquity))]} />
                    <LabelledRow labelText={["Amount", "Rate %", "Loan Term"]}></LabelledRow>
                    <DebtEntry amount={formatNum(sellerAmount * props.purchasePrice)} debtItem={{ ...defaultSellerDebtItem, id: 0, }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
                    <DebtEntry amount={formatNum(bankAmount * props.purchasePrice)} debtItem={{ ...defaultBankDebtItem, id: 1 }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
                    <DebtEntry amount={formatNum(investorAmount * props.purchasePrice)} debtItem={{ ...defaultInvestorDebtItem, id: 2 }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
                    <label> DSCR: {formatNum(props.dscr)}</label>
                </div>
            </div>
        </div>
    )
}

export default DebtSection;