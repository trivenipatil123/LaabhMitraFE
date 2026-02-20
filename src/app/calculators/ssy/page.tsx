'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateSSY } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';
import CalculatorBackLink from '@/components/CalculatorBackLink';

export default function SSYCalculator() {
    const [annualDeposit, setAnnualDeposit] = useState(150000);
    const [childAge, setChildAge] = useState(3);

    useEffect(() => { trackCalculatorUsed('ssy'); }, []);

    const result = useMemo(() => calculateSSY(annualDeposit, childAge), [annualDeposit, childAge]);
    const depositPercent = result.maturityAmount > 0 ? Math.round((result.totalDeposited / result.maturityAmount) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <CalculatorBackLink />
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">👧 Sukanya Samriddhi (SSY) Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Plan your daughter&apos;s future — see maturity amount at age 21</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Annual Deposit: <strong className="text-[var(--color-primary)]">{formatCurrency(annualDeposit)}</strong>
                        </label>
                        <input type="range" min={250} max={150000} step={5000}
                            value={annualDeposit} onChange={(e) => setAnnualDeposit(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹250</span><span>₹1.5L (max)</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Girl Child&apos;s Current Age: <strong className="text-[var(--color-primary)]">{childAge} years</strong>
                        </label>
                        <input type="range" min={0} max={10} step={1}
                            value={childAge} onChange={(e) => setChildAge(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>0 (newborn)</span><span>10 yrs</span></div>
                    </div>

                    <div className="p-4 rounded-xl bg-pink-50 border border-pink-200">
                        <h4 className="font-semibold text-pink-800 text-sm mb-2">Key Benefits</h4>
                        <ul className="text-xs text-pink-700 space-y-1">
                            <li>• Interest Rate: <strong>8.2% p.a.</strong> (Q1 FY2026)</li>
                            <li>• Deposits for 15 years, matures at 21 years</li>
                            <li>• Tax-free under Section 80C (EEE status)</li>
                            <li>• Min ₹250/year, Max ₹1.5 lakh/year</li>
                        </ul>
                    </div>

                    <a href="/schemes/sukanya-samriddhi-yojana"
                        className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold hover:shadow-lg transition-all">
                        View SSY Scheme Details →
                    </a>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-600 to-rose-700 text-white text-center">
                        <p className="text-pink-100 text-sm mb-1">Maturity Amount (at age 21)</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.maturityAmount)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 mb-1">Total Deposited</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(result.totalDeposited)}</p>
                            <p className="text-xs text-blue-500 mt-0.5">15 years × {formatCurrency(annualDeposit)}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-xs text-green-600 mb-1">Interest Earned</p>
                            <p className="text-lg font-bold text-green-800">{formatCurrency(result.interestEarned)}</p>
                            <p className="text-xs text-green-500 mt-0.5">Tax-free!</p>
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
                </div>
            </div>
        </div>
    );
}
