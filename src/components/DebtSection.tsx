import { useEffect } from "react";
import { DebtItem, defaultBankDebtItem, defaultInvestorDebtItem, defaultSellerDebtItem } from "../types";
import DebtEntry from "./DebtEntry";
import './DebtSection.css'

type DebtSectionProps = {
    purchasePrice: number;
    debts: DebtItem[],
    setDebts: (debt: DebtItem[]) => void
}

const DebtSection = (props: DebtSectionProps) => {
    useEffect(() => {
        props.setDebts([defaultInvestorDebtItem]);
    }, [])

    function addDebtEntry(debtEntryType: DebtItem) {
        props.setDebts([...props.debts, debtEntryType]);
    }

    function updateDebtEntry(index: number, newDebtItem: DebtItem) {
        props.debts[index] = newDebtItem
        let newDebts = props.debts.map((debt) => debt.id === index ? newDebtItem : newDebtItem)

        props.setDebts(newDebts)
    }

    return (
        // TODO will probably want to make this a table later
        <div className="debts-section">
            <h2>Debt Section</h2>
            <button onClick={() => addDebtEntry(defaultSellerDebtItem)}>Add Seller</button>
            <button onClick={() => addDebtEntry(defaultBankDebtItem)}>Add Bank</button>
            <button onClick={() => addDebtEntry(defaultInvestorDebtItem)}>Add Investor</button>

            {props.debts.map((debt, index) => {
                return (
                    <div className="debt-row" key={index}>
                        <DebtEntry debtItem={{ ...debt, id: index }} purchasePrice={props.purchasePrice} onChange={updateDebtEntry} />
                    </div>
                )
            })}
        </div>
    )
}

export default DebtSection;