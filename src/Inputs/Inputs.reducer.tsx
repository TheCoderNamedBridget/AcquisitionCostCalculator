interface DebtDetails {
    principal: number;
    interestRate: number;
    term: number;
    amortization: string;
    monthlyPayment: number;
    totalInterestPaid: number;
    balloonPayment: number;
    earlyRepaymentPenalty: number;
    gracePeriod: string;
    loanToValueRatio: number;
    debtServiceCoverageRatio: number;
}

interface InputsState {
    revenue: number;
    netProfit: number;
    sde: number;
    sellingPrice: number;
    equityStepUp: number;
    investorEquity: number;
    growthRate: number;
    netPresentValue: number;
    totalDebtService: number;
    yearlyCashFlow: number;
    numYears: number;
    rateOfReturn: number;
    initialInvestment: number;
    debtDetails: DebtDetails;
}

export const initialInputsState: InputsState = {
    revenue: 0,
    netProfit: 0,
    sde: 0,
    sellingPrice: 0,

    equityStepUp: 0,
    investorEquity: 0,
    growthRate: 0,

    netPresentValue: 0,
    totalDebtService: 0, // total principal and interest payments due in 1 year
    yearlyCashFlow: 0,
    numYears: 0,
    rateOfReturn: 0,
    initialInvestment: 0,

    debtDetails: {
        principal: 0, // Principal amount of the loan
        interestRate: 0, // Annual interest rate in percentage
        term: 0, // Term of the loan in years
        amortization: 'Monthly', // Amortization frequency (e.g., Monthly, Quarterly)
        monthlyPayment: 0, // Calculated monthly payment amount
        totalInterestPaid: 0, // Total interest paid over the loan term
        balloonPayment: 0, // Balloon payment amount (if any)
        earlyRepaymentPenalty: 0, // Penalty for early repayment (if any)
        gracePeriod: '30 days', // Grace period before late fees apply
        loanToValueRatio: 0, // Loan-to-Value Ratio in percentage
        debtServiceCoverageRatio: 0, // Debt Service Coverage Ratio
    }
};

interface Action {
    type: string;
    payload: any;
}

// TODO make the reducer more generic for setting the values of each input
// also move the models into a different directory + file than the reducer
export function inputsReducer(state: InputsState, action: Action): InputsState {
    switch (action.type) {
        case 'setRevenue':
            return { ...state, revenue: action.payload.revenue };
        case 'setNetProfit':
            return { ...state, netProfit: action.payload.netProfit };
        case 'setSde':
            return { ...state, sde: action.payload.sde };
        case 'setSellingPrice':
            return { ...state, sellingPrice: action.payload.sellingPrice };

        case 'setEquityStepUp':
            return { ...state, equityStepUp: action.payload.equityStepUp };
        case 'setInvestorEquity':
            return { ...state, investorEquity: action.payload.investorEquity };
        case 'setGrowthRate':
            return { ...state, growthRate: action.payload.growthRate };

        case 'setNetPresentValue':
            return { ...state, netPresentValue: action.payload.netPresentValue };
        case 'setTotalDebtService':
            return { ...state, totalDebtService: action.payload.totalDebtService };
        case 'setYearlyCashFlow':
            return { ...state, yearlyCashFlow: action.payload.yearlyCashFlow };
        case 'setNumYears':
            return { ...state, numYears: action.payload.numYears };
        case 'setRateOfReturn':
            return { ...state, rateOfReturn: action.payload.rateOfReturn };
        case 'setInitialInvestment':
            return { ...state, initialInvestment: action.payload.initialInvestment };


        default:
            return state;
    }
}

