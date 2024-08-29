import React, { useState } from 'react';
import { create, all } from 'mathjs';

// TODO: set this up so that someone can enter a list of profits and can get the irr based on that

type IrrProps = {
    // net amount of cash in and out of a business
    // basically can think of it like profit
    cashFlows: number[],
    initialGuess: number,
    tolerance: number,
    maxIterations: number,
}

const Irr = (props: IrrProps) => {
    const [irr, setIrr] = useState<number>();

    const math = create(all);

    const calculateNpv = (r: number): number => {
        return props.cashFlows.reduce((acc, curr, t) => {
            return acc + curr / Number(math.pow(1 + r, t));
        }, 0);
    }

    // Newton-Raphson method to find irr
    const findIrr = (initialGuess: number = props.initialGuess, tolerance: number = props.tolerance, maxIterations: number = props.maxIterations): number => {
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
            console.log(`The IRR is: ${(irr * 100).toFixed(2)}%`);
        } catch (error) {
            console.error('Error calculating IRR:', error)
        }
    }
    return (
        <>
            <label>
                Internal Re-occuring revenue: {irr && (irr * 100).toFixed(2)} %
            </label>
            <button onClick={() => findIrrNow()}>Find Irr</button>
        </>
    )
}

export default Irr;