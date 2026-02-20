'use client';

import { useState, useMemo, useEffect } from 'react';
import { calculateCarLoanEMI } from '@/lib/calculators';
import { formatCurrency } from '@/lib/constants';
import { trackCalculatorUsed } from '@/lib/analytics';
import CalculatorBackLink from '@/components/CalculatorBackLink';

export default function CarLoanEMICalculator() {
    const [carPrice, setCarPrice] = useState(1000000);
    const [downPayment, setDownPayment] = useState(200000);
    const [rate, setRate] = useState(9);
    const [tenure, setTenure] = useState(5);

    useEffect(() => { trackCalculatorUsed('car-loan-emi'); }, []);

    const result = useMemo(() => calculateCarLoanEMI(carPrice, downPayment, rate, tenure), [carPrice, downPayment, rate, tenure]);
    const principalPercent = result.totalPayable > 0 ? Math.round((result.loanAmount / result.totalPayable) * 100) : 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
            <CalculatorBackLink />
            <div className="text-center mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🚗 Car Loan EMI Calculator</h1>
                <p className="text-[var(--color-text-secondary)]">Calculate your car loan EMI with down payment and total interest</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Car Price: <strong className="text-[var(--color-primary)]">{formatCurrency(carPrice)}</strong>
                        </label>
                        <input type="range" min={200000} max={5000000} step={50000}
                            value={carPrice} onChange={(e) => {
                                const p = Number(e.target.value);
                                setCarPrice(p);
                                if (downPayment > p * 0.8) setDownPayment(Math.round(p * 0.2));
                            }} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹2L</span><span>₹50L</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Down Payment: <strong className="text-[var(--color-primary)]">{formatCurrency(downPayment)}</strong>
                            <span className="text-xs text-[var(--color-text-light)] ml-1">({result.downPaymentPercent}%)</span>
                        </label>
                        <input type="range" min={0} max={Math.round(carPrice * 0.8)} step={10000}
                            value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>₹0</span><span>{formatCurrency(Math.round(carPrice * 0.8))}</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Interest Rate: <strong className="text-[var(--color-primary)]">{rate}%</strong> p.a.
                        </label>
                        <input type="range" min={6} max={18} step={0.25}
                            value={rate} onChange={(e) => setRate(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>6%</span><span>18%</span></div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tenure: <strong className="text-[var(--color-primary)]">{tenure} years</strong>
                        </label>
                        <input type="range" min={1} max={7} step={1}
                            value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" />
                        <div className="flex justify-between text-xs text-[var(--color-text-light)]"><span>1 yr</span><span>7 yrs</span></div>
                    </div>

                    <a href="https://www.bankbazaar.com/car-loan.html" target="_blank" rel="noopener noreferrer"
                        className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all">
                        Compare Car Loan Rates →
                    </a>
                </div>

                <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 text-white text-center">
                        <p className="text-violet-200 text-sm mb-1">Monthly EMI</p>
                        <p className="text-3xl sm:text-4xl font-bold">{formatCurrency(result.emi)}</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-center">
                            <p className="text-[10px] text-blue-600 mb-1">Loan Amount</p>
                            <p className="text-base font-bold text-blue-800">{formatCurrency(result.loanAmount)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-center">
                            <p className="text-[10px] text-red-600 mb-1">Total Interest</p>
                            <p className="text-base font-bold text-red-800">{formatCurrency(result.totalInterest)}</p>
                        </div>
                        <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-center">
                            <p className="text-[10px] text-green-600 mb-1">Total Payable</p>
                            <p className="text-base font-bold text-green-800">{formatCurrency(result.totalPayable)}</p>
                        </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] shadow-sm">
                        <h3 className="font-semibold mb-3">Principal vs Interest</h3>
                        <div className="h-6 rounded-full bg-gray-100 overflow-hidden flex">
                            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
                                style={{ width: `${principalPercent}%` }} />
                            <div className="h-full bg-gradient-to-r from-red-300 to-red-500 transition-all duration-500"
                                style={{ width: `${100 - principalPercent}%` }} />
                        </div>
                        <div className="flex justify-between text-xs mt-2 text-[var(--color-text-light)]">
                            <span>🟦 Principal ({principalPercent}%)</span>
                            <span>🟥 Interest ({100 - principalPercent}%)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
