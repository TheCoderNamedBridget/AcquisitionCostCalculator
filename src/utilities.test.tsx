
import { defaultBankDebtItem, defaultSellerDebtItem } from './types';
import { calculateAnnualDebtPayment, calculateDeferredAnnualDebtPayment, calculateDscr } from './utilities';

// TODO: longer term will want 4 decimal places of precision
// add more edge test cases esp for dscr
// stub out methods so calculateDscr isn't dependent on other functions
describe("calculateAnnualDebtPayment", () => {
    it('calculates the correct annual debt payment for a typical loan', () => {
        const payment = calculateAnnualDebtPayment(0.08, 400000, 10);
        expect(Number(payment)).toBeCloseTo(59611.79, 1);
    });

    it('calculates the correct annual debt payment for a different typical loan', () => {
        const payment = calculateAnnualDebtPayment(0.08, 466560, 8);
        expect(Number(payment)).toBeCloseTo(81188.326, 1);
    });
});

describe("calculateDeferredAnnualDebtPayment", () => {
    it('calculates the correct deferred annual debt payment', () => {
        const deferredPayment = calculateDeferredAnnualDebtPayment(0.08, 400000, 10, 2);
        expect(Number(deferredPayment)).toBeCloseTo(81188.326, 2);
    });
});

describe("calculateDscr", () => {
    it('calculates the correct DSCR', () => {
        const sde = 3;
        const debts = [defaultBankDebtItem, defaultSellerDebtItem];

        const dscr = calculateDscr(debts, sde);
        expect(dscr).toBeCloseTo(0.931, 2);
    });
});


