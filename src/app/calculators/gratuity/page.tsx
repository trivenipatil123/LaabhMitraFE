'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateGratuity } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function GratuityCalculator() {
    const [basicDA, setBasicDA] = useState(60000);
    const [years, setYears] = useState(15);
    const [isGovt, setIsGovt] = useState(false);

    useEffect(() => { trackCalculatorUsed('gratuity'); }, []);

    const result = useMemo(() => calculateGratuity(basicDA, years, isGovt), [basicDA, years, isGovt]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🎁 Gratuity Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate your gratuity amount and tax-free portion</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Last Drawn Basic + DA: <strong className="text-[var(--color-primary)]">{formatCurrency(basicDA)}</strong>/month
                        </label>
                        <input type="range" min={10000} max={500000} step={1000}
                            value={basicDA} onChange={(e) => setBasicDA(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹10K</span><span>₹5L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Years of Service: <strong className="text-[var(--color-primary)]">{years} years</strong>
                        </label>
                        <input type="range" min={1} max={40} step={1}
                            value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>40 yrs</span></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <label className="text-sm font-medium">Employee Type:</label>
                        <button onClick={() => setIsGovt(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${!isGovt ? 'bg-purple-600 text-white shadow' : 'bg-white border'}`}>
                            Private
                        </button>
                        <button onClick={() => setIsGovt(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isGovt ? 'bg-purple-600 text-white shadow' : 'bg-white border'}`}>
                            Government
                        </button>
                    </div>

                    {years < 5 && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                            <p className="text-sm text-red-700 font-medium">⚠️ Minimum 5 years of service required for gratuity eligibility</p>
                        </div>
                    )}

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 text-sm mb-2">Formula Used</h4>
                        <p className="text-xs text-blue-700 font-mono">
                            Gratuity = (Basic + DA) × 15 / 26 × Years of Service
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className={`p-6 rounded-2xl text-white text-center ${result.eligible ? 'bg-gradient-to-br from-purple-600 to-violet-700' : 'bg-gray-400'}`}>
                        <p className="text-purple-100 text-sm mb-1">Total Gratuity</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.gratuity)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-xs text-green-600 mb-1">Tax-Free Amount</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.taxFree)}</p>
                            <p className="text-xs text-green-600 mt-1">Limit: {isGovt ? '₹20L' : '₹25L'}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                            <p className="text-xs text-red-600 mb-1">Taxable Amount</p>
                            <p className="text-lg font-bold text-red-800">{formatCurrency(result.taxable)}</p>
                            <p className="text-xs text-red-600 mt-1">Added to income</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Calculation Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Basic + DA (Monthly)</span>
                                <span className="font-medium">{formatCurrency(basicDA)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Years of Service</span>
                                <span className="font-medium">{years} years</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Employee Type</span>
                                <span className="font-medium">{isGovt ? 'Government' : 'Private'}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-[var(--color-text-secondary)]">Per Year Gratuity</span>
                                <span className="font-medium">{years > 0 ? formatCurrency(Math.round(result.gratuity / years)) : '₹0'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
