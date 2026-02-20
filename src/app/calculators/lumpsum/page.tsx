'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { calculateLumpsum } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';
import CalculatorBackLink from '@/components/CalculatorBackLink';

export default function LumpsumCalculator() {
    const [investment, setInvestment] = useState(500000);
    const [returnRate, setReturnRate] = useState(12);
    const [years, setYears] = useState(10);

    useEffect(() => { trackCalculatorUsed('lumpsum'); }, []);

    const result = useMemo(() => calculateLumpsum(investment, returnRate, years), [investment, returnRate, years]);
    const investedPercent = result.futureValue > 0 ? Math.round((result.investedAmount / result.futureValue) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <CalculatorBackLink />
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">💎 Lumpsum Investment Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">See how your one-time investment grows with compound interest</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Investment Amount: <strong className="text-[var(--color-primary)]">{formatCurrency(investment)}</strong>
                        </label>
                        <input type="range" min={10000} max={10000000} step={10000}
                            value={investment} onChange={(e) => setInvestment(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹10K</span><span>₹1Cr</span></div>
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
                            Time Period: <strong className="text-[var(--color-primary)]">{years} years</strong>
                        </label>
                        <input type="range" min={1} max={30} step={1}
                            value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>30 yrs</span></div>
                    </div>

                    <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                        <h4 className="font-semibold text-indigo-800 text-sm mb-1">Lumpsum vs SIP</h4>
                        <p className="text-xs text-indigo-700">Lumpsum works best with a large corpus. For regular investing, try our SIP calculator.</p>
                        <Link href="/calculators/sip" className="text-xs text-indigo-600 font-semibold hover:underline mt-1 inline-block">
                            Compare with SIP →
                        </Link>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white text-center">
                        <p className="text-indigo-200 text-sm mb-1">Future Value</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.futureValue)}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-[10px] text-blue-600 mb-1">Invested</p>
                            <p className="text-base font-bold text-blue-800">{formatCurrency(result.investedAmount)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-[10px] text-green-600 mb-1">Total Gains</p>
                            <p className="text-base font-bold text-green-800">{formatCurrency(result.totalGains)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
                            <p className="text-[10px] text-purple-600 mb-1">Abs. Return</p>
                            <p className="text-base font-bold text-purple-800">{result.absoluteReturn}%</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Invested vs Gains</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                style={{ width: `${investedPercent}%` }} />
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                                style={{ width: `${100 - investedPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-[var(--color-text-light)]">
                            <span>🟦 Invested ({investedPercent}%)</span>
                            <span>🟩 Gains ({100 - investedPercent}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
