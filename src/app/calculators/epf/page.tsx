'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateEPF } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function EPFCalculator() {
    const [basic, setBasic] = useState(30000);
    const [empPF, setEmpPF] = useState(12);
    const [erPF, setErPF] = useState(3.67);
    const [increment, setIncrement] = useState(5);
    const [years, setYears] = useState(25);
    const [currentBalance, setCurrentBalance] = useState(0);

    useEffect(() => { trackCalculatorUsed('epf'); }, []);

    const result = useMemo(() =>
        calculateEPF(basic, empPF, erPF, increment, years, currentBalance),
        [basic, empPF, erPF, increment, years, currentBalance]
    );

    const empPercent = result.totalCorpus > 0 ? Math.round((result.totalEmployeeContrib / result.totalCorpus) * 100) : 0;
    const erPercent = result.totalCorpus > 0 ? Math.round((result.totalEmployerContrib / result.totalCorpus) * 100) : 0;
    const intPercent = 100 - empPercent - erPercent;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏢 EPF Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate your PF corpus at retirement with annual increments</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Basic Salary: <strong className="text-[var(--color-primary)]">{formatCurrency(basic)}</strong>/month
                        </label>
                        <input type="range" min={10000} max={200000} step={1000}
                            value={basic} onChange={(e) => setBasic(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹10K</span><span>₹2L</span></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Employee PF: <strong className="text-[var(--color-primary)]">{empPF}%</strong>
                            </label>
                            <input type="range" min={1} max={12} step={0.5}
                                value={empPF} onChange={(e) => setEmpPF(Number(e.target.value))} className="w-full" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Employer PF: <strong className="text-[var(--color-primary)]">{erPF}%</strong>
                            </label>
                            <input type="range" min={1} max={12} step={0.33}
                                value={erPF} onChange={(e) => setErPF(Number(e.target.value))} className="w-full" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Annual Increment: <strong className="text-[var(--color-primary)]">{increment}%</strong>
                        </label>
                        <input type="range" min={0} max={20} step={1}
                            value={increment} onChange={(e) => setIncrement(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>0%</span><span>20%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Years to Retirement: <strong className="text-[var(--color-primary)]">{years} years</strong>
                        </label>
                        <input type="range" min={1} max={35} step={1}
                            value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>35 yrs</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Current PF Balance: <strong className="text-[var(--color-primary)]">{formatCurrency(currentBalance)}</strong>
                        </label>
                        <input type="range" min={0} max={5000000} step={50000}
                            value={currentBalance} onChange={(e) => setCurrentBalance(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹50L</span></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-600 to-blue-700 text-white text-center">
                        <p className="text-sky-100 text-sm mb-1">Total PF Corpus at Retirement</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.totalCorpus)}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-[10px] text-blue-600 mb-1">Your Contribution</p>
                            <p className="text-sm font-bold text-blue-800">{formatCurrency(result.totalEmployeeContrib)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-center">
                            <p className="text-[10px] text-purple-600 mb-1">Employer Share</p>
                            <p className="text-sm font-bold text-purple-800">{formatCurrency(result.totalEmployerContrib)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-[10px] text-green-600 mb-1">Interest Earned</p>
                            <p className="text-sm font-bold text-green-800">{formatCurrency(result.totalInterest)}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Corpus Breakdown</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${empPercent}%` }} />
                            <div className="h-full bg-purple-500 transition-all duration-500" style={{ width: `${erPercent}%` }} />
                            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${intPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-[10px] mt-2 text-[var(--color-text-light)]">
                            <span>🟦 You ({empPercent}%)</span>
                            <span>🟪 Employer ({erPercent}%)</span>
                            <span>🟩 Interest ({intPercent}%)</span>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                        <p className="text-xs text-amber-800">
                            💡 <strong>EPF Interest Rate:</strong> 8.25% p.a. (FY 2025-26). Employer PF of 3.67% goes to EPF, rest 8.33% goes to EPS (pension).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
