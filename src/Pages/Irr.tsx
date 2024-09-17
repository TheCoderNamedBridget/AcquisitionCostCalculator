import { useState } from 'react';
import { create, all } from 'mathjs';
import LabelledInput from '../components/LabelledInput';

const Irr = () => {
    const [irr, setIrr] = useState<number>();
    const [cashFlow, setCashFlow] = useState("-500, 300, 400");
    const [initialGuess, setInitialGuess] = useState(0.1);
    const [tolerance, setTolerance] = useState(1e-6);
    const [maxIterations, setMaxIterations] = useState(100);

    function handleCashFlowChange(e: React.ChangeEvent<HTMLInputElement>) {
        setCashFlow(e.target.value);
    }

    function parseCashFlow(): number[] {
        return cashFlow.split(",").map(flow => parseFloat(flow.trim()));
    }

    const math = create(all);

    const calculateNpv = (r: number): number => {
        return parseCashFlow().reduce((acc, curr, t) => {
            return acc + curr / Number(math.pow(1 + r, t));
        }, 0);
    }

    // Newton-Raphson method to find irr
    const findIrr = (): number => {
        let rate = initialGuess;
        for (let i = 0; i < maxIterations; i++) {
            const npv = calculateNpv(rate);
            const derivativeNpv = (calculateNpv(rate + tolerance) - npv) / tolerance;

            if (math.abs(npv) < tolerance) {
                return rate;
            }

            rate -= npv / derivativeNpv
            if (math.abs(npv / derivativeNpv) < tolerance) {
                return rate
            }
        }
        throw new Error('IRR calculation did not converge')
    }

    function findIrrNow() {
        try {
            const irr = findIrr();
            setIrr(irr);
        } catch (error) {
            console.error('Error calculating IRR:', error)
        }
    }
    return (
        <>
            <h2 className="header">Irr</h2>
            <div className="row">
                Cashflows:
                <input type="text" value={cashFlow} onChange={handleCashFlowChange} />
            </div>
            <LabelledInput disabled labelText="Initial Guess" value={initialGuess} setValue={setInitialGuess} />
            <LabelledInput disabled labelText="Tolerance" value={tolerance} setValue={setTolerance} />
            <LabelledInput disabled labelText="Max iterations" value={maxIterations} setValue={setMaxIterations} />
            <label>
                Internal rate of return:
            </label>
            <button onClick={() => findIrrNow()}>Find Irr</button>
            {irr && (irr * 100).toFixed(2)} %
        </>
    )
}

export default Irr;