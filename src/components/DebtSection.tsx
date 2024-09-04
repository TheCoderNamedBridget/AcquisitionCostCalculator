import { useEffect, useState } from "react";
import { DebtItem, defaultBankDebtItem, defaultInvestorDebtItem, defaultSellerDebtItem } from "../types";
import DebtEntry from "./DebtEntry";
import './DebtSection.css'
import DraggablePieChart from "../draggable-pie-chart/DraggablePieChart";
import { formatNum } from "../utilities";

type DebtSectionProps = {
    purchasePrice: number;
    debts: DebtItem[],
    setDebts: (debt: DebtItem[]) => void
}

const DebtSection = (props: DebtSectionProps) => {
    const [bankAmount, setBankAmount] = useState(0)
    const [investorAmount, setInvestorAmount] = useState(0)
    const [sellerAmount, setSellerAmount] = useState(0)
    useEffect(() => {
        props.setDebts([defaultInvestorDebtItem, defaultBankDebtItem, defaultSellerDebtItem]);
    }, [])

    function onPieChartChange(piechart: DraggablePieChart) {
        // get all percentages
        var percentages = piechart.getAllSliceSizePercentages();

        setSellerAmount(formatNum(percentages[0]) / 100);
        setInvestorAmount(formatNum(percentages[1]) / 100);
        setBankAmount(formatNum(percentages[2]) / 100);
    }

    useEffect(() => {
        const canvas = document.createElement('canvas');

        canvas.width = 600;
        canvas.height = 400;
        document.body.appendChild(canvas);
        var proportions = [
            { proportion: 50, format: { color: "#4CAF50", label: 'Seller' } },
            { proportion: 20, format: { color: "#003366", label: 'Investor' } },
            { proportion: 30, format: { color: "#B0BEC5", label: 'Bank' } },];
        const piechart = new DraggablePieChart({
            canvas: canvas,
            proportions: proportions,
            onchange: onPieChartChange
        });
        piechart.draw();
    }, [])

    function updateDebtEntry(index: number, newDebtItem: DebtItem) {
        props.debts[index] = newDebtItem
        let newDebts = props.debts.map((debt) => debt.id === index ? newDebtItem : debt)

        props.setDebts(newDebts)
    }

    return (
        <div className="debts-section">
            <h2>Debt Section</h2>


            <DebtEntry amount={formatNum(sellerAmount * props.purchasePrice)} debtItem={{ ...defaultSellerDebtItem, id: 0, }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
            <DebtEntry amount={formatNum(bankAmount * props.purchasePrice)} debtItem={{ ...defaultBankDebtItem, id: 1 }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
            <DebtEntry amount={formatNum(investorAmount * props.purchasePrice)} debtItem={{ ...defaultInvestorDebtItem, id: 2 }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
        </div>
    )
}

export default DebtSection;