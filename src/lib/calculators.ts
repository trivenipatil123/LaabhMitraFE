/**
 * Client-side calculator functions for instant slider feedback.
 * These mirror the backend calculations for offline/instant use.
 */

// ── Income Tax ───────────────────────────────────────
const NEW_REGIME_SLABS = [
    [0, 400000, 0],
    [400000, 800000, 5],
    [800000, 1200000, 10],
    [1200000, 1600000, 15],
    [1600000, 2000000, 20],
    [2000000, 2400000, 25],
    [2400000, Infinity, 30],
] as const;

const OLD_REGIME_SLABS = [
    [0, 250000, 0],
    [250000, 500000, 5],
    [500000, 1000000, 20],
    [1000000, Infinity, 30],
] as const;

function computeTax(income: number, slabs: readonly (readonly [number, number, number])[]): number {
    let tax = 0;
    for (const [min, max, rate] of slabs) {
        if (income <= min) break;
        const upper = Math.min(income, max);
        tax += (upper - min) * rate / 100;
    }
    return Math.round(tax);
}

export function calculateIncomeTax(income: number, deductions80c = 0, hra = 0, otherDeductions = 0) {
    // New regime
    const newTaxable = Math.max(0, income - 75000);
    let newTax = computeTax(newTaxable, NEW_REGIME_SLABS);
    if (newTaxable <= 1200000) newTax = Math.max(0, newTax - Math.min(newTax, 60000));
    const newCess = Math.round(newTax * 0.04);
    const newTotal = newTax + newCess;

    // Old regime
    const oldTaxable = Math.max(0, income - deductions80c - hra - otherDeductions - 50000);
    let oldTax = computeTax(oldTaxable, OLD_REGIME_SLABS);
    if (oldTaxable <= 500000) oldTax = Math.max(0, oldTax - Math.min(oldTax, 12500));
    const oldCess = Math.round(oldTax * 0.04);
    const oldTotal = oldTax + oldCess;

    return {
        newRegime: { taxable: newTaxable, tax: newTax, cess: newCess, total: newTotal },
        oldRegime: { taxable: oldTaxable, tax: oldTax, cess: oldCess, total: oldTotal },
        recommendation: newTotal <= oldTotal ? 'new' : 'old',
        savings: Math.abs(newTotal - oldTotal),
    };
}

// ── EMI Calculator ───────────────────────────────────
export function calculateEMI(principal: number, annualRate: number, tenureYears: number) {
    const r = annualRate / 12 / 100;
    const n = tenureYears * 12;
    const emi = r === 0 ? principal / n : principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);

    return {
        emi: Math.round(emi),
        totalPayment: Math.round(emi * n),
        totalInterest: Math.round(emi * n - principal),
        tenureMonths: n,
    };
}

// ── SIP Calculator ───────────────────────────────────
export function calculateSIP(monthlyAmount: number, annualReturn: number, years: number) {
    const r = annualReturn / 12 / 100;
    const n = years * 12;
    const fv = r === 0
        ? monthlyAmount * n
        : monthlyAmount * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

    const totalInvested = monthlyAmount * n;
    return {
        futureValue: Math.round(fv),
        totalInvested: Math.round(totalInvested),
        wealthGained: Math.round(fv - totalInvested),
    };
}

// ── GST Calculator ───────────────────────────────────
export function calculateGST(amount: number, rate: number, type: 'exclusive' | 'inclusive' = 'exclusive') {
    if (type === 'inclusive') {
        const gst = Math.round((amount - amount * 100 / (100 + rate)) * 100) / 100;
        return {
            original: Math.round((amount - gst) * 100) / 100,
            gst,
            cgst: Math.round(gst / 2 * 100) / 100,
            sgst: Math.round(gst / 2 * 100) / 100,
            total: amount,
        };
    }
    const gst = Math.round(amount * rate / 100 * 100) / 100;
    return {
        original: amount,
        gst,
        cgst: Math.round(gst / 2 * 100) / 100,
        sgst: Math.round(gst / 2 * 100) / 100,
        total: Math.round((amount + gst) * 100) / 100,
    };
}
