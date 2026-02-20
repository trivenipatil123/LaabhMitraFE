'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateSIP } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';
import CalculatorBackLink from '@/components/CalculatorBackLink';

export default function SIPCalculator() {
    const [monthly, setMonthly] = useState(10000);
    const [returnRate, setReturnRate] = useState(12);
    const [years, setYears] = useState(10);

    useEffect(() => { trackCalculatorUsed('sip'); }, []);

    const result = useMemo(() => calculateSIP(monthly, returnRate, years), [monthly, returnRate, years]);
    const investedPercent = result.futureValue > 0 ? Math.round((result.totalInvested / result.futureValue) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <CalculatorBackLink />
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">📈 SIP Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">See how your monthly investment grows over time</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Monthly Investment: <strong className="text-[var(--color-primary)]">{formatCurrency(monthly)}</strong>
                        </label>
                        <input type="range" min={500} max={100000} step={500}
                            value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹500</span><span>₹1L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Expected Return: <strong className="text-[var(--color-primary)]">{returnRate}%</strong> p.a.
                        </label>
                        <input type="range" min={1} max={30} step={0.5}
                            value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1%</span><span>30%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Investment Period: <strong className="text-[var(--color-primary)]">{years} years</strong>
                        </label>
                        <input type="range" min={1} max={40} step={1}
                            value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>40 yrs</span></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white text-center">
                        <p className="text-purple-200 text-sm mb-1">Future Value</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.futureValue)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 mb-1">Total Invested</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(result.totalInvested)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-xs text-green-600 mb-1">Wealth Gained</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.wealthGained)}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Growth Breakdown</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                style={{ width: `${investedPercent}%` }} />
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                                style={{ width: `${100 - investedPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-[var(--color-text-light)]">
                            <span>🟦 Invested ({investedPercent}%)</span>
                            <span>🟩 Returns ({100 - investedPercent}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
