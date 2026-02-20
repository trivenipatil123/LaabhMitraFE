'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateHomeLoanEligibility } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';

export default function HomeLoanEligibilityCalculator() {
    const [income, setIncome] = useState(80000);
    const [existingEMIs, setExistingEMIs] = useState(0);
    const [tenure, setTenure] = useState(20);
    const [rate, setRate] = useState(8.5);

    useEffect(() => { trackCalculatorUsed('home-loan-eligibility'); }, []);

    const result = useMemo(() => calculateHomeLoanEligibility(income, existingEMIs, tenure, rate), [income, existingEMIs, tenure, rate]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🔑 Home Loan Eligibility</h1>
                <p className="text-[var(--color-text-secondary)]">Find out the maximum home loan amount you can qualify for</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Monthly Income: <strong className="text-[var(--color-primary)]">{formatCurrency(income)}</strong>
                        </label>
                        <input type="range" min={20000} max={500000} step={5000}
                            value={income} onChange={(e) => setIncome(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹20K</span><span>₹5L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Existing EMIs: <strong className="text-[var(--color-primary)]">{formatCurrency(existingEMIs)}</strong>/month
                        </label>
                        <input type="range" min={0} max={200000} step={1000}
                            value={existingEMIs} onChange={(e) => setExistingEMIs(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>₹2L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Loan Tenure: <strong className="text-[var(--color-primary)]">{tenure} years</strong>
                        </label>
                        <input type="range" min={5} max={30} step={1}
                            value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>5 yrs</span><span>30 yrs</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Interest Rate: <strong className="text-[var(--color-primary)]">{rate}%</strong> p.a.
                        </label>
                        <input type="range" min={6} max={14} step={0.1}
                            value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>6%</span><span>14%</span></div>
                    </div>

                    <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <h4 className="font-semibold text-blue-800 text-sm mb-1">How banks decide</h4>
                        <p className="text-xs text-blue-700">Banks use FOIR (Fixed Obligation to Income Ratio). Max 50% of your gross income can go towards all EMIs combined.</p>
                    </div>

                    <a href="https://www.bankbazaar.com/home-loan.html" target="_blank" rel="noopener noreferrer"
                        className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold hover:shadow-lg transition-all">
                        Compare Home Loan Rates →
                    </a>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-center">
                        <p className="text-teal-100 text-sm mb-1">Maximum Loan You Qualify For</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.maxLoan)}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-xs text-blue-600 mb-1">EMI You Can Pay</p>
                            <p className="text-lg font-bold text-blue-800">{formatCurrency(result.emi)}/mo</p>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center">
                            <p className="text-xs text-amber-600 mb-1">FOIR Used</p>
                            <p className="text-lg font-bold text-amber-800">{result.foirUsed}%</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Breakdown</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Max Loan Amount</span>
                                <span className="font-medium">{formatCurrency(result.maxLoan)}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-[var(--color-border)]">
                                <span className="text-[var(--color-text-secondary)]">Total Interest ({tenure} yrs)</span>
                                <span className="font-medium text-red-600">{formatCurrency(result.totalInterest)}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-[var(--color-text-secondary)]">Total Payable</span>
                                <span className="font-bold">{formatCurrency(result.totalPayable)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
