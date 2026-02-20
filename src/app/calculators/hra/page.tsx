'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateHRA } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function HRACalculator() {
    const [basic, setBasic] = useState(50000);
    const [da, setDA] = useState(0);
    const [hraReceived, setHraReceived] = useState(20000);
    const [rentPaid, setRentPaid] = useState(25000);
    const [isMetro, setIsMetro] = useState(true);

    useEffect(() => { trackCalculatorUsed('hra'); }, []);

    const result = useMemo(() => calculateHRA(basic, da, hraReceived, rentPaid, isMetro), [basic, da, hraReceived, rentPaid, isMetro]);
    const exemptPercent = result.exempt > 0 && (result.exempt + result.taxable) > 0
        ? Math.round((result.exempt / (result.exempt + result.taxable)) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏠 HRA Exemption Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate your HRA tax exemption under Section 10(13A)</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Basic Salary (Monthly): <strong className="text-[var(--color-primary)]">{formatCurrency(basic)}</strong>
                        </label>
                        <input type="range" min={10000} max={500000} step={1000}
                            value={basic} onChange={(e) => setBasic(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹10K</span><span>₹5L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Dearness Allowance (Monthly): <strong className="text-[var(--color-primary)]">{formatCurrency(da)}</strong>
                        </label>
                        <input type="range" min={0} max={200000} step={1000}
                            value={da} onChange={(e) => setDA(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹2L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            HRA Received (Monthly): <strong className="text-[var(--color-primary)]">{formatCurrency(hraReceived)}</strong>
                        </label>
                        <input type="range" min={0} max={200000} step={1000}
                            value={hraReceived} onChange={(e) => setHraReceived(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹2L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Rent Paid (Monthly): <strong className="text-[var(--color-primary)]">{formatCurrency(rentPaid)}</strong>
                        </label>
                        <input type="range" min={0} max={200000} step={500}
                            value={rentPaid} onChange={(e) => setRentPaid(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹2L</span></div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                        <label className="text-sm font-medium">City Type:</label>
                        <button onClick={() => setIsMetro(true)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${isMetro ? 'bg-amber-500 text-white shadow' : 'bg-white border'}`}>
                            Metro (50%)
                        </button>
                        <button onClick={() => setIsMetro(false)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${!isMetro ? 'bg-amber-500 text-white shadow' : 'bg-white border'}`}>
                            Non-Metro (40%)
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white text-center">
                        <p className="text-amber-100 text-sm mb-1">Annual HRA Exempt</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.exempt)}</p>
                        <p className="text-amber-100 text-sm mt-1">({formatCurrency(result.monthlyExempt)}/month)</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-xs text-green-600 mb-1">Tax-Free HRA</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.exempt)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-center">
                            <p className="text-xs text-red-600 mb-1">Taxable HRA</p>
                            <p className="text-lg font-bold text-red-800">{formatCurrency(result.taxable)}</p>
                        </div>
                    </div>

                    {/* 3 Conditions Breakdown */}
                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Section 10(13A) — 3 Conditions</h3>
                        <div className="space-y-3">
                            {[
                                { label: 'Actual HRA Received', value: result.condition1, isMin: result.exempt === result.condition1 },
                                { label: 'Rent − 10% of Basic+DA', value: result.condition2, isMin: result.exempt === result.condition2 },
                                { label: `${isMetro ? '50%' : '40%'} of Basic+DA`, value: result.condition3, isMin: result.exempt === result.condition3 },
                            ].map((c, i) => (
                                <div key={i} className={`flex justify-between items-center p-3 rounded-lg border ${c.isMin ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                                    <span className="text-sm">{c.isMin && '✅ '}{c.label}</span>
                                    <span className={`font-bold ${c.isMin ? 'text-green-700' : ''}`}>{formatCurrency(c.value)}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-[var(--color-text-light)] mt-3 italic">Exemption = Minimum of the above 3 conditions</p>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Exempt vs Taxable</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500"
                                style={{ width: `${exemptPercent}%` }} />
                            <div className="h-full bg-gradient-to-r from-red-400 to-red-500 transition-all duration-500"
                                style={{ width: `${100 - exemptPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-[var(--color-text-light)]">
                            <span>🟩 Exempt ({exemptPercent}%)</span>
                            <span>🟥 Taxable ({100 - exemptPercent}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
