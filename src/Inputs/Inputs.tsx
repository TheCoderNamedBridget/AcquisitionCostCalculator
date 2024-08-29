
import React, { useContext, useEffect, useState } from 'react';
import { InputsContext } from './InputsContext';
import LabelledInput from '../components/LabelledInput';
import './Inputs.css'
import Irr from '../components/Irr';

const dummyData = {
    revenue: 100,
    netProfit: 10,
    sde: 20,
    sellingPrice: 80,

    equityStepUp: 1.7,
    investorEquity: 10,
    growthRate: 5,

    netPresentValue: 0,
    yearlyCashFlow: 400,
    numYears: 4,
    rateOfReturn: 0.2,
    totalDebtService: 5,
    initialInvestment: 1000,
}

const Inputs = () => {
    const context = useContext(InputsContext);

    if (!context) {
        throw new Error('Inputs must be used within an InputsProvider');
    }

    const { state, dispatch } = context;

    useEffect(() => {
        setRevenue(dummyData.revenue);
        setNetProfit(dummyData.netProfit);
        setSde(dummyData.sde);
        setSellingPrice(dummyData.sellingPrice);
        setEquityStepUp(dummyData.equityStepUp);
        setInvestorEquity(dummyData.investorEquity);
        setGrowthRate(dummyData.growthRate);
        setNetPresentValue(dummyData.netPresentValue)
        setYearlyCashFlow(dummyData.yearlyCashFlow)
        setNumYears(dummyData.numYears)
        setRateOfReturn(dummyData.rateOfReturn)
        setInitialInvestment(dummyData.initialInvestment)
        setTotalDebtService(dummyData.totalDebtService)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setRevenue = (revenue: number) => {
        dispatch({ type: 'setRevenue', payload: { revenue } });
    };

    const setNetProfit = (netProfit: number) => {
        dispatch({ type: 'setNetProfit', payload: { netProfit } });
    };

    const setSde = (sde: number) => {
        dispatch({ type: 'setSde', payload: { sde } });
    };

    const setSellingPrice = (sellingPrice: number) => {
        dispatch({ type: 'setSellingPrice', payload: { sellingPrice } });
    };

    const setEquityStepUp = (equityStepUp: number) => {
        dispatch({ type: 'setEquityStepUp', payload: { equityStepUp } });
    };

    const setInvestorEquity = (investorEquity: number) => {
        dispatch({ type: 'setInvestorEquity', payload: { investorEquity } });
    };

    const setGrowthRate = (growthRate: number) => {
        dispatch({ type: 'setGrowthRate', payload: { growthRate } });
    };

    const setNetPresentValue = (netPresentValue: number) => {
        dispatch({ type: 'setNetPresentValue', payload: { netPresentValue } });
    };

    const setTotalDebtService = (totalDebtService: number) => {
        dispatch({ type: 'setTotalDebtService', payload: { totalDebtService } });
    };

    const setYearlyCashFlow = (yearlyCashFlow: number) => {
        dispatch({ type: 'setYearlyCashFlow', payload: { yearlyCashFlow } });
    };

    const setNumYears = (numYears: number) => {
        dispatch({ type: 'setNumYears', payload: { numYears } });
    };

    const setRateOfReturn = (rateOfReturn: number) => {
        dispatch({ type: 'setRateOfReturn', payload: { rateOfReturn } });
    };

    const setInitialInvestment = (initialInvestment: number) => {
        dispatch({ type: 'setInitialInvestment', payload: { initialInvestment } });
    };

    // npv = summation of t (yearlyCashFlow * t) / (1 + rate of return)^t
    useEffect(() => {
        let netPresentValueCalc = 0
        for (let t = 1; t < state.numYears + 1; t++) {
            netPresentValueCalc += (state.yearlyCashFlow / (1 + state.rateOfReturn) ** t)
        }
        netPresentValueCalc -= state.initialInvestment;
        setNetPresentValue(netPresentValueCalc)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.yearlyCashFlow, state.numYears, state.rateOfReturn, state.initialInvestment])

    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            justifyContent: 'space-evenly',
        }}>
            <div className="inputs-column">
                <LabelledInput labelText='Revenue:' value={state.revenue} setValue={setRevenue} />
                <LabelledInput labelText='Net Profit:' value={state.netProfit} setValue={setNetProfit} />
                <LabelledInput labelText='SDE:' value={state.sde} setValue={setSde} />
                <LabelledInput labelText='Selling Price:' value={state.sellingPrice} setValue={setSellingPrice} />
                <LabelledInput labelText='Equity Step Up:' value={state.equityStepUp} setValue={setEquityStepUp} />
                <LabelledInput labelText='Investor Equity %:' value={state.investorEquity} setValue={setInvestorEquity} />
                <LabelledInput labelText='Growth Rate %:' value={state.growthRate} setValue={setGrowthRate} />
                <LabelledInput labelText='Total Debt Service:' value={state.totalDebtService} setValue={setTotalDebtService} />
                <br />
                <LabelledInput labelText='Net Present Value:' value={state.netPresentValue} setValue={setNetPresentValue} />
                <LabelledInput labelText='Yearly Cashflow:' value={state.yearlyCashFlow} setValue={setYearlyCashFlow} />
                <LabelledInput labelText='Num years:' value={state.numYears} setValue={setNumYears} />
                <LabelledInput labelText='Rate of return:' value={state.rateOfReturn} setValue={setRateOfReturn} />
                <LabelledInput labelText='Initial investment:' value={state.initialInvestment} setValue={setInitialInvestment} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', }}>
                <label>
                    Profit Margin: {((state.netProfit / state.revenue) * 100).toFixed(2) || 0} %
                </label>
                <label>
                    Buying Multiple: {(state.sellingPrice / state.sde).toFixed(2) || 0}
                </label>
                <label>
                    Debt Service Coverage Ratio: {state.netPresentValue / state.totalDebtService}
                </label>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <label>
                    Net Present Value:
                    {
                        state.netPresentValue.toFixed(2)
                    }
                </label>
                <Irr cashFlows={[-1000, 300, 420, 680]} initialGuess={0.1} tolerance={1e-7} maxIterations={1000} />
            </div>
        </div>
    )
};

export default Inputs;
