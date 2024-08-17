
import React, { useContext, useEffect } from 'react';
import { InputsContext } from './InputsContext';

export const dummyData = {
    revenue: 100,
    netProfit: 10,
    sde: 20,
    sellingPrice: 80,
}

const Inputs: React.FC = () => {
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


    return (
        <div style={{
            display: 'flex', flexDirection: 'row',
            textAlign: 'left',
            justifyContent: 'space-evenly',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightblue', }}>
                <label>
                    Revenue:
                    <input
                        type="number"
                        value={state.revenue}
                        onChange={(e) => setRevenue(Number(e.target.value))}
                    />
                </label>
                <label>
                    Net Profit:
                    <input
                        type="number"
                        value={state.netProfit}
                        onChange={(e) => setNetProfit(Number(e.target.value))}
                    />
                </label>
                <label>
                    SDE:
                    <input
                        type="number"
                        value={state.sde}
                        onChange={(e) => setSde(Number(e.target.value))}
                    />
                    <br />
                    {/* (net profit + owner's salary + discretionary expenses): */}
                </label>
                <label>
                    Selling Price:
                    <input
                        type="number"
                        value={state.sellingPrice}
                        onChange={(e) => setSellingPrice(Number(e.target.value))}
                    />
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', }}>
                <label>
                    Profit Margin: {((state.netProfit / state.revenue) * 100).toFixed(2) || 0} %
                </label>
                <label>
                    Buying Multiple: {(state.sellingPrice / state.sde).toFixed(2) || 0}
                </label>
            </div>
        </div>
    )
};

export default Inputs;
