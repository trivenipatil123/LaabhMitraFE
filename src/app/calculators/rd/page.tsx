'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateRD } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function RDCalculator() {
    const [monthly, setMonthly] = useState(5000);
    const [rate, setRate] = useState(7);
    const [years, setYears] = useState(5);

    useEffect(() => { trackCalculatorUsed('rd'); }, []);

    const result = useMemo(() => calculateRD(monthly, rate, years), [monthly, rate, years]);
    const depositPercent = result.maturityAmount > 0 ? Math.round((result.totalDeposited / result.maturityAmount) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">💰 RD Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate recurring deposit maturity amount with quarterly compounding</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Monthly Deposit: <strong className="text-[var(--color-primary)]">{formatCurrency(monthly)}</strong>
                        </label>
                        <input type="range" min={500} max={100000} step={500}
                            value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹500</span><span>₹1L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Interest Rate: <strong className="text-[var(--color-primary)]">{rate}%</strong> p.a.
                        </label>
                        <input type="range" min={3} max={10} step={0.1}
                            value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>3%</span><span>10%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tenure: <strong className="text-[var(--color-primary)]">{years} years</strong>
                        </label>
                        <input type="range" min={1} max={10} step={1}
                            value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>10 yrs</span></div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 text-sm mb-2">Quick Facts</h4>
                        <ul className="text-xs text-blue-700 space-y-1">
                            <li>• Interest compounded quarterly</li>
                            <li>• No TDS if total interest &lt; ₹40,000/year</li>
                            <li>• Premature withdrawal may have penalty</li>
                        </ul>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 text-white text-center">
                        <p className="text-pink-100 text-sm mb-1">Maturity Amount</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 mb-1">Total Deposited</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(result.totalDeposited)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-xs text-green-600 mb-1">Interest Earned</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.interestEarned)}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Deposit vs Interest</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                style={{ width: `${depositPercent}%` }} />
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                                style={{ width: `${100 - depositPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-[var(--color-text-light)]">
                            <span>🟦 Deposited ({depositPercent}%)</span>
                            <span>🟩 Interest ({100 - depositPercent}%)</span>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Monthly Deposit</span>
                                <span className="font-medium">{formatCurrency(monthly)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Total Installments</span>
                                <span className="font-medium">{years * 12} months</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Effective Rate</span>
                                <span className="font-medium">{result.totalDeposited > 0 ? ((result.interestEarned / result.totalDeposited) * 100).toFixed(1) : 0}% total</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-[var(--color-text-secondary)]">Interest / Month (avg)</span>
                                <span className="font-medium">{formatCurrency(Math.round(result.interestEarned / (years * 12)))}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
