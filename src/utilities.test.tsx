
import { defaultBankDebtItem, defaultSellerDebtItem } from './types';
import { calculateAnnualDebtPayment, calculateDeferredAnnualDebtPayment, calculateDscr } from './utilities';

// TODO: longer term will want 4 decimal places of precision

// Assumes 1,000,000 purchase price
describe("calculateAnnualDebtPayment", () => {
    it('calculates f0r bank 80%', () => {
        const payment = calculateAnnualDebtPayment(0.115, 800000, 10);
        expect(Number(payment)).toBeCloseTo(138701.77, 1);
    });

    it('calculates for seller 20%', () => {
        const payment = calculateAnnualDebtPayment(0.08, 200000, 10);
        expect(Number(payment)).toBeCloseTo(29805.9, 1);
    });
});

describe("calculateDeferredAnnualDebtPayment", () => {
    it('calculates bank debt payments 10%', () => {
        const deferredPayment = calculateDeferredAnnualDebtPayment(0.115, 100000, 10, 1);
        expect(Number(deferredPayment)).toBeCloseTo(20530.05, 2);
    });

    it('calculates seller debt payments 90%', () => {
        const deferredPayment = calculateDeferredAnnualDebtPayment(0.08, 900000, 10, 1);
        expect(Number(deferredPayment)).toBeCloseTo(155597.48, 2);
    });


    it('calculates bank debt payments 50%', () => {
        const deferredPayment = calculateDeferredAnnualDebtPayment(0.115, 500000, 10, 1);
        expect(Number(deferredPayment)).toBeCloseTo(102650.23, 2);
    });

    it('calculates seller debt payments 50%', () => {
        const deferredPayment = calculateDeferredAnnualDebtPayment(0.08, 500000, 10, 1);
        expect(Number(deferredPayment)).toBeCloseTo(86443.04, 2);
    });
});


describe("calculateDscr", () => {
    it('calculates sde 30% given bank 10%, seller 90%', () => {
        const sde = 300000;
        const debts = [{
            id: 1,
            principal: 100000,
            interestRate: 0.115,
            loanTerm: 10,
        }, {
            id: 0,
            principal: 900000,
            interestRate: 0.08,
            loanTerm: 10,
        }];

        const dscr = calculateDscr(debts, sde);
        expect(dscr).toBeCloseTo(1.98, 2);
    });

    it('calculates sde 30% bank and seller 50/50', () => {
        const sde = 300000;
        const debts = [{
            id: 0,
            principal: 500000,
            interestRate: 0.115,
            loanTerm: 10,
        }, {
            id: 1,
            principal: 500000,
            interestRate: 0.08,
            loanTerm: 10,
        }];

        const dscr = calculateDscr(debts, sde);
        expect(dscr).toBeCloseTo(1.86, 2);
    });


    it('calculates sde 10% given bank 10%, seller 90%', () => {
        const sde = 100000;
        const debts = [{
            id: 1,
            principal: 100000,
            interestRate: 0.115,
            loanTerm: 10,
        }, {
            id: 0,
            principal: 900000,
            interestRate: 0.08,
            loanTerm: 10,
        }];

        const dscr = calculateDscr(debts, sde);
        expect(dscr).toBeCloseTo(0.66, 2);
    });

    it('calculates sde 10% bank and seller 50/50', () => {
        const sde = 100000;
        const debts = [{
            id: 0,
            principal: 500000,
            interestRate: 0.115,
            loanTerm: 10,
        }, {
            id: 1,
            principal: 500000,
            interestRate: 0.08,
            loanTerm: 10,
        }];

        const dscr = calculateDscr(debts, sde);
        expect(dscr).toBeCloseTo(0.62, 2);
    });
});


