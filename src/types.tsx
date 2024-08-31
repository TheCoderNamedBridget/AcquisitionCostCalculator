export interface DebtItem {
    id: number;
    principal: number;
    interestRate: number;
    loanTerm: number;
}

export const defaultDebtItem: DebtItem = {
    id: 0,
    principal: 10,
    interestRate: 1,
    loanTerm: 5,
}

export const defaultSellerDebtItem: DebtItem = {
    ...defaultDebtItem,
    interestRate: 8,
}

export const defaultBankDebtItem: DebtItem = {
    ...defaultDebtItem,
    interestRate: 11.5,
}

export const defaultInvestorDebtItem: DebtItem = {
    ...defaultDebtItem,
    interestRate: 10,
}

export type DscrData = {
    purchasePrice: number;
    downPayment: number; //initial buyer investment
    sde: number; //seller discretionary earnings
    debts: DebtItem[]
}
