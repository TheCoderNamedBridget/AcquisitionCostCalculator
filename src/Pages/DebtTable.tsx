import React, { useContext, useEffect } from 'react';
import { InputsContext } from '../Inputs/InputsContext';

const dummyData = {
    principal: 200000, // Principal amount of the loan
    interestRate: 4, // Annual interest rate in percentage
    term: 30, // Term of the loan in years
    amortization: 'Monthly', // Amortization frequency (e.g., Monthly, Quarterly)
    monthlyPayment: 954.83, // Calculated monthly payment amount
    totalInterestPaid: 143739.20, // Total interest paid over the loan term
    balloonPayment: 0, // Balloon payment amount (if any)
    earlyRepaymentPenalty: 0, // Penalty for early repayment (if any)
    gracePeriod: '30 days', // Grace period before late fees apply
    loanToValueRatio: 80, // Loan-to-Value Ratio in percentage
    debtServiceCoverageRatio: 1.5, // Debt Service Coverage Ratio
}

const DebtTable: React.FC = () => {
    const context = useContext(InputsContext);

    if (!context) {
        throw new Error('Inputs must be used within an InputsProvider');
    }

    const { state, dispatch } = context;

    const setDebtDetails = (debtDetails: typeof dummyData) => {
        dispatch({ type: 'setDebtDetails', payload: { debtDetails } });
    };

    useEffect(() => {
        setDebtDetails({
            principal: dummyData.principal,
            interestRate: dummyData.interestRate,
            term: dummyData.term,
            amortization: dummyData.amortization,
            monthlyPayment: dummyData.monthlyPayment,
            totalInterestPaid: dummyData.totalInterestPaid,
            balloonPayment: dummyData.balloonPayment,
            earlyRepaymentPenalty: dummyData.earlyRepaymentPenalty,
            gracePeriod: dummyData.gracePeriod,
            loanToValueRatio: dummyData.loanToValueRatio,
            debtServiceCoverageRatio: dummyData.debtServiceCoverageRatio
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h2 className="header">Debt</h2>

            <table border={1}>
                <tbody>
                    <tr>
                        <th>Principal</th>
                        <th>Interest Rate</th>
                        <th>Term</th>
                        <th>Amortization</th>
                        <th>Monthly Payment</th>
                        <th>Total Interest Paid</th>
                        <th>Balloon Payment</th>
                        <th>Early Repayment Penalty</th>
                        <th>Grace Period</th>
                        <th>Loan-to-Value Ratio</th>
                        <th>Debt Service Coverage Ratio</th>
                    </tr>
                    <tr>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.principal}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, principal: Number(e.target.value) })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.interestRate}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, interestRate: Number(e.target.value) })}
                            />%
                        </td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.term}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, term: Number(e.target.value) })}
                            /> months
                        </td>
                        <td>
                            <input
                                type="text"
                                value={state.debtDetails.amortization}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, amortization: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.monthlyPayment.toFixed(2)}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, monthlyPayment: Number(e.target.value) })}
                            />
                        </td>
                        <td>${state.debtDetails.totalInterestPaid.toFixed(2)}</td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.balloonPayment.toFixed(2)}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, balloonPayment: Number(e.target.value) })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.earlyRepaymentPenalty.toFixed(2)}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, earlyRepaymentPenalty: Number(e.target.value) })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                value={state.debtDetails.gracePeriod}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, gracePeriod: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.loanToValueRatio.toFixed(2)}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, loanToValueRatio: Number(e.target.value) })}
                            />%
                        </td>
                        <td>
                            <input
                                type="number"
                                value={state.debtDetails.debtServiceCoverageRatio.toFixed(2)}
                                onChange={(e) => setDebtDetails({ ...state.debtDetails, debtServiceCoverageRatio: Number(e.target.value) })}
                            />
                        </td>

                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default DebtTable;
