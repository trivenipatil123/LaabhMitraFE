'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateIncomeTax } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';
import CalculatorBackLink from '@/components/CalculatorBackLink';

export default function IncomeTaxCalculator() {
    const [income, setIncome] = useState(800000);
    const [deductions80c, setDeductions80c] = useState(150000);
    const [hra, setHra] = useState(0);
    const [otherDeductions, setOtherDeductions] = useState(0);

    useEffect(() => { trackCalculatorUsed('income-tax'); }, []);

    const result = useMemo(
        () => calculateIncomeTax(income, deductions80c, hra, otherDeductions),
        [income, deductions80c, hra, otherDeductions]
    );

    const maxBar = Math.max(result.newRegime.total, result.oldRegime.total, 1);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <CalculatorBackLink />
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">💰 Income Tax Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Compare Old vs New Tax Regime — FY 2025-26</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <h2 className="font-semibold text-lg">Your Income Details</h2>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Annual Income: <strong className="text-[var(--color-primary)]">{formatCurrency(income)}</strong>
                        </label>
                        <input
                            type="range" min={0} max={5000000} step={10000}
                            value={income} onChange={(e) => setIncome(Number(e.target.value))}
                            className="w-full"
                        />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹50L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Section 80C: <strong>{formatCurrency(deductions80c)}</strong>
                            <span className="text-xs text-[var(--color-text-light)] ml-1">(Old regime only)</span>
                        </label>
                        <input
                            type="range" min={0} max={150000} step={5000}
                            value={deductions80c} onChange={(e) => setDeductions80c(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            HRA Exemption: <strong>{formatCurrency(hra)}</strong>
                            <span className="text-xs text-[var(--color-text-light)] ml-1">(Old regime only)</span>
                        </label>
                        <input
                            type="range" min={0} max={300000} step={5000}
                            value={hra} onChange={(e) => setHra(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Other Deductions: <strong>{formatCurrency(otherDeductions)}</strong>
                            <span className="text-xs text-[var(--color-text-light)] ml-1">(80D, 80E, etc.)</span>
                        </label>
                        <input
                            type="range" min={0} max={200000} step={5000}
                            value={otherDeductions} onChange={(e) => setOtherDeductions(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Results */}
                <div className="space-y-4">
                    {/* Recommendation */}
                    <div className={`p-5 rounded-2xl border-2 ${result.recommendation === 'new'
                        ? 'border-green-300 bg-green-50'
                        : 'border-blue-300 bg-blue-50'
                        }`}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-2xl">🎯</span>
                            <h3 className="font-bold text-lg">
                                {result.recommendation === 'new' ? 'New Regime' : 'Old Regime'} is Better!
                            </h3>
                        </div>
                        <p className="text-sm text-[var(--color-text-secondary)]">
                            You save <strong className="text-[var(--color-primary)]">{formatCurrency(result.savings)}</strong> per year
                        </p>
                    </div>

                    {/* Comparison bars */}
                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-4">Tax Comparison</h3>

                        {/* New Regime */}
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">New Regime {result.recommendation === 'new' && '⭐'}</span>
                                <span className="font-bold text-green-700">{formatCurrency(result.newRegime.total)}</span>
                            </div>
                            <div className="h-6 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                                    style={{ width: `${(result.newRegime.total / maxBar) * 100}%` }}
                                />
                            </div>
                            <div className="flex gap-3 mt-1 text-xs text-[var(--color-text-light)]">
                                <span>Tax: {formatCurrency(result.newRegime.tax)}</span>
                                <span>Cess: {formatCurrency(result.newRegime.cess)}</span>
                            </div>
                        </div>

                        {/* Old Regime */}
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">Old Regime {result.recommendation === 'old' && '⭐'}</span>
                                <span className="font-bold text-blue-700">{formatCurrency(result.oldRegime.total)}</span>
                            </div>
                            <div className="h-6 rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                    style={{ width: `${(result.oldRegime.total / maxBar) * 100}%` }}
                                />
                            </div>
                            <div className="flex gap-3 mt-1 text-xs text-[var(--color-text-light)]">
                                <span>Tax: {formatCurrency(result.oldRegime.tax)}</span>
                                <span>Cess: {formatCurrency(result.oldRegime.cess)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown */}
                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Taxable Income Breakdown</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 rounded-xl bg-green-50">
                                <div className="text-xs text-green-600 mb-1">New Regime Taxable</div>
                                <div className="font-bold text-green-800">{formatCurrency(result.newRegime.taxable)}</div>
                                <div className="text-xs text-green-600 mt-1">Std. Deduction: ₹75,000</div>
                            </div>
                            <div className="p-3 rounded-xl bg-blue-50">
                                <div className="text-xs text-blue-600 mb-1">Old Regime Taxable</div>
                                <div className="font-bold text-blue-800">{formatCurrency(result.oldRegime.taxable)}</div>
                                <div className="text-xs text-blue-600 mt-1">Std. Deduction: ₹50,000</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-[var(--color-text-light)] text-center mt-8 max-w-2xl mx-auto">
                Disclaimer: This calculator provides approximate tax estimates for FY 2025-26.
                Actual tax liability may differ. Consult a CA for exact calculations.
            </p>
        </div>
    );
}
