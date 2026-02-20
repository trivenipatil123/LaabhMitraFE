'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateHomeLoanEMI } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function HomeLoanEMICalculator() {
    const [principal, setPrincipal] = useState(5000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [showSchedule, setShowSchedule] = useState(false);

    useEffect(() => { trackCalculatorUsed('home-loan-emi'); }, []);

    const result = useMemo(() => calculateHomeLoanEMI(principal, rate, tenure), [principal, rate, tenure]);
    const interestPercent = result.totalPayment > 0 ? Math.round((result.totalInterest / result.totalPayment) * 100) : 0;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🏡 Home Loan EMI Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate your monthly EMI with detailed year-wise amortization schedule</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Loan Amount: <strong className="text-[var(--color-primary)]">{formatCurrency(principal)}</strong>
                        </label>
                        <input type="range" min={100000} max={50000000} step={100000}
                            value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹1L</span><span>₹5Cr</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Interest Rate: <strong className="text-[var(--color-primary)]">{rate}%</strong> p.a.
                        </label>
                        <input type="range" min={5} max={15} step={0.1}
                            value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>5%</span><span>15%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Loan Tenure: <strong className="text-[var(--color-primary)]">{tenure} years</strong>
                        </label>
                        <input type="range" min={1} max={30} step={1}
                            value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>30 yrs</span></div>
                    </div>

                    {/* Affiliate CTA */}
                    <a href="https://www.bankbazaar.com/home-loan.html" target="_blank" rel="noopener noreferrer"
                        className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold hover:shadow-lg transition-all">
                        Compare Home Loan Rates →
                    </a>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-700 text-white text-center">
                        <p className="text-teal-100 text-sm mb-1">Monthly EMI</p>
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

            {/* Year-wise Amortization Schedule */}
            <div className="mt-8">
                <button onClick={() => setShowSchedule(!showSchedule)}
                    className="w-full py-3 px-6 rounded-xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                    {showSchedule ? '▲ Hide' : '▼ Show'} Year-wise Amortization Schedule
                </button>

                {showSchedule && result.schedule.length > 0 && (
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-[var(--color-border)] shadow-sm">
                        <table className="w-full text-sm">
                            <thead className="bg-[var(--color-bg-card)]">
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="px-4 py-3 text-left font-semibold">Year</th>
                                    <th className="px-4 py-3 text-right font-semibold">Opening Bal.</th>
                                    <th className="px-4 py-3 text-right font-semibold">EMI Paid</th>
                                    <th className="px-4 py-3 text-right font-semibold text-orange-600">Interest</th>
                                    <th className="px-4 py-3 text-right font-semibold text-blue-600">Principal</th>
                                    <th className="px-4 py-3 text-right font-semibold">Closing Bal.</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.schedule.map((row) => (
                                    <tr key={row.year} className="border-b border-[var(--color-border)] hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium">{row.year}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.openingBalance)}</td>
                                        <td className="px-4 py-3 text-right">{formatCurrency(row.emiPaid)}</td>
                                        <td className="px-4 py-3 text-right text-orange-600">{formatCurrency(row.interestPaid)}</td>
                                        <td className="px-4 py-3 text-right text-blue-600">{formatCurrency(row.principalPaid)}</td>
                                        <td className="px-4 py-3 text-right font-medium">{formatCurrency(row.closingBalance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
