import { DebtItem } from "./types";


/**
 * Formats num to numDecimalPlaces
 * @param num 
 */
export function formatNum(num: number, numDecimalPlaces: number = 2) {
    return Number(num.toFixed(numDecimalPlaces))
}


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
export function calculateAnnualDebtPayment(interestRate: number, principalAmount: number, loanTerm: number) {
    const decimalInterestRate = interestRate;

    const numerator = (decimalInterestRate * principalAmount);
    const denominator = 1 - ((1 + decimalInterestRate) ** -loanTerm);

    let annualPayment = numerator / denominator;

    return formatNum(annualPayment);
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
export function calculateDeferredAnnualDebtPayment(interestRate: number, principalAmount: number, loanTerm: number, yearsDeferred: number) {
    let principalWithInterest = (principalAmount * ((1 + interestRate) ** yearsDeferred));
    let newLoanTerm = loanTerm - yearsDeferred;

    return calculateAnnualDebtPayment(interestRate, principalWithInterest, newLoanTerm)
}


export function calculateDscr(debts: DebtItem[], sde: number, year: number = 1) {
    let debtPayments = debts.map((debt) => calculateDeferredAnnualDebtPayment((debt.interestRate / 100), debt.principal, debt.loanTerm, 0));
    let summedPayment = debtPayments.length > 0 ? debtPayments.reduce((curSum, curVal) => curSum + curVal) : 0;
    let denominator = summedPayment;
    let dscr = sde / (denominator);

    return dscr
}