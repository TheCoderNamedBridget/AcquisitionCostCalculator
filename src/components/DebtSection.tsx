import { useEffect, useState } from "react";
import { DebtItem, defaultBankDebtItem, defaultInvestorDebtItem, defaultSellerDebtItem } from "../types";
import DebtEntry from "./DebtEntry";
import { formatNum } from "../utilities";
import LabelledRow from "./LabelledRow";
import StaticPieChart from "./static-pie-chart/StaticPieChart";

type DebtSectionProps = {
    totalDebt: number;
    debts: DebtItem[],
    setDebts: (debt: DebtItem[]) => void
    dscr: number;
    bankAmount: number;
    setBankAmount: (bankAmount: number) => void
    investorAmount: number;
    setInvestorAmount: (investorAmount: number) => void
    sellerAmount: number;
    setSellerAmount: (sellerAmount: number) => void
}

const DebtSection = (props: DebtSectionProps) => {
    const [investorEquity, setInvestorEquity] = useState(0);
    useEffect(() => {
        props.setDebts([defaultInvestorDebtItem, defaultBankDebtItem, defaultSellerDebtItem]);
    }, []);

    useEffect(() => {
        setInvestorEquity(formatNum(props.investorAmount * 1.7));
    }, [props.investorAmount])


    function updateDebtEntry(index: number, newDebtItem: DebtItem) {
        props.debts[index] = newDebtItem
        let newDebts = props.debts.map((debt) => debt.id === index ? newDebtItem : debt)

        props.setDebts(newDebts)
    }

    return (
        <div className="outputs">
            <LabelledRow labelText={["Amount", "Rate %", "Loan Term"]}></LabelledRow>
            <DebtEntry amount={formatNum(props.sellerAmount * props.totalDebt)} debtItem={{ ...defaultSellerDebtItem, id: 0, }} purchasePrice={props.totalDebt} onChange={updateDebtEntry} />
            <DebtEntry amount={formatNum(props.bankAmount * props.totalDebt)} debtItem={{ ...defaultBankDebtItem, id: 1 }} purchasePrice={props.totalDebt} onChange={updateDebtEntry} />
            <DebtEntry amount={formatNum(props.investorAmount * props.totalDebt)} debtItem={{ ...defaultInvestorDebtItem, id: 2 }} purchasePrice={props.totalDebt} onChange={updateDebtEntry} />
            <br />
            <label> DSCR: {formatNum(props.dscr)}</label>
            {investorEquity > 1 ? <p>Warning: investor equity is over 100%</p> : <br />}
            <StaticPieChart title="Percentage Owned" labels={["investor", "buyer"]} data={[investorEquity, formatNum((1 - investorEquity))]} />
        </div>
    )
}

export default DebtSection;