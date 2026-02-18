'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateEMI } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function EMICalculator() {
    const [principal, setPrincipal] = useState(2500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);

    useEffect(() => { trackCalculatorUsed('emi'); }, []);

    const result = useMemo(() => calculateEMI(principal, rate, tenure), [principal, rate, tenure]);
    const interestPercent = principal > 0 ? Math.round((result.totalInterest / result.totalPayment) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏠 EMI Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate monthly EMI for home, car or personal loan</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Loan Amount: <strong className="text-[var(--color-primary)]">{formatCurrency(principal)}</strong>
                        </label>
                        <input type="range" min={100000} max={20000000} step={50000}
                            value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹1L</span><span>₹2Cr</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Interest Rate: <strong className="text-[var(--color-primary)]">{rate}%</strong>
                        </label>
                        <input type="range" min={5} max={20} step={0.1}
                            value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>5%</span><span>20%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Loan Tenure: <strong className="text-[var(--color-primary)]">{tenure} years</strong>
                        </label>
                        <input type="range" min={1} max={30} step={1}
                            value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>30 yrs</span></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl gradient-bg text-white text-center">
                        <p className="text-green-100 text-sm mb-1">Monthly EMI</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.emi)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 mb-1">Total Payment</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(result.totalPayment)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-center">
                            <p className="text-xs text-orange-600 mb-1">Total Interest</p>
                            <p className="text-lg font-bold text-orange-800">{formatCurrency(result.totalInterest)}</p>
                        </div>
                    </div>

                    {/* Visual breakdown */}
                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Payment Breakdown</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                style={{ width: `${100 - interestPercent}%` }} />
                            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all duration-500"
                                style={{ width: `${interestPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-[var(--color-text-light)]">
                            <span>🟦 Principal ({100 - interestPercent}%)</span>
                            <span>🟧 Interest ({interestPercent}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
