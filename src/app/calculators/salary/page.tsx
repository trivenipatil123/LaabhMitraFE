'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateSalary } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function SalaryCalculator() {
    const [ctc, setCTC] = useState(1200000);
    const [includePF, setIncludePF] = useState(true);
    const [isMetro, setIsMetro] = useState(true);

    useEffect(() => { trackCalculatorUsed('salary'); }, []);

    const result = useMemo(() => calculateSalary(ctc, includePF, isMetro), [ctc, includePF, isMetro]);

    const earnings = result.components.filter(c => c.type === 'earning');
    const deductions = result.components.filter(c => c.type === 'deduction');

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">💼 Salary (In-Hand) Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Convert your CTC to actual in-hand salary with full component breakdown</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Annual CTC: <strong className="text-[var(--color-primary)]">{formatCurrency(ctc)}</strong>
                        </label>
                        <input type="range" min={200000} max={10000000} step={50000}
                            value={ctc} onChange={(e) => setCTC(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹2L</span><span>₹1Cr</span></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <label className="text-sm font-medium">Include PF:</label>
                        <button onClick={() => setIncludePF(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${includePF ? 'bg-cyan-600 text-white shadow' : 'bg-white border'}`}>
                            Yes
                        </button>
                        <button onClick={() => setIncludePF(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${!includePF ? 'bg-cyan-600 text-white shadow' : 'bg-white border'}`}>
                            No
                        </button>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <label className="text-sm font-medium">City Type:</label>
                        <button onClick={() => setIsMetro(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isMetro ? 'bg-cyan-600 text-white shadow' : 'bg-white border'}`}>
                            Metro
                        </button>
                        <button onClick={() => setIsMetro(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${!isMetro ? 'bg-cyan-600 text-white shadow' : 'bg-white border'}`}>
                            Non-Metro
                        </button>
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-50 border border-yellow-200">
                        <p className="text-xs text-yellow-800">
                            💡 <strong>Note:</strong> This is an approximate calculation using standard CTC structures (Basic = 40% of CTC). Actual structure may vary by company.
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white text-center">
                        <p className="text-cyan-100 text-sm mb-1">Monthly In-Hand Salary</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.monthlyInHand)}</p>
                        <p className="text-cyan-100 text-sm mt-1">({formatCurrency(result.annualInHand)}/year)</p>
                    </div>

                    {/* Full Breakdown Table */}
                    <div className="rounded-2xl border border-[var(--color-border)] shadow-sm overflow-hidden">
                        <div className="p-4 bg-green-50 border-b border-green-200">
                            <h3 className="font-semibold text-green-800">💚 Earnings</h3>
                        </div>
                        <div className="divide-y divide-[var(--color-border)]">
                            {earnings.map((c, i) => (
                                <div key={i} className="flex justify-between px-4 py-3 text-sm bg-white">
                                    <span>{c.label}</span>
                                    <div className="flex gap-6 text-right">
                                        <span className="w-24 text-[var(--color-text-secondary)]">{formatCurrency(c.monthly)}/mo</span>
                                        <span className="w-24 font-medium">{formatCurrency(c.annual)}/yr</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 bg-red-50 border-t border-b border-red-200">
                            <h3 className="font-semibold text-red-800">❤️ Deductions</h3>
                        </div>
                        <div className="divide-y divide-[var(--color-border)]">
                            {deductions.map((c, i) => (
                                <div key={i} className="flex justify-between px-4 py-3 text-sm bg-white">
                                    <span>{c.label}</span>
                                    <div className="flex gap-6 text-right">
                                        <span className="w-24 text-red-500">−{formatCurrency(c.monthly)}/mo</span>
                                        <span className="w-24 font-medium text-red-600">−{formatCurrency(c.annual)}/yr</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between px-4 py-4 bg-cyan-50 border-t-2 border-cyan-300 font-bold">
                            <span className="text-cyan-800">In-Hand Salary</span>
                            <div className="flex gap-6 text-right">
                                <span className="w-24 text-cyan-700">{formatCurrency(result.monthlyInHand)}/mo</span>
                                <span className="w-24 text-cyan-800">{formatCurrency(result.annualInHand)}/yr</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
