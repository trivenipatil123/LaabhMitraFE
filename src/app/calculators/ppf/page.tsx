'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/constants';

const PPF_RATE = 7.1; // Current PPF interest rate (FY 2025-26)
const PPF_MIN_TENURE = 15;
const PPF_MAX_TENURE = 50;
const PPF_MIN_DEPOSIT = 500;
const PPF_MAX_DEPOSIT = 150000;

interface YearlyBreakdown {
    year: number;
    deposit: number;
    interest: number;
    balance: number;
}

function calculatePPF(yearlyDeposit: number, tenure: number, rate: number): {
    maturityAmount: number;
    totalDeposited: number;
    totalInterest: number;
    breakdown: YearlyBreakdown[];
} {
    const monthlyRate = rate / 100;
    let balance = 0;
    const breakdown: YearlyBreakdown[] = [];

    for (let year = 1; year <= tenure; year++) {
        balance += yearlyDeposit;
        const interest = Math.round(balance * monthlyRate);
        balance += interest;
        breakdown.push({
            year,
            deposit: yearlyDeposit,
            interest,
            balance,
        });
    }

    const totalDeposited = yearlyDeposit * tenure;
    return {
        maturityAmount: balance,
        totalDeposited,
        totalInterest: balance - totalDeposited,
        breakdown,
    };
}

export default function PPFCalculatorPage() {
    const [yearlyDeposit, setYearlyDeposit] = useState(50000);
    const [tenure, setTenure] = useState(15);
    const [showBreakdown, setShowBreakdown] = useState(false);

    const result = useMemo(
        () => calculatePPF(yearlyDeposit, tenure, PPF_RATE),
        [yearlyDeposit, tenure]
    );

    const interestPercent = ((result.totalInterest / result.maturityAmount) * 100).toFixed(1);
    const depositPercent = ((result.totalDeposited / result.maturityAmount) * 100).toFixed(1);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏦 PPF Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">
                    Calculate Public Provident Fund returns at {PPF_RATE}% p.a.
                </p>
            </div>

            {/* Controls */}
            <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm mb-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        Yearly Deposit: <strong className="text-[var(--color-primary)]">{formatCurrency(yearlyDeposit)}</strong>
                    </label>
                    <input
                        type="range"
                        min={PPF_MIN_DEPOSIT}
                        max={PPF_MAX_DEPOSIT}
                        step={500}
                        value={yearlyDeposit}
                        onChange={(e) => setYearlyDeposit(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[var(--color-text-light)] mt-1">
                        <span>₹500</span>
                        <span>₹1,50,000 (max under 80C)</span>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">
                        Investment Period: <strong className="text-[var(--color-primary)]">{tenure} years</strong>
                    </label>
                    <input
                        type="range"
                        min={PPF_MIN_TENURE}
                        max={PPF_MAX_TENURE}
                        step={1}
                        value={tenure}
                        onChange={(e) => setTenure(Number(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[var(--color-text-light)] mt-1">
                        <span>15 years (min lock-in)</span>
                        <span>50 years</span>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800">
                    💡 Current PPF rate: <strong>{PPF_RATE}%</strong> p.a. (set by Government quarterly). Maximum ₹1,50,000/year qualifies for 80C deduction.
                </div>
            </div>

            {/* Results */}
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className="p-5 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white text-center shadow-md">
                    <p className="text-sm opacity-90">Maturity Amount</p>
                    <p className="text-2xl font-bold mt-1">{formatCurrency(result.maturityAmount)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                    <p className="text-sm text-[var(--color-text-secondary)]">Total Invested</p>
                    <p className="text-2xl font-bold mt-1 text-[var(--color-text)]">{formatCurrency(result.totalDeposited)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] text-center">
                    <p className="text-sm text-[var(--color-text-secondary)]">Interest Earned</p>
                    <p className="text-2xl font-bold mt-1 text-[var(--color-primary)]">{formatCurrency(result.totalInterest)}</p>
                </div>
            </div>

            {/* Visual Bar */}
            <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm mb-6">
                <h3 className="font-semibold mb-3">Composition</h3>
                <div className="h-6 rounded-full overflow-hidden flex">
                    <div
                        className="bg-blue-500 transition-all"
                        style={{ width: `${depositPercent}%` }}
                        title={`Deposited: ${depositPercent}%`}
                    />
                    <div
                        className="bg-green-500 transition-all"
                        style={{ width: `${interestPercent}%` }}
                        title={`Interest: ${interestPercent}%`}
                    />
                </div>
                <div className="flex justify-between text-xs mt-2 text-[var(--color-text-secondary)]">
                    <span>🔵 Deposited ({depositPercent}%)</span>
                    <span>🟢 Interest ({interestPercent}%)</span>
                </div>
            </div>

            {/* Key Benefits */}
            <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm mb-6">
                <h3 className="font-semibold mb-3">PPF Key Benefits</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex gap-2">
                        <span>✅</span>
                        <span>EEE tax status — Exempt at deposit, growth, and withdrawal</span>
                    </div>
                    <div className="flex gap-2">
                        <span>✅</span>
                        <span>Section 80C deduction up to ₹1,50,000</span>
                    </div>
                    <div className="flex gap-2">
                        <span>✅</span>
                        <span>Government-backed, zero risk</span>
                    </div>
                    <div className="flex gap-2">
                        <span>✅</span>
                        <span>Partial withdrawal after 7th year</span>
                    </div>
                    <div className="flex gap-2">
                        <span>✅</span>
                        <span>Loan facility from 3rd to 6th year</span>
                    </div>
                    <div className="flex gap-2">
                        <span>✅</span>
                        <span>Extendable in blocks of 5 years after maturity</span>
                    </div>
                </div>
            </div>

            {/* Year-wise Breakdown toggle */}
            <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                <button
                    onClick={() => setShowBreakdown(!showBreakdown)}
                    className="w-full flex items-center justify-between font-semibold"
                >
                    <span>Year-wise Breakdown</span>
                    <span className="text-lg">{showBreakdown ? '▲' : '▼'}</span>
                </button>

                {showBreakdown && (
                    <div className="mt-4 overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="text-left py-2 px-3 font-semibold">Year</th>
                                    <th className="text-right py-2 px-3 font-semibold">Deposit</th>
                                    <th className="text-right py-2 px-3 font-semibold">Interest</th>
                                    <th className="text-right py-2 px-3 font-semibold">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.breakdown.map((row) => (
                                    <tr key={row.year} className="border-b border-[var(--color-border)] hover:bg-gray-50 transition">
                                        <td className="py-2 px-3">{row.year}</td>
                                        <td className="text-right py-2 px-3">{formatCurrency(row.deposit)}</td>
                                        <td className="text-right py-2 px-3 text-green-600">{formatCurrency(row.interest)}</td>
                                        <td className="text-right py-2 px-3 font-medium">{formatCurrency(row.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <p className="text-xs text-center text-[var(--color-text-light)] mt-6">
                Disclaimer: PPF interest rate is subject to quarterly revision by the Government. Current rate: {PPF_RATE}% (FY 2025-26).
                This calculator provides approximate results for informational purposes only.
            </p>
        </div>
    );
}
