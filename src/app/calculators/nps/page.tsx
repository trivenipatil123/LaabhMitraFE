'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateNPS } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function NPSCalculator() {
    const [monthly, setMonthly] = useState(5000);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [returnRate, setReturnRate] = useState(10);
    const [annuityPercent, setAnnuityPercent] = useState(40);

    useEffect(() => { trackCalculatorUsed('nps'); }, []);

    const result = useMemo(() =>
        calculateNPS(monthly, currentAge, retirementAge, returnRate, annuityPercent),
        [monthly, currentAge, retirementAge, returnRate, annuityPercent]
    );
    const investedPercent = result.totalCorpus > 0 ? Math.round((result.totalInvested / result.totalCorpus) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏦 NPS Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Plan your retirement — see your corpus & monthly pension at 60</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Monthly Contribution: <strong className="text-[var(--color-primary)]">{formatCurrency(monthly)}</strong>
                        </label>
                        <input type="range" min={500} max={100000} step={500}
                            value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹500</span><span>₹1L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current Age: <strong className="text-[var(--color-primary)]">{currentAge} years</strong>
                        </label>
                        <input type="range" min={18} max={59} step={1}
                            value={currentAge} onChange={(e) => {
                                const age = Number(e.target.value);
                                setCurrentAge(age);
                                if (age >= retirementAge) setRetirementAge(age + 1);
                            }} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>18</span><span>59</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Retirement Age: <strong className="text-[var(--color-primary)]">{retirementAge} years</strong>
                        </label>
                        <input type="range" min={Math.max(currentAge + 1, 40)} max={70} step={1}
                            value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>{Math.max(currentAge + 1, 40)}</span><span>70</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Expected Return: <strong className="text-[var(--color-primary)]">{returnRate}%</strong> p.a.
                        </label>
                        <input type="range" min={6} max={14} step={0.5}
                            value={returnRate} onChange={(e) => setReturnRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>6%</span><span>14%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Annuity Purchase: <strong className="text-[var(--color-primary)]">{annuityPercent}%</strong> of corpus
                        </label>
                        <input type="range" min={40} max={100} step={5}
                            value={annuityPercent} onChange={(e) => setAnnuityPercent(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>40% (min)</span><span>100%</span></div>
                    </div>

                    {/* Official NPS Link */}
                    <a href="https://www.npstrust.org.in" target="_blank" rel="noopener noreferrer"
                        className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
                        Visit Official NPS Website →
                    </a>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center">
                        <p className="text-indigo-200 text-sm mb-1">Total Corpus at {retirementAge}</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.totalCorpus)}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-[10px] text-green-600 mb-1">Monthly Pension</p>
                            <p className="text-base font-bold text-green-800">{formatCurrency(result.monthlyPension)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-[10px] text-blue-600 mb-1">Lump Sum (Tax-Free)</p>
                            <p className="text-base font-bold text-blue-800">{formatCurrency(result.lumpSum)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
                            <p className="text-[10px] text-purple-600 mb-1">Annuity Invested</p>
                            <p className="text-base font-bold text-purple-800">{formatCurrency(result.annuityCorpus)}</p>
                        </div>
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
